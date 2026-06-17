import { questions } from "../data/testquestions.js";
import { clearTestState } from "./state.js";

const WEBHOOK_URL = 'https://pexly-ai.app.n8n.cloud/webhook/2ec4a2e7-624f-4da6-9eae-54d043e38990';
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

export async function submitForm({ isAutoSubmit = false } = {}) {
  const personalInfo = {
    firstName: document.querySelector('#fname').value.trim(),
    lastName: document.querySelector('#lname').value.trim(),
    email: document.querySelector('#email').value.trim(),
    phoneNumber: document.querySelector('#phonenum').value.replace(/[^\d+]/g, "")
  };

  const answers = questions.map((question) => ({
    question: question.question,
    answer: document.querySelector(`#answer-${question.id}`).value.trim()
  }));

  const payload = {
    submittedAt: new Date().toISOString(),
    personalInfo,
    answers
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
