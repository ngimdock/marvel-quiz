
import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase/index';

const Logout = () => {

	// variable context
	const firebase = useContext(FirebaseContext);

	// variables d'etats
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if(checked){
			console.log("Deconnection");
			firebase.signoutUser();
		}else{
			console.log("Connection");
		}
	}, [checked, firebase])

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<div className="logoutContainer" id="logoutContent">
			<label className="switch">
				<input 
					type="checkbox"
					checked={checked}
					onChange = { handleChange }
				/>
				<span className="slider round"></span>
			</label>
		</div>
	);
};

export default Logout;