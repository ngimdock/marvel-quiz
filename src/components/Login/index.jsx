import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/index';


const Login = (props) => {

	const data = {
		email: "",
		password: ""
	};

	// context
	const firebase = useContext(FirebaseContext);

	// variable d'etats
	const [loginData, setLoginData] = useState(data);
	const [displayBtn, setDisplayBtn] = useState(false);
	const [error, setError] = useState("");

	const { email, password } = loginData;

	useEffect(() => {
		if(password.length > 5 && email !== ""){
			setDisplayBtn(true); 
		}else if(displayBtn === true){
			setDisplayBtn(false);
		}
	}, [email, password, displayBtn])

	const handleChange = (event) => {
	
		setLoginData({...loginData, [event.target.id]: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		firebase.loginUser(email, password)
		.then(user => {
			setLoginData(data)
			props.history.push("/welcome");
		})
		.catch(err => {
			setError(err);
			setLoginData(data);
		})
	};

	
	const btnValidForm = displayBtn ? <button>S'indentifier</button> : <button disabled>S'indentifier</button>;

	// Gestion de l'erreur firebase
	const errorMsg = error !== "" && <span>{error.message}</span>

	return (
		<div className="signUpLoginBox">
			<div className="slContainer">
				<div className="formBoxLeftLogin">
					
				</div>

				<div className="formBoxRight">
					<div className="formContent">
					
						{ errorMsg }

						<h2>Connexion</h2>
						<form onSubmit={ handleSubmit }>
							<div className="inputBox">
								<input  type="email" id="email" autoComplete="off" required value={email} onChange={handleChange} />
								<label htmlFor="email">Email</label>
							</div>

							<div className="inputBox">
								<input  type="password" id="password" autoComplete="off" required value={password} onChange={handleChange} />
								<label htmlFor="password">Mot de pass</label>
							</div>

							{ btnValidForm }
						</form>

						<div className="linkContainer">
							<Link className="simpleLink" to="/signup" id="simpleLinkSignup">Nouveau sur MARVEL quiz ? inscrivez vous maintenant</Link>
							<Link className="simpleLink" to="/forgetpassword">mot de pass oublier ?</Link>

						</div>
					</div> 
				</div>
			</div>
		</div>
	);
};


export default Login;