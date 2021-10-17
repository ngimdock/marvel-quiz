import React from 'react'

const Modal = ({ show, children }) => {

	return show && (
		<div className="modalBackground">
			<div className="modalContainer">
				{ children }
			</div>
		</div>
	)
}

export { Modal }
