import React from 'react'

const Modal = ({ show, hideModal, children }) => {

	return show && (
		<div className="modalBackground" onClick={hideModal}>
			<div className="modalContainer">
				{ children }
			</div>
		</div>
	)
}

export { Modal }