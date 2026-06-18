import { grammarQuestions, scenarioQuestions } from "../data/testquestions.js";

export function renderQuestions() {
  const container = document.querySelector(".js-language-test");
  container.innerHTML = renderGrammarSection() + renderScenarioSection();
}

function renderGrammarSection() {
  let html = '<fieldset class="grammar-section"><legend>Short Grammar Test</legend>';

  grammarQuestions.forEach((question) => {
    html += `
      <div class="question-container">
        <p class="question-label" id="grammar-label-${question.id}">
          ${question.id}. ${question.question}
        </p>
        <div class="options-list" role="radiogroup" aria-labelledby="grammar-label-${question.id}">
    `;

    question.options.forEach((option, index) => {
      html += `
        <label class="option">
          <input type="radio" name="grammar-${question.id}" value="${index}">
          <span>${option}</span>
        </label>
      `;
    });

    html += `</div></div>`;
  });

  html += "</fieldset>";
  return html;
}

function renderScenarioSection() {
  let html = '<fieldset class="scenario-section"><legend>Customer Service Scenarios</legend>';

  scenarioQuestions.forEach((question) => {
    html += `
      <div class="question-container">
        <label for="scenario-${question.id}" class="question-label">
          ${question.id}. ${question.question}
        </label>
        <textarea id="scenario-${question.id}" placeholder="Type your answer" class="question-input" rows="4"></textarea>
      </div>
    `;
  });

  html += "</fieldset>";
  return html;
}