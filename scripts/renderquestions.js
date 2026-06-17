import { questions } from "../data/testquestions.js";

export function renderQuestions() {
  let questionsHTML = '<legend>Customer Service Scenarios</legend>';

  questions.forEach((question) => {
    questionsHTML += `
      <div class="question-container">
        <label for="answer-${question.id}" class="question-label">${question.question}</label>
        <textarea type="text" id="answer-${question.id}" placeholder="Type your answer" class="question-input" rows="4"></textarea>
      </div>
    `;
  });

  document.querySelector('.js-language-test').innerHTML = questionsHTML;
};