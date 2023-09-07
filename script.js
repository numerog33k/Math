document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("worksheet-form").addEventListener("submit", function(event) {
        event.preventDefault();
        generateWorksheet();
    });
});

let startTime, endTime;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check individual answers for immediate feedback
function checkIndividualAnswer(inputElement, correctAnswer) {
    const userAnswer = parseInt(inputElement.value, 10);

    if (userAnswer === correctAnswer) {
        inputElement.style.backgroundColor = "#DFF2BF"; // light green
    } else {
        inputElement.style.backgroundColor = "#FFD2D2"; // light red
    }
}

function generateWorksheet() {
    const numProblems = parseInt(document.getElementById("numProblems").value);
    const operation = document.getElementById("operation").value;

    let worksheetHtml = '<tr><th>Problem</th><th>Your Answer</th></tr>'; // Header Row

    for (let i = 0; i < numProblems; i++) {
        const num1 = getRandomNumber(1, 10);
        const num2 = getRandomNumber(1, 10);

        let problem = '';

        switch(operation) {
            case "add":
                problem = `${num1} + ${num2}`;
                break;
            case "subtract":
                problem = `${num1} - ${num2}`;
                break;
            case "multiply":
                problem = `${num1} &times; ${num2}`;
                break;
            case "divide":
                problem = `${num1 * num2} &divide; ${num2}`;
                break;
        }

        worksheetHtml += `<tr><td data-answer="${eval(problem.replace('&times;', '*').replace('&divide;', '/'))}">${problem}</td><td><input type="number" class="answer"></td></tr>`;
    }

    document.getElementById("worksheet").innerHTML = worksheetHtml;

    // Enable check button and start the timer
    document.getElementById("checkButton").disabled = false;
    startTime = new Date();

    // Immediate feedback setup
    const answerInputs = document.getElementsByClassName("answer");
    for (let i = 0; i < answerInputs.length; i++) {
        const correctAnswer = parseInt(answerInputs[i].parentNode.previousSibling.getAttribute("data-answer"), 10);

        answerInputs[i].addEventListener("input", function() {
            checkIndividualAnswer(answerInputs[i], correctAnswer);
        });
    }
}

function checkAnswers() {
    const answers = document.getElementsByClassName("answer");
    let correctCount = 0;

    for(let i = 0; i < answers.length; i++) {
        const userAnswer = parseInt(answers[i].value, 10);
        const correctAnswer = parseInt(answers[i].parentNode.previousSibling.getAttribute("data-answer"), 10);

        if(userAnswer === correctAnswer) {
            correctCount++;
        }
    }

    endTime = new Date();
    const timeDiff = endTime - startTime;
    const seconds = Math.floor(timeDiff / 1000);

    document.getElementById("time").innerText = `You got ${correctCount} out of ${answers.length} correct! Time taken: ${seconds} seconds.`;
}
