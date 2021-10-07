import React, {  Component} from 'react';
import QUIZ_QUESTIONS from '../../quizData/questions'
import Level from '../Level'
import ProgressBar from '../ProgressBar'

class Quiz extends Component{

	constructor(props){
		super(props)

		this.state = {
			quizLevel: 0,
			quizQuestions: [],

			idQuestion: 0,
			currentInterogation: {
				question: "",
				options: []
			},
			userAnswer: "",
			disabled: true
		}

		this.handleSelectAnswer = this.handleSelectAnswer.bind(this)
	}

	levelName = ["debutant", "confirme", "expert"]

	handleSelectAnswer = (event, selectOption) => {

		this.setState({
			userAnswer: selectOption,
			disabled: false
		})
	}

	fetchQuestions = level => {

		// extract question without answer 
		const questions = QUIZ_QUESTIONS[level].map(({answer, ...obj}) => obj )

		this.setState({
			quizQuestions: questions
		})
	}
	
	componentDidMount = () => {
		this.fetchQuestions(this.levelName[this.state.quizLevel])
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.quizQuestions !== prevState.quizQuestions){
			const { question, options } = this.state.quizQuestions[this.state.idQuestion]
			this.setState({
				currentInterogation: {
					question,
					options
				}
			})
		}
	}

	render(){
		const {  pseudo } = this.props.userData
		const { currentInterogation, disabled, userAnswer } = this.state
		const optionsList = currentInterogation.options.map((option, index) => {
			return (
				<p key={index} 
					className={`answerOptions ${ userAnswer === option && "selected" }` }
					onClick={(event) => this.handleSelectAnswer(event, option)} >
					{ option }
				</p>
			)
		})
		return (
			<div>
				<h2>{ pseudo }</h2>
				<Level />
				<ProgressBar />

				<h2>{ currentInterogation.question }</h2>
				{ optionsList }
				<button disabled={disabled} className="btnSubmit">Suivant</button>
			</div>
		);
	}
	
};

export default Quiz;