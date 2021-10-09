import React, {  Component, createRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import QUIZ_QUESTIONS from '../../quizData/questions'
import Level from '../Level'
import ProgressBar from '../ProgressBar'

toast.configure() // display de welcome notification

class Quiz extends Component{

	constructor(props){
		super(props)

		this.state = {
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

			showWelcomeMsg: true
		}

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
			if(this.state.quizLevel < this.levelName.length){
				this.setState(prevState => ({
					quizLevel: prevState.quizLevel + 1
				}))
			}
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

	// display the welcome notification
	showWelcomeNotification = pseudo => {

		if(this.state.showWelcomeMsg){
			toast(`🙂 Bienvenu ${pseudo} et bonne chance`, {
				position: "top-right",
				autoClose: 2300,
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

		// when the quiz question are receive
		if(this.state.quizQuestions !== prevState.quizQuestions){
			const { question, options } = this.state.quizQuestions[this.state.questionNumber]
			this.setState({
				currentInterogation: {
					question,
					options
				}
			})
		}

		// when the curren question are update
		if(this.state.questionNumber !== prevState.questionNumber){
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
		if(this.props.userData.pseudo){
			this.showWelcomeNotification(this.props.userData.pseudo)
		}
	}

	render(){
		const {  pseudo } = this.props.userData
		const { currentInterogation, disabled, userAnswer, questionNumber, quizLevel} = this.state
		const optionsList = currentInterogation.options.map((option, index) => {
			return (
				<p key={index} 
					className={`answerOptions ${ userAnswer === option && "selected" }` }
					onClick={() => this.handleSelectAnswer(option)} >
					{ option }
				</p>
			)
		})
		return (
			<div>
				<h2>Nom: { pseudo }</h2>
				<Level level={this.levelName[quizLevel]} />
				<ProgressBar questionNumber={questionNumber + 1} />

				<h2>{ currentInterogation.question }</h2>
				{ optionsList }
				<button disabled={disabled} className="btnSubmit" onClick={this.validateAnswer}>Suivant</button>
			</div>
		);
	}
	
};

export default Quiz;