import React from 'react'

const Level = ({ level }) => {
	return (
		<div className="levelsContainer">
			<h2 className="headingLevels">Niveau: { level }</h2>
		</div>
	)
}

export default Level