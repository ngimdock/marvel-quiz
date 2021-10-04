import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/index';

const ForgetPassword = () => {

	// variables context
	const firebase = useContext(FirebaseContext);

	// variables d'etats
	const [email, setEmail] = useState("");
	const [error, setErrorMsg] = useState(null)


	// Declaration des handler
	const handleSubmit = (event) => {
		event.preventDefault();
		firebase.passwordReset(email)
		.then(() => {
			console.log("renitialisation du mot de passe")
		})
		.catch(err => {
			console.log(err)
			setErrorMsg(err)
		})
	};

	const disabled = email === "";
	
	return(
		<div className="signUpLoginBox">
			<div className="slContainer">
				<div className="formBoxLeftForget">
					
				</div>

				<div className="formBoxRight">
					<div className="formContent">

						{
							error && <span>{ error.message }</span>
						}

						<h2>Mot de passe oublie ?</h2>
						<form onSubmit={ handleSubmit }>
							<div className="inputBox">
								<input  type="email" id="email" autoComplete="off" required value={email} onChange={(event) => setEmail(event.target.value)} />
								<label htmlFor="email">Email</label>
							</div>

							<button disabled={disabled}>Recuperer</button>
						</form>

						<div className="linkContainer">
							<Link className="simpleLink" to="/login">deja inscrit? connectez vous</Link>
						</div>

					</div> 
				</div>
			</div>
		</div>
	);
};

export default ForgetPassword;