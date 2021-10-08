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

			questionNumber: 0,
			maxQuestion: 9,
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

	//handler
	handleSelectAnswer = (selectOption) => {

		this.setState({
			userAnswer: selectOption,
			disabled: false
		})
	}

	validateAnswer = () => {
		//desactivation du bouton
		this.setState({
			disabled: true
		})

		if(this.state.questionNumber < this.state.maxQuestion){
			this.setState(prevState => ({
				questionNumber: prevState.questionNumber + 1
			}))
		}else{
			if(this.state.quizLevel < this.levelName.length){
				this.setState(prevState => ({
					quizLevel: prevState.quizLevel + 1
				}))
			}
		}
	}

	//functions
	fetchQuestions = level => {

		// extract question without answer 
		const questions = QUIZ_QUESTIONS[level].map(({answer, ...obj}) => obj )

		this.setState({
			quizQuestions: questions
		})
	}
	// premet de changer la question courante
	changeCurrentQuestion = () => {
		const { question, options } = this.state.quizQuestions[this.state.questionNumber]
		this.setState({
			currentInterogation: {
				question,
				options
			}
		})
	}
	
	//live cycle methods
	componentDidMount = () => {
		this.fetchQuestions(this.levelName[this.state.quizLevel])
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.quizQuestions !== prevState.quizQuestions){
			this.changeCurrentQuestion()
		}

		if(this.state.questionNumber !== prevState.questionNumber && this.state.questionNumber <= this.state.maxQuestion){
			this.changeCurrentQuestion()
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
				<h2>{ pseudo }</h2>
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