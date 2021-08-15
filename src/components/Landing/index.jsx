import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

	// Mes variables d'etat
	const [displayBtn, setDisplayBtn] = useState(false)


	// Mes references
	const refWolverine = useRef(null);

	useEffect(() => {
		refWolverine.current.classList.add("startingImg");

		setTimeout(() => {
			refWolverine.current.classList.remove("startingImg");
			setDisplayBtn(true);
		}, 1000);
		
		
	}, [])

	const setImgBackground = (nameClass) => {
		refWolverine.current.classList.add(nameClass);
	}

	const removeImgBackground = (nameClass) => {
		refWolverine.current.classList.remove(nameClass);
	};

	const btns = displayBtn && (
		<>
				<div className="leftBox" onMouseOver={() => setImgBackground("leftImg")} onMouseOut={() => removeImgBackground("leftImg")}>
					<Link className="btn-welcome" to="/signup">Inscription</Link>
				</div>
				<div className="rightBox" onMouseOver={() => setImgBackground("rightImg")} onMouseOut={() => removeImgBackground("rightImg")}>
					<Link className="btn-welcome" to="login">Connexion</Link>
				</div>
		</>
	)

	return(
		<main ref={refWolverine} className="welcomePage">
			{btns}
		</main>
	);
}

export default Landing;