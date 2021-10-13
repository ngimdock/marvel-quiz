import React, {  Component, createRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import QUIZ_QUESTIONS from '../../quizData/questions'
import Level from '../Level'
import ProgressBar from '../ProgressBar'
import QuizLevelOver from '../quizLevelOver'

toast.configure() // display de welcome notification

class Quiz extends Component{

	constructor(props){
		super(props)

		this.initialState = {
			quizLevel: 0,
			quizQuestions: [],

			questionNumber: 0,
			maxQuestion: 10,
			currentInterogation: {
				question: "",
				options: []
			},
			userAnswer: "",
			score: 0,
			disabled: true,

			showWelcomeMsg: true,
			quizLevelEnd: false,
			percent: 0
		}

		this.state = this.initialState

		//references
		this.quizQuestionsRef = createRef()

		this.handleSelectAnswer = this.handleSelectAnswer.bind(this)
	}

	levelName = ["debutant", "confirme", "expert"]

	//handler
	handleSelectAnswer = (selectOption) => {

		this.setState({
			userAnswer: selectOption,
			disabled: false
		})
	}

	validateAnswer = () => {

		//modification de la question ou du level courant
		if(this.state.questionNumber === this.state.maxQuestion -1){

			this.gameLevelOver()
		}else{

			this.setState(prevState => ({
				questionNumber: prevState.questionNumber + 1
			}))
		}

		// mofification of score
		const goodAnswer = this.quizQuestionsRef.current[this.state.questionNumber].answer
		if(this.state.userAnswer === goodAnswer){
			this.setState(prevState => ({
				score: prevState.score + 1
			}))

			this.showPlayNotification("success", '😃 Bravo + 1') // good answer notification 
		}else{
			this.showPlayNotification("error", "😟 Raté") // wrong answer notification
		}
	}

	//functions
	fetchQuestions = level => {

		// extract question without answer 
		const questions = QUIZ_QUESTIONS[level].map(({answer, ...obj}) => obj )

		//store question with answer in ref
		this.quizQuestionsRef.current = QUIZ_QUESTIONS[level]

		this.setState({
			quizQuestions: questions
		})
	}

	// percentage of game
	getPercentage = (maxQuestion, score) => (score/maxQuestion)*100

	// when a specific level is completed
	gameLevelOver = () => {
		let greadPercent = this.getPercentage(this.state.maxQuestion, this.state.score)

		console.log(greadPercent)

		if(greadPercent >= 50){ // if the player has the average
			this.setState({
				quizLevel: this.state.quizLevel + 1,
				percent: greadPercent,
				quizLevelEnd: true
			})
		}else{
			this.setState({
				percent: greadPercent,
				quizLevelEnd: true
			})
		}
	}

	// this function fetch new level questions
	loadLevelQuestion = (level) => {
		// we reset the state to initial state and 
		// change the game level
		this.setState({
			...this.initialState,
			quizLevel: level
		})

		this.fetchQuestions(this.levelName[level]) //fetch
	}

	// display the welcome notification
	showWelcomeNotification = pseudo => {

		if(this.state.showWelcomeMsg){
			toast(`🙂 Bienvenu ${pseudo} et bonne chance`, {
				position: "top-right",
				autoClose: 2200,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			this.setState({
				showWelcomeMsg: false
			})
		}

	}

	showPlayNotification = (type, message) => {
		toast.[type](message, {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
	
	//live cycle methods
	componentDidMount = () => {
		this.fetchQuestions(this.levelName[this.state.quizLevel])
	}

	componentDidUpdate = (prevProps, prevState) => {

		// when the quiz questions are receive and array in not empty
		if((this.state.quizQuestions !== prevState.quizQuestions) && this.state.quizQuestions.length){
			const { question, options } = this.state.quizQuestions[this.state.questionNumber]
			this.setState({
				currentInterogation: {
					question,
					options
				}
			})
		}

		// when the curren question are update
		if((this.state.questionNumber !== prevState.questionNumber) && this.state.quizQuestions.length){
			const { question, options } = this.state.quizQuestions[this.state.questionNumber]
			this.setState({
				currentInterogation: {
					question,
					options,
				},
				
				userAnswer: "",
				disabled: true
			})
		}

		// when the pseudo authentification are receive
		if(this.props.userData.pseudo !== prevProps.userData.pseudo){
			this.showWelcomeNotification(this.props.userData.pseudo)
		}
	}

	render(){
		const {  pseudo } = this.props.userData
		const { currentInterogation, 
				disabled, 
				userAnswer, 
				questionNumber, 
				quizLevel, 
				maxQuestion, 
				quizLevelEnd, 
				score
			} = this.state

		const optionsList = currentInterogation.options.map((option, index) => {
			return (
				<p key={index} 
					className={`answerOptions ${ userAnswer === option && "selected" }` }
					onClick={() => this.handleSelectAnswer(option)} >
					{ option }
				</p>
			)
		})

		return  quizLevelEnd ? (
			<QuizLevelOver
				ref={ this.quizQuestionsRef }
				levelName={this.levelName}
				maxQuestion={ maxQuestion }
				score={ score }
				quizLevel={this.state.quizLevel}
				percentage={this.state.percent}
				loadLevelQuestion = { this.loadLevelQuestion }
			 />
		) : (
			<div>
				<h2>Nom: { pseudo }</h2>
				<Level level={this.levelName[quizLevel]} />
				<ProgressBar 
					questionNumber={questionNumber}
					maxQuestion={maxQuestion}
				 />

				<h2>{ currentInterogation.question }</h2>
				{ optionsList }
				<button disabled={disabled} className="btnSubmit" onClick={this.validateAnswer}>
					{ questionNumber < maxQuestion - 1 ? "Suivant" : "Termine" }
				</button>
			</div>
		)
	}
	
};

export default Quiz;