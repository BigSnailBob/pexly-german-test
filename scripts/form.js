import { renderQuestions } from "./renderquestions.js";
import { submitForm, setupFormSubmission } from "./submitform.js";
import { initTestState } from "./state.js";

renderQuestions();
setupFormSubmission();
initTestState(() => submitForm({ isAutoSubmit: true }));