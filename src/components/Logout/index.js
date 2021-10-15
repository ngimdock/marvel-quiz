
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase/index';
import ReactTooltip from 'react-tooltip';

const Logout = () => {

	// variable context
	const firebase = useContext(FirebaseContext);

	// variables d'etats
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if(checked){
			firebase.signoutUser();
		}
	}, [checked, firebase])

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Fragment>
			
			<div className="logoutContainer" id="logoutContent" >
				<label className="switch">
					<input 
						type="checkbox"
						checked={checked}
						onChange = { handleChange }
					/>
					<span className="slider round" data-tip="Deconnexion"></span>
				</label>
				<ReactTooltip
					place = "left"
					effect = "solid" 
				/> {/* Decoonnexion tooltip */}
			</div>
		</Fragment>
	);
};

export default Logout;