import { grammarQuestions, scenarioQuestions, getCefrLevelFromGrammarScore } from "../data/testquestions.js";
import { clearTestState } from "./state.js";

const WEBHOOK_URL = 'https://pexly-ai.app.n8n.cloud/webhook-test/2ec4a2e7-624f-4da6-9eae-54d043e38990';
const UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbxOHACVm04EwWT5SRKgQLNO7tkt-BKf2i7cERnmkZ6tap9r71dvk_SHcCCepEAfssynRg/exec';
const messageElement = document.querySelector('.js-form-message');

function showMessage(text, type) {
  messageElement.textContent = text;
  messageElement.classList.remove('is-success', 'is-error');
  messageElement.classList.add('is-visible', `is-${type}`);

  if (type === 'success') {
    setTimeout(() => {
      messageElement.classList.remove('is-visible');
    }, 5000);
  }
}

function hideMessage() {
  messageElement.classList.remove('is-visible');
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like "data:application/pdf;base64,JVBERi0xL..."
      // We strip the prefix and return just the base64 content.
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function uploadCV(file) {
  const base64 = await fileToBase64(file);

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    // Intentionally NOT setting Content-Type: application/json
    // This avoids a CORS preflight and Apps Script handles plain text fine.
    body: JSON.stringify({
      fileName: file.name,
      fileBase64: base64,
      mimeType: file.type
    })
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || "Upload failed");
  }

  return result; // { fileId, fileUrl, fileName }
}

export async function submitForm({ isAutoSubmit = false } = {}) {
  // Validate phone number (only on manual submit; let auto-submit through to preserve answers)
  if (!isAutoSubmit) {
    const phoneRaw = document.querySelector('#phonenum').value.trim();
    const phoneStripped = phoneRaw.replace(/[^\d+]/g, "");
    const isValidPhone = /^\+[1-9]\d{6,14}$/.test(phoneStripped);

    if (!isValidPhone) {
      showMessage(
        "Please enter a valid phone number including the country code, e.g. +49 123 4567890.",
        "error"
      );
      document.querySelector('#phonenum').focus();
      document.querySelector('#phonenum').scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  // Validate CV file (only on manual submit; auto-submit with no file is allowed)
  const cvInput = document.querySelector('#cv');
  const cvFile = cvInput.files[0];

  if (!isAutoSubmit) {
    if (!cvFile) {
      showMessage("Please upload your CV before submitting.", "error");
      cvInput.focus();
      return;
    }

    if (cvFile.type !== 'application/pdf') {
      showMessage("Your CV must be a PDF file.", "error");
      cvInput.focus();
      return;
    }

    if (cvFile.size > 5 * 1024 * 1024) {
      showMessage("Your CV is larger than 5 MB. Please compress it and try again.", "error");
      cvInput.focus();
      return;
    }
  }
  const personalInfo = {
    firstName: document.querySelector('#fname').value.trim(),
    lastName: document.querySelector('#lname').value.trim(),
    email: document.querySelector('#email').value.trim(),
    phoneNumber: document.querySelector('#phonenum').value.replace(/[^\d+]/g, ""),
    project: document.querySelector('#project').value.trim(),
    recruiterName: document.querySelector('#recruiter').value.trim()
  };

  const grammarAnswers = grammarQuestions.map((question) => {
    const checked = document.querySelector(`input[name="grammar-${question.id}"]:checked`);
    const selectedIndex = checked ? parseInt(checked.value, 10) : null;
    return {
      id: question.id,
      level: question.level,
      question: question.question,
      selectedIndex,
      selectedOption: selectedIndex !== null ? question.options[selectedIndex] : null,
      correctAnswerIndex: question.correctAnswerIndex,
      isCorrect: selectedIndex === question.correctAnswerIndex
    };
  });

  // Count correct answers
  const correctCount = grammarAnswers.filter((a) => a.isCorrect).length;

  // Break down correct/total by difficulty level
  const scoreByLevel = { level1: { correct: 0, total: 0 }, level2: { correct: 0, total: 0 }, level3: { correct: 0, total: 0 }, level4: { correct: 0, total: 0 } };
  grammarAnswers.forEach((a) => {
    const key = `level${a.level}`;
    scoreByLevel[key].total += 1;
    if (a.isCorrect) scoreByLevel[key].correct += 1;
  });

  // Map to CEFR level (A2, B1.1, B1.2, B2.1, B2.2, C1)
  const grammarCefrLevel = getCefrLevelFromGrammarScore(correctCount);

  // Pass/fail flag (B2 minimum requirement = 28+ correct)
  const grammarPasses = correctCount >= 28;

  const grammarSummary = {
    totalQuestions: grammarAnswers.length,
    correctCount,
    scorePercent: Math.round((correctCount / grammarAnswers.length) * 1000) / 10,
    cefrLevel: grammarCefrLevel,
    passesB2Threshold: grammarPasses,
    scoreByLevel
  };

  const scenarioAnswers = scenarioQuestions.map((question) => ({
    id: question.id,
    question: question.question,
    answer: document.querySelector(`#scenario-${question.id}`).value.trim()
  }));

  let cvUploadResult = null;
  if (cvFile) {
    showMessage("Uploading your CV... please wait.", "info");
    try {
      cvUploadResult = await uploadCV(cvFile);
    } catch (error) {
      console.error("CV upload failed:", error);
      showMessage("Could not upload your CV. Please try again or check your connection.", "error");
      return;
    }
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    personalInfo: {
      ...personalInfo,
      cv: cvUploadResult ? {
        fileName: cvUploadResult.fileName,
        fileId: cvUploadResult.fileId,
        fileUrl: cvUploadResult.fileUrl
      } : null
    },
    grammarSummary,
    grammarAnswers,
    scenarioAnswers
  };


  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    };

    clearTestState();
    window.location.href = isAutoSubmit ? "thank-you.html?reason=timeout" : "thank-you.html";
  } catch (error) {
    console.error("Submission failed:", error);
    showMessage("Something went wrong. Please try again.", "error");
  }
}

export function setupFormSubmission() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    messageElement.classList.remove("is-visible");
    submitForm({ isAutoSubmit: false });
  });
}
