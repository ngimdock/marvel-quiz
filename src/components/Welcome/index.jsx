import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase/index';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = (props) => {

	// variale context
	const firebase = useContext(FirebaseContext);

	// variable d'etat
	const [userSession, setUserSession] = useState(null);

	useEffect(() => {

		let clistener = firebase.auth.onAuthStateChanged(user => {
			user ? setUserSession(user) : props.history.push("/");
		})
   
		return () => {
			clistener();
		};
	}, [])

	let display = userSession === null ? (
		<>
			<div className="loader"></div>
			<p>Loading.......</p>
		</>
	) : (
		<div className="quiz-bg">
				<div className="container">
					<Logout />
					<Quiz />
				</div>
		</div>
	);

	return display;
};

export default Welcome;