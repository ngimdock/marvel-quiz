import React, { Fragment } from 'react'

const Loader = ({ loaderMsg, colorText }) => {
	return (
		<Fragment>
			<div className="loader"></div>
			<p className="loaderText" style={{color: colorText}}>{ loaderMsg }</p>
		</Fragment>
	)
}

export default Loader