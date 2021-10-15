import React from 'react'

const Modal = ({ show, hideModal, children }) => {

	return show && (
		<div onClick={hideModal}>
			{ children }
		</div>
	)
}

export { Modal }