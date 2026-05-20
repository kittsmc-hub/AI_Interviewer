export function renderQuestions(container, questions) {
  container.innerHTML = "";

  questions.forEach((question, index) => {
    const card = document.createElement("article");

    card.className = "question-card";

    card.innerHTML = `
      <div class="question-number">
        Question ${index + 1}
      </div>

      <div class="question-text">
        ${question}
      </div>
    `;

    container.appendChild(card);
  });
}