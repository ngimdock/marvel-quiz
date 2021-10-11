import React, { Fragment, useState, useEffect } from 'react'

const QuizLevelOver = React.forwardRef((props, ref) => {

	const { 
			levelName,
			maxQuestion, 
			score,
			quizLevel,
			percentage
		} = props

	console.log(maxQuestion, score)
	const [quizData, setQuizData] = useState([])

	useEffect(() => {
		setQuizData(ref.current)
	}, [ref])

	const getPercentage = (maxQuestion, score) => (score/maxQuestion)*100

	const percent = getPercentage(maxQuestion, score)

	const average = maxQuestion/2

	let decision = null

	if(score >= average){  //s'il a eu la moyenne
		decision = (
			<Fragment>
				{
					quizLevel < levelName.length ? (
						<div className="stepsBtnContainer">
							<p className="successMsg">Bravo, passez au niveau suivant !</p>
							<button className="btnResult success">Niveau suivant</button>
						</div>
					) : (
						<div className="stepsBtnContainer">
							<p className="successMsg">Bravo, vous etes un expert de marvel</p>
							<button className="btnResult success">Acceuil</button>
						</div>
					)
				}
				
				<div className="percentage">
					<div className="progressPercent">
						Reussite { `${percent}%` }
					</div>
					<div className="progressPercent">
						Note: { `${score}/${maxQuestion}` }
					</div>
				</div>
			</Fragment>	
		)
	}else{

	}

	// jsx data
	const displayQuestionAnswer = quizData.map(obj => {
		return(
			<tr key={ obj.id }>
				<td>{obj.question}</td>
				<td>{obj.answer}</td>
				<td className="">
					<button className="btnInfo">Infon</button>	
				</td>
			</tr>
		)
	})

	return (
		<Fragment>
			{ decision }

			<hr />
			<p>Les reponses aux questions posees: </p>

			<div className="answerContainer">
				<table className="answers">
					<thead>
						<tr>
							<th>Question</th>
							<th>Reponces</th>
							<th>Info</th>
						</tr>
					</thead>
				
					<tbody>
						{ displayQuestionAnswer }
					</tbody>
				</table>
			</div>
		</Fragment>
	)
})

 

export default React.memo(QuizLevelOver)