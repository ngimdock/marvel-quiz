import React from 'react'

const ProgressBar = ({ questionNumber }) => {
	const num = Number(questionNumber  + "0")
	return (
		<>
			<div className="percentage">
				<div className="progressPercent"> Question {questionNumber}/10 </div>
				<div className="progressPercent"> Progression {questionNumber}0% </div>
			</div>

			<div className="progressBar">
				<div className="progressBarChange" style={{width: `${questionNumber}0%`}}></div>
			</div>
		</>
	)
}

export default ProgressBar