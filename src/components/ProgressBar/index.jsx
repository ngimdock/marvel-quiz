import React from 'react'

const ProgressBar = ({ questionNumber, maxQuestion }) => {

	const currentQuestion = questionNumber + 1

	// calculate percentage
	const getPercentage = (maxQuestion, currentQuestion) => {
		return (100/maxQuestion)*currentQuestion
	}

	const progression  = getPercentage(maxQuestion, currentQuestion)

	console.log(progression)

	return (
		<>
			<div className="percentage">
				<div className="progressPercent"> Question {`${currentQuestion}/${maxQuestion}`} </div>
				<div className="progressPercent"> Progression {`${progression}%`}</div>
			</div>

			<div className="progressBar">
				<div className="progressBarChange" style={{width: `${progression}%`}}></div>
			</div>
		</>
	)
}

export default React.memo(ProgressBar)