/* --- VARIABLES --- */

const questionArray = [
	{
		question: "What is the chemical symbol for the element gold?",
		answer: [
			{ answerText: "Ag", correct: false },
			{ answerText: "Au", correct: true },
			{ answerText: "Gd", correct: false },
			{ answerText: "Ge", correct: false },
		],
	},
	{
		question: "What is the powerhouse of the cell?",
		answer: [
			{ answerText: "Nucleus", correct: false },
			{ answerText: "Ribosome", correct: false },
			{ answerText: "Mithocondria", correct: true },
			{ answerText: "Reticulum", correct: false },
		],
	},
	{
		question:
			"What is the unit of force in the International System of Units?",
		answer: [
			{ answerText: "Joule", correct: false },
			{ answerText: "Pascal", correct: false },
			{ answerText: "Newton", correct: true },
			{ answerText: "Watt", correct: false },
		],
	},
	{
		question:
			"What type of rock is formed from the cooling and solidification of magma or lava?",
		answer: [
			{ answerText: "Sedimentary", correct: false },
			{ answerText: "Metamorphic", correct: false },
			{ answerText: "Limestone", correct: false },
			{ answerText: "Igneous", correct: true },
		],
	},
];

const questionElement = document.getElementById("question-id");
const answerButtons = document.getElementById("answer-wrapper-id");
const nextButton = document.getElementById("next-button-id");
const questionProgression = document.getElementById("id-question-progression");

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = questionArray.length;

/* --- FUNCTIONS ---*/

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
	let currentQuestion = questionArray[currentQuestionIndex];
	let questionNumber = currentQuestionIndex + 1;
	questionProgression.innerHTML = questionNumber + "/" +  totalQuestions;
	questionElement.innerHTML = currentQuestion.question;
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
		currentQuestionIndex++;
		if (currentQuestionIndex < questionArray.length) {
			showQuestion();
		} else {
			showScore();
		}
	} else {
		startQuiz();
	}
}

function showScore() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
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
