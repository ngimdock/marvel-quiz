import React, { useState, useEffect, memo } from 'react'
import Stepper from 'react-stepper-horizontal'

const Level = ({ levelName, quizLevel }) => {

	const [quizStaps, setQuizStaps] = useState([])

	useEffect(() => {
		const quizStaps = levelName.map(level => ({title: level.toUpperCase()}))
		setQuizStaps(quizStaps)
	}, [levelName, quizLevel])

	console.log(quizStaps)

	return (
		<div className="levelsContainer" style={{background: "transparent"}}>
	      <Stepper 
	      	steps={ quizStaps } 
	      	activeStep={ quizLevel }
	      	size={45}
	      	circleTop={0}
	      	activeColor={"#EB1D27"}
	      	completeColor={"#E0E0E0"}
	      	activeTitleColor={"#EB1D27"}
	      	completeTitleColor={"#757575"}
	      	barStyle={"dashed"}
	      	defaultBarColor={"#757575"}
	      	completeBarColor={"#757575"}
	      />
		</div>
	)
}

export default memo(Level)