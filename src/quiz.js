document.addEventListener('DOMContentLoaded', (event) => {
    fetch('quiz.json')
        .then(response => response.json())
        .then(data => displayRandomQuestion(data.questions))
        .catch(error => console.error('Error fetching data:', error));
});

function displayRandomQuestion(questions) {
    const container = document.getElementById('questions-container');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionObj = questions[randomIndex];

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-block');

    const questionText = document.createElement('p');
    questionText.textContent = questionObj.question;
    questionDiv.appendChild(questionText);

    questionObj.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `<p>${option}</p>`;
        
        if (index === questionObj.correctOption) {
            optionDiv.innerHTML += `<p class="explanation">${questionObj.explanation}</p>`;
        }

        questionDiv.appendChild(optionDiv);
    });

    container.appendChild(questionDiv);
}

function showAllExplanations() {
    const explanations = document.querySelectorAll('.explanation');
    explanations.forEach(explanation => {
        explanation.style.display = 'block';
    });
}