import React from 'react';


const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<p>codé par <span className="dan">dan</span> {new Date().getFullYear()}</p>
			</div>
		</footer>
	);
}

export default Footer;