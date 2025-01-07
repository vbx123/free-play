
// File: quiz.js

// السؤال والإجابات
const quizData = {
    question: "من هو النبي الذي ابتلعته الحوت؟",
    answers: [
        { text: "موسى عليه السلام", isCorrect: false },
        { text: "يونس عليه السلام", isCorrect: true },
        { text: "محمد صلى الله عليه وسلم", isCorrect: false },
        { text: "عيسى عليه السلام", isCorrect: false }
    ]
};

// العد التنازلي
let timer;
let timeLeft = 600; // 10 دقائق بالثواني

document.addEventListener("DOMContentLoaded", () => {
    displayQuestion();
    startCountdown();
});

// عرض السؤال والإجابات
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answersContainer");

    questionElement.textContent = quizData.question;

    quizData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.setAttribute("data-index", index);
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

// اختيار الإجابة
let selectedAnswer = null;

function selectAnswer(event) {
    const selectedButton = event.target;
    const index = selectedButton.getAttribute("data-index");

    selectedAnswer = quizData.answers[index];
    const buttons = document.querySelectorAll("#answersContainer button");

    buttons.forEach(button => {
        button.style.backgroundColor = "#007bff"; // Reset all to default
    });

    selectedButton.style.backgroundColor = "#28a745"; // Highlight selected button
}

// بدء العد التنازلي
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(false); // انتهت المسابقة
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            timeLeft--;
        }
    }, 1000);
}

// إرسال الإجابة
document.getElementById("submitAnswer").addEventListener("click", function() {
    if (selectedAnswer) {
        const isCorrect = selectedAnswer.isCorrect;
        endQuiz(isCorrect);
    } else {
        alert("من فضلك اختر إجابة.");
    }
});

// إنهاء المسابقة
function endQuiz(isCorrect) {
    const resultContainer = document.getElementById("result");
    const quizContainer = document.getElementById("quizContainer");

    quizContainer.style.display = "none"; // إخفاء المسابقة
    resultContainer.style.display = "block"; // عرض النتيجة

    const scoreElement = document.getElementById("score");
    if (isCorrect) {
        scoreElement.textContent = "إجابتك صحيحة!";
    } else {
        scoreElement.textContent = "إجابتك خاطئة.";
    }
}



