import React, { Fragment } from 'react'

const QuizLevelOver = React.forwardRef((props, ref) => {
	console.log(props)
	console.log(ref)

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
						<th>Questions</th>
						<th>Reponses</th>
						<th>Infos</th>
					</thead>

					<tbody>
						{

						}
					</tbody>
				</table>
			</div>
		</Fragment>
	)
})

 

export default React.memo(QuizLevelOver)