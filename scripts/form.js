import { renderQuestions } from "./renderquestions.js";
import { submitForm, setupFormSubmission } from "./submitform.js";
import { initTestState } from "./state.js";

renderQuestions();
setupFormSubmission();
setupCopyProtection();
initTestState(() => submitForm({ isAutoSubmit: true }));

function setupCopyProtection() {
  const testSection = document.querySelector(".js-language-test");
  if (!testSection) return;

  // Block copy / cut / paste keyboard shortcuts inside the test section
  testSection.addEventListener("copy", (event) => event.preventDefault());
  testSection.addEventListener("cut", (event) => event.preventDefault());
  testSection.addEventListener("paste", (event) => event.preventDefault());

  // Block right-click context menu (which would otherwise show "Copy")
  testSection.addEventListener("contextmenu", (event) => event.preventDefault());
}