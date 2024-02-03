const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const timerElement = document.getElementById('timer');
const timeRemainingElement = document.getElementById('time-remaining');
const boxElement = document.querySelector('.box');

let timeRemaining = 60;
let correctAnswers = 0;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    const answer = num1 * num2;

    questionElement.textContent = `${num1} x ${num2} = ?`;
    return answer;
}

function updateTimeRemaining() {
    timeRemainingElement.textContent = timeRemaining;
}

function moveBox() {
    boxElement.style.transform = `translateY(-${correctAnswers * 60}px)`;
}

submitButton.addEventListener('click', () => {
    const userAnswer = parseInt(answerElement.value);
    const correctAnswer = generateQuestion();

    if (userAnswer === correctAnswer) {
        // Correct answer
        correctAnswers++;
        moveBox();
        answerElement.style.backgroundColor = 'green';
        setTimeout(() => {
            answerElement.style.backgroundColor = '';
        }, 1000); // Reset the background color after 1 second

        if (correctAnswers % 5 === 0) {
            timeRemaining += 10;
            updateTimeRemaining();
        }
    } else {
        // Incorrect answer
        answerElement.style.backgroundColor = 'red';
        setTimeout(() => {
            answerElement.style.backgroundColor = '';
        }, 1000); // Reset the background color after 1 second
    }

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert('Game over!');
    }
});

let timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimeRemaining();

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert('Game over!');
    }
}, 1000);

generateQuestion();
updateTimeRemaining();
