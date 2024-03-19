const questions = [
    {    
        question: "Q1: In which year was JavaScript launched ",
        answers: [
            { text: "1992", correct: false },
            { text: "1993", correct: false },
            { text: "1994", correct: false },
            { text: "1995", correct: true }
        ]
    },
    {
        question: "Q2:  In which year was Python launched",
        answers: [
            { text: "1989", correct: false },
            { text: "1990", correct: false },
            { text: "1991", correct: true },
            { text: "1992", correct: false }
        ]
    },
    {
        question: "Q3:  In which year was ChatGPT launched",
        answers: [
            { text: "2020", correct: false },
            { text: "2021", correct: false },
            { text: "2022", correct: false },
            { text: "2023", correct: true }
        ]
    },
    {
        question: "Q4:  In which year was Devin launched",
        answers: [
            { text: "2022", correct: false },
            { text: "2023", correct: false },
            { text: "2024", correct: true },
            { text: "2025", correct: false }
        ]
    }
    // Add more questions here
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'block';
    nextButton.innerText = 'Next';
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `<h2>${currentQuestion.question}</h2>`;
    answersElement.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct, button)); // Pass correct flag and button element to selectAnswer function
        answersElement.appendChild(button);
    });
}

function selectAnswer(correct, button) {
    if (correct) {
        button.classList.add("correct");
        score++; // Increase score if the answer is correct
    } else {
        button.classList.add("incorrect");
    }
    disableButtons(); // Disable buttons after selection
}

function disableButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true; // Disable all buttons after an answer is selected
    });
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // Move to the next question after 1 second
}

function endQuiz() {
    questionElement.innerHTML = `<h2>Quiz finished! Your score: ${score} out of ${questions.length}</h2>`;
    answersElement.innerHTML = '';
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
    nextButton.removeEventListener('click', showQuestion); // Remove the previous event listener
    nextButton.addEventListener('click', resetQuiz); // Add event listener for "Play Again" button
}

function resetQuiz() {
    currentQuestionIndex = 0; // Reset current question index
    score = 0; // Reset score
    nextButton.innerHTML = ''; // Change button text back to "Next"
    nextButton.style.display = 'none';
    showQuestion(); // Show the first question again
}

startQuiz();
