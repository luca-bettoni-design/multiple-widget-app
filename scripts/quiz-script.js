/* --- VARIABLES --- */

const questionArray = [
	{
		question: "question number ONE",
		answer: [
			{ answerText: "answer one 1", correct: true },
			{ answerText: "answer one 2", correct: false },
			{ answerText: "answer one 3", correct: false },
			{ answerText: "answer one 4", correct: false },
		],
	},
	{
		question: "question number TWO",
		answer: [
			{ answerText: "answer two 1", correct: false },
			{ answerText: "answer two 2", correct: true },
			{ answerText: "answer two 3", correct: false },
			{ answerText: "answer two 4", correct: false },
		],
	},
	{
		question: "question number THREE",
		answer: [
			{ answerText: "answer three 1", correct: false },
			{ answerText: "answer three 2", correct: false },
			{ answerText: "answer three 3", correct: true },
			{ answerText: "answer three 4", correct: false },
		],
	},
	{
		question: "question number FOUR",
		answer: [
			{ answerText: "answer four 1", correct: false },
			{ answerText: "answer four 2", correct: false },
			{ answerText: "answer four 3", correct: false },
			{ answerText: "answer four 4", correct: true },
		],
	},
];

const questionElement = document.getElementById("question-id");
const answerButtons = document.getElementById("answer-wrapper-id");
const nextButton = document.getElementById("next-button-id");

let currentQuestionIndex = 0;
let score = 0;

/* --- FUNCTIONS ---*/

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();
	let currentQuestion = questionArray[currentQuestionIndex];
	let questionNumber = currentQuestionIndex + 1;
	questionElement.innerHTML =
		questionNumber + ". " + currentQuestion.question;
	currentQuestion.answer.forEach(answerRendering);

	function answerRendering(answer) {
		const buttonOption = document.createElement("button");
		buttonOption.innerHTML = answer.answerText;
		buttonOption.classList.add("standard-button");
		answerButtons.appendChild(buttonOption);
		buttonOption.dataset.correct = answer.correct;
		buttonOption.addEventListener("click", selectAnswer);
	}
}

function resetState() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(optionClickEvent) {
	const selectedButton = optionClickEvent.target;
	if (selectedButton.dataset.correct === "true") {
		selectedButton.classList.add("correct-status");
		score++;
	} else {
		selectedButton.classList.add("incorrect-status");
	}

	let answerArray = Array.from(answerButtons.children);
	answerArray.forEach(answerRevealing);
	nextButton.style.display = "block";
}

function answerRevealing(answerArray) {
	if (answerArray.dataset.correct === "true") {
		answerArray.classList.add("correct-status");
	}
	answerArray.disabled = true;
}

function quizLoopManager() {
	if (currentQuestionIndex < questionArray.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questionArray.length) {
		showQuestion();
	} else {
		showScore();
	}
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questionArray.length}`;
	nextButton.innerHTML = "play again";
	nextButton.style.display = "block";
}

/* --- MAIN CODE --- */

startQuiz();
nextButton.addEventListener("click", quizLoopManager);

/* ---WORKFLOW---
1. startQuiz() is the first and only called function
2. startQuiz activates showQuestion()
3. showQuestion activates answerRendering()
4. clicking on one answer activate selectAnswer() and answerRevealing()
5. clicking nextButton activate quizLoopManager()
6. quizLoopManager activates showQuestion() or showScore()
*/
