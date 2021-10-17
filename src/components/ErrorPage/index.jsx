import React from "react";
import batman from "../../images/batman.png";
import { Link } from 'react-router-dom';

const styleH2 = {
	textAlign : "center",
	marginTop : "50px"
}

const ErrorPage = () => {

	return(
		<div className="quiz-bg">
			<div className="container">
				<h2 style={styleH2}>Ooops cette page n'existe pas!</h2>
				<img src={batman} alt="error page" />
				<Link className="back-to-home" to="/">Retournez a la page d'accueil</Link>
			</div>
		</div>
	);
};

export default ErrorPage; 