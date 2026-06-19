import { renderQuestions } from "./renderquestions.js";
import { submitForm, setupFormSubmission } from "./submitform.js";
import { initTestState, startTimer, isTestInProgress } from "./state.js";

renderQuestions();
setupFormSubmission();
setupCopyProtection();
initTestState(() => submitForm({ isAutoSubmit: true }));

// If the candidate already started the test (e.g., page reload), skip the gate
if (isTestInProgress()) {
  revealTest();
} else {
  setupStartButton();
}

function setupStartButton() {
  const startButton = document.querySelector(".js-start-button");
  if (!startButton) return;

  startButton.addEventListener("click", () => {
    const form = document.querySelector("form");

    // Trigger native HTML5 validation on the personal info + file inputs
    if (!form.checkValidity()) {
      form.reportValidity(); // browser shows the tooltip on the first invalid field
      return;
    }

    revealTest();
  });
}

function revealTest() {
  document.querySelector(".js-test-section").style.display = "";
  document.querySelector(".js-timer").style.display = "";

  const startButton = document.querySelector(".js-start-button");
  if (startButton) startButton.style.display = "none";

  startTimer();
}

function setupCopyProtection() {
  const testSection = document.querySelector(".js-language-test");
  if (!testSection) return;

  testSection.addEventListener("copy", (event) => event.preventDefault());
  testSection.addEventListener("cut", (event) => event.preventDefault());
  testSection.addEventListener("paste", (event) => event.preventDefault());
  testSection.addEventListener("contextmenu", (event) => event.preventDefault());
}