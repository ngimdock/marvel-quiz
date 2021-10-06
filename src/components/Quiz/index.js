import React, {  Component} from 'react';
import Level from '../Level'
import ProgressBar from '../ProgressBar'

class Quiz extends Component{
	

	render(){
		const {  pseudo } = this.props.userData
		return (
			<div>
				<Level />
				<ProgressBar />

				<h2>Question quiz</h2>
				<p className="answerOptions">reponse 1</p>
				<p className="answerOptions">reponse 1</p>
				<p className="answerOptions">reponse 1</p>
				<p className="answerOptions">reponse 1</p>
				<button className="btnSubmit">Suivant</button>
			</div>
		);
	}
	
};

export default Quiz;