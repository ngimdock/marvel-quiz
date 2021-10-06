
import React from 'react';

const Quiz = ({ userData }) => {
	console.log(userData)
	return (
		<div>
			<h2>{userData.pseudo}</h2>
			Quiz
		</div>
	);
};

export default Quiz;