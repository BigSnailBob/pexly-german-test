import { grammarQuestions, scenarioQuestions, getCefrLevelFromGrammarScore } from "../data/testquestions.js";
import { clearTestState } from "./state.js";

const WEBHOOK_URL = 'https://pexly-ai.app.n8n.cloud/webhook/2ec4a2e7-624f-4da6-9eae-54d043e38990';
const UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbwO1cMxrZajqq9mzepU0nFhIO-romgdceLCuuEC5dnRrH7Jt7nSaDJ9yzRV77nd09oa9w/exec';
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

async function uploadFiles({ candidateName, files }) {
  // Convert each file to base64 in parallel
  const fileData = await Promise.all(
    files.map(async (item) => ({
      fileName: item.file.name,
      fileBase64: await fileToBase64(item.file),
      mimeType: item.file.type,
      fileType: item.fileType
    }))
  );

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    body: JSON.stringify({
      candidateName,
      files: fileData
    })
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || "Upload failed");
  }

  return result;
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
  const speedInput = document.querySelector('#speedScreenshot');
  const deviceInput = document.querySelector('#deviceScreenshot');

  const cvFile = cvInput.files[0];
  const speedFile = speedInput.files[0];
  const deviceFile = deviceInput.files[0];

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (!isAutoSubmit) {
    // CV
    if (!cvFile) {
      showMessage("Please upload your CV before submitting.", "error");
      cvInput.focus();
      return;
    }
    if (cvFile.type !== "application/pdf") {
      showMessage("Your CV must be a PDF file.", "error");
      cvInput.focus();
      return;
    }
    if (cvFile.size > MAX_FILE_SIZE) {
      showMessage("Your CV is larger than 5 MB. Please compress it.", "error");
      cvInput.focus();
      return;
    }

    // Internet speed screenshot
    if (!speedFile) {
      showMessage("Please upload your internet speed screenshot.", "error");
      speedInput.focus();
      return;
    }
    if (!speedFile.type.startsWith("image/")) {
      showMessage("The internet speed screenshot must be an image (PNG or JPG).", "error");
      speedInput.focus();
      return;
    }
    if (speedFile.size > MAX_FILE_SIZE) {
      showMessage("The internet speed screenshot is larger than 5 MB.", "error");
      speedInput.focus();
      return;
    }

    // Device specs screenshot
    if (!deviceFile) {
      showMessage("Please upload your device specs screenshot.", "error");
      deviceInput.focus();
      return;
    }
    if (!deviceFile.type.startsWith("image/")) {
      showMessage("The device specs screenshot must be an image (PNG or JPG).", "error");
      deviceInput.focus();
      return;
    }
    if (deviceFile.size > MAX_FILE_SIZE) {
      showMessage("The device specs screenshot is larger than 5 MB.", "error");
      deviceInput.focus();
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

  let uploadResult = null;
  if (cvFile && speedFile && deviceFile) {
    showMessage("Uploading your files... please wait.", "info");
    try {
      uploadResult = await uploadFiles({
        candidateName: `${personalInfo.firstName}_${personalInfo.lastName}`,
        files: [
          { file: cvFile,     fileType: "cv" },
          { file: speedFile,  fileType: "speedScreenshot" },
          { file: deviceFile, fileType: "deviceScreenshot" }
        ]
      });
    } catch (error) {
      console.error("File upload failed:", error);
      showMessage("Could not upload your files. Please try again or check your connection.", "error");
      return;
    }
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    personalInfo: {
      ...personalInfo,
      folder: uploadResult ? {
        folderId: uploadResult.folderId,
        folderUrl: uploadResult.folderUrl,
        folderName: uploadResult.folderName
      } : null,
      cv: uploadResult?.files?.cv || null,
      speedScreenshot: uploadResult?.files?.speedScreenshot || null,
      deviceScreenshot: uploadResult?.files?.deviceScreenshot || null
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
