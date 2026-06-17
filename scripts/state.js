import { questions } from "../data/testquestions.js";

const TEST_DURATION_MS = 25 * 60 * 1000;
const STORAGE = {
  start: "germanTest_startTime_v2",
  answers: "germanTest_answers_v2",
  personal: "germanTest_personalInfo_v2",
};
const personalFields = ['fname', 'lname', 'email', 'phonenum'];
let onTimeoutCallback = null;
let timerIntervalId = null;

export function initTestState(onTimeout) {
  onTimeoutCallback = onTimeout;
  restoreSavedData();
  setupAutoSave();
  initTimer();
};

export function clearTestState() {
  localStorage.removeItem(STORAGE.start);
  localStorage.removeItem(STORAGE.answers);
  localStorage.removeItem(STORAGE.personal);

  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }

  const timerElement = document.querySelector(".js-timer");
  if (timerElement) {
    timerElement.textContent = "25:00";
    timerElement.classList.remove("is-warning", "is-critical");
  }
};

function restoreSavedData() {
  const personal = JSON.parse(localStorage.getItem(STORAGE.personal) || '{}');

  personalFields.forEach((field) => {
    const element = document.querySelector(`#${field}`);
    if (element && personal[field]) element.value = personal[field];
  });

  const answers = JSON.parse(localStorage.getItem(STORAGE.answers) || '{}');
  Object.entries(answers).forEach(([id, value]) => {
    const element = document.querySelector(`#answer-${id}`);
    if (element) element.value = value;
  });
}

function setupAutoSave() {
  const form = document.querySelector('form');
  
  form.addEventListener('input', () => {
    const personal = {};
    personalFields.forEach((id) => {
      personal[id] = document.querySelector(`#${id}`).value;
    });
    localStorage.setItem(STORAGE.personal, JSON.stringify(personal));

    const answers = {};
    questions.forEach((question) => {
      const element = document.querySelector(`#answer-${question.id}`);
      if (element) answers[question.id] = element.value;
    });
    localStorage.setItem(STORAGE.answers, JSON.stringify(answers));
  })
}

function initTimer() {
  let startTime = parseInt(localStorage.getItem(STORAGE.start), 10);

  if (!startTime || Number.isNaN(startTime)) {
    startTime = Date.now();
    localStorage.setItem(STORAGE.start, String(startTime));
  }

  const timerElement = document.querySelector('.js-timer');
  let hasFiredTimeout = false;

  function tick() {
    const remaining = TEST_DURATION_MS - (Date.now() - startTime);

    if (remaining <= 0) {
      timerElement.textContent = '00:00';
      timerElement.classList.add('is-critical');
      if (!hasFiredTimeout) {
        hasFiredTimeout = true;
        if (onTimeoutCallback) onTimeoutCallback();
      }
      return;
    }

    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    timerElement.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    timerElement.classList.toggle('is-warning', remaining < 5 * 60 * 1000 && remaining >= 60 * 1000);
    timerElement.classList.toggle('is-critical', remaining < 60 * 1000);
  }

  tick();
  timerIntervalId = setInterval(tick, 1000);
}