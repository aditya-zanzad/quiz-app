document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
            correctAnswer: 0
        },
        {
            question: "What is the smallest prime number?",
            answers: ["0", "1", "2", "3"],
            correctAnswer: 2
        }
    ];

    const questionElement = document.querySelector(".question");
    const answersContainer = document.querySelector(".answers");
    const nextButton = document.getElementById("next");
    const scoreElement = document.getElementById("quiz_score");

    let currentQuestionIndex = 0;
    let scoreCount = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        scoreCount = 0;
        scoreElement.textContent = scoreCount;
        nextButton.textContent = "Next";
        nextButton.removeEventListener("click", startQuiz);
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionNumber = currentQuestionIndex + 1;
        questionElement.textContent = questionNumber + ". " + currentQuestion.question;

        answersContainer.innerHTML = ""; // Clear previous answers

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(index));
            answersContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            scoreCount++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
        scoreElement.textContent = scoreCount;
    }

    function showScore() {
        questionElement.textContent = `Your score is ${scoreCount} out of ${questions.length}`;
        answersContainer.innerHTML = "";
        nextButton.textContent = "Restart";
        nextButton.addEventListener("click", startQuiz);
    }

    nextButton.addEventListener("click", () => {
        if (nextButton.textContent === "Restart") {
            startQuiz();
        } else {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }
    });

    startQuiz();
});
