import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase/index';
import Logout from '../Logout';
import Quiz from '../Quiz';
import Loader from '../Loader'

const Welcome = (props) => {

	// variale context
	const firebase = useContext(FirebaseContext);

	// variable d'etat
	const [userSession, setUserSession] = useState(null);
	const [userData, setUserData] = useState({})

	useEffect(() => {

		let clistener = firebase.auth.onAuthStateChanged(user => {
			user ? setUserSession(user) : props.history.push("/");
		})

		if(userSession){
			firebase.user(userSession.uid)
			.get()
			.then(doc => {
				if(doc && doc.exists){
					const data = doc.data()
					setUserData(data)
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
		
   
		return () => {
			clistener();
		};
	}, [userSession])

	let display = userSession === null ? (
		<Loader loaderMsg="Authentification..." colorText="#FFF" />
	) : (
		<div className="quiz-bg">
				<div className="container">
					<Logout />
					<Quiz userData={ userData } />
				</div>
		</div>
	);

	return display;
};

export default Welcome;