
/* school quiz*/
var myQuestions = [
	{
		question: "Q1. Which artpiece depicts spring celebration?",
		answers: {
			a: 'Colours of Spring 2018',
			b: 'Intricate Expression'
		},
		correctAnswer: 'a'
	},
	{
		question: "Q2. Who painted 'A Window to a Hidden Past' ",
		answers: {
			a: 'Jack Dale',
			b: 'Louis Roche',
			c: 'Harry Potter'
		},
		correctAnswer: 'a'
	},
	{
	question: "Q3. Which artwork belongs to Charmaine Pwerle? ",
		answers: {
			a: 'New traditions',
			b: 'Old car',
			c: 'The sunshine'
		},
		correctAnswer: 'a'
    }
    	
];

var quizContainer = document.getElementById('artquiz');
var resultsContainer = document.getElementById('artresults');
var submitButton = document.getElementById('artsubmit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for(var i=0; i<questions.length; i++){
			
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for(letter in questions[i].answers){

				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
		
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		
		// for each question...
		for(var i=0; i<questions.length; i++){

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
				
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'red';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
		if (numCorrect==3) {
		localStorage.setItem("artquiz", true);
		check_achievements("../images/puzzlepart3.png")
		}
	}
	// show questions right away
	showQuestions(questions, quizContainer);
	
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}

}