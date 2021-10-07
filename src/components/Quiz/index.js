import React, {  Component} from 'react';
import QUIZ_QUESTIONS from '../../quizData/questions'
import Level from '../Level'
import ProgressBar from '../ProgressBar'

class Quiz extends Component{

	state ={
		quizLevel: 0,
		quizQuestions: [],

		idQuestion: 0,
		currentInterogation: {
			question: "",
			options: []
		}
	}

	levelName = ["debutant", "confirme", "expert"]

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
		const { question, options } = this.state.currentInterogation
		const optionsList = options.map((option, index) => <p key={index} className="answerOptions">{option}</p>)
		return (
			<div>
				<h2>{ pseudo }</h2>
				<Level />
				<ProgressBar />

				<h2>{ question }</h2>
				{ optionsList }
				<button className="btnSubmit">Suivant</button>
			</div>
		);
	}
	
};

export default Quiz;