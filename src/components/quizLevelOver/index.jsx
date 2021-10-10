import React, { Fragment, useState, useEffect } from 'react'

const QuizLevelOver = React.forwardRef((props, ref) => {
	const [quizData, setQuizData] = useState([])

	useEffect(() => {
		setQuizData(ref.current)
	}, [ref])

	// display question and corresponding answer row
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
			<div className="stepsBtnContainer">
				<p className="successMsg">Bravo vous maitrisez marvel</p>
				<button className="btnResult success">Niveau suivant</button>
			</div>
			<div className="percentage">
				<div className="progressPercent">
					Reussite 100%
				</div>
				<div className="progressPercent">
					Note: 10/10
				</div>
			</div>

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