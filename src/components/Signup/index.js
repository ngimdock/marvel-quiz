import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/index';

const Signup = (props) => {

	const data = {
		pseudo: "",
		email: "",
		password: "",
		confirmPassword: ""
	};


	// instantiation du context
	const firebase = useContext(FirebaseContext);

	// definition des variables d'etat
	const [sigupData, setSigupData] = useState(data);
	const [error, setError] = useState("");


	// definition des methodes
	const handleChange = (event) => {
		setSigupData({...sigupData, [event.target.id]: event.target.value})
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { email, password, pseudo } = sigupData;
		firebase.signupUser(email, password)
		.then(authUser => {
			return firebase.user(authUser.user.uid).set({
				pseudo,
				email
			})
		})
		.then(() => {
			setSigupData({...data});
			props.history.push("/welcome");
		})
		.catch(error => {
			setError(error);
		})
	};

	const errorMsg = error !== "" && <span>{ error.message }</span>

	const {pseudo, email, password, confirmPassword} = sigupData;

	const btnValidForm = pseudo === "" || email === "" || password === "" || password !== confirmPassword 
	? <button disabled>Inscription</button> : <button>Inscription</button> 

	return (
		<div className="signUpLoginBox">
			<div className="slContainer">
				<div className="formBoxLeftSignup">
					
				</div>

				<div className="formBoxRight">
					<div className="formContent">

						{ errorMsg }

						<h2>Inscription</h2>
						<form onSubmit={handleSubmit}>
							<div className="inputBox">
								<input type="text" id="pseudo" autoComplete="off" required value={pseudo} onChange={handleChange}  />
								<label htmlFor="pseudo">Pseudo</label>
							</div>

							<div className="inputBox">
								<input  type="email" id="email" autoComplete="off" required value={email} onChange={handleChange} />
								<label htmlFor="email">Email</label>
							</div>

							<div className="inputBox">
								<input  type="password" id="password" autoComplete="off" required value={password} onChange={handleChange} />
								<label htmlFor="password">Mot de pass</label>
							</div>

							<div className="inputBox">
								<input type="password" id="confirmPassword" autoComplete="off" required value={confirmPassword} onChange={handleChange} />
								<label htmlFor="confirmPassword">confirmer le mot de pass</label>
							</div>

							{ btnValidForm }
							
						</form>

						<div className="linkContainer">
							<Link className="simpleLink" to="/login">deja inscrit? connectez vous</Link>
						</div>
					</div> 
				</div>
			</div>
			
		</div>
	);
}

export default Signup;