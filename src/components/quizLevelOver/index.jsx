import React, { Fragment, useState, useEffect } from 'react'
import { GrTrophy } from 'react-icons/gr'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi'
import { GiTrophyCup } from 'react-icons/gi'
import { Modal } from '../Modal/Modal'

import Loader from '../Loader'

const QuizLevelOver = React.forwardRef((props, ref) => {

	const { 
			levelName,
			maxQuestion, 
			score,
			quizLevel,
			percentage,
			loadLevelQuestion
		} = props

	// state variable
	const [quizData, setQuizData] = useState([])
	const [ showModal, setSowModal ] = useState(false)

	//handler
	const handleShowModal = id => {
		setSowModal(true)
		console.log(id)
	}

	const handleHideModal = () => {
		setSowModal(false)
	}

	//useEffect
	useEffect(() => {
		setQuizData(ref.current)
	}, [ref])


	//functions
	const getPercentage = (maxQuestion, score) => (score/maxQuestion)*100

	const percent = getPercentage(maxQuestion, score)

	const average = maxQuestion/2

	if(score < average) {
		setTimeout(() => loadLevelQuestion(quizLevel), 3000)
	}

	let decision = null

	if(score >= average){  //s'il a eu la moyenne
		decision = (
			<Fragment>
				<div className="stepsBtnContainer">
				{
					quizLevel < levelName.length ? (
						<>
							<p className="successMsg">
								Bravo, passez au niveau suivant ! <HiOutlineChevronDoubleRight />
							</p>
							<button 
								className="btnResult success"
								onClick={ () => loadLevelQuestion(quizLevel) }
							>
								Niveau suivant
							</button>
						</>
					) : (
						<>
							<p className="successMsg"> <GiTrophyCup size="3rem" color= "#07bc0c" /> Bravo, vous etes un expert de marvel</p>

							<button 
								className="btnResult gameOver"
								onClick={ () => loadLevelQuestion(0) }
							>
								Recommencer
							</button>
						</>
					)
				}
				</div>
				<div className="percentage">
					<div className="progressPercent">
						Reussite { `${percent}%` }
					</div>
					<div className="progressPercent">
						Note: { `${score}/${maxQuestion}` }
					</div>
				</div>
			</Fragment>	
		)
	}else{
		decision = (
			<Fragment>
				<div className="stepsBtnContainer">
					<p className="failureMsg">echoue, vous devez gagner ce niveau avant de passer au niveau suivant !</p>
					
					<button 
						className="btnResult gameOver"
						onClick={ () => loadLevelQuestion(quizLevel) }
					>
						Recommencer le niveau
					</button>					
				</div>

				<div className="percentage">
					<div className="progressPercent">
						Reussite { `${percent}%` }
					</div>
					<div className="progressPercent">
						Note: { `${score}/${maxQuestion}` }
					</div>
				</div>
			</Fragment>
		)
	}

	// jsx data
	const displayQuestionAnswer = score > average ? (
		quizData.map(obj => {
			return(
				<tr key={ obj.id }>
					<td>{obj.question}</td>
					<td>{obj.answer}</td>
					<td className="">
						<button 
						className="btnInfo"
						onClick={() => handleShowModal(obj.heroId)}
						>
							Info
						</button>	
					</td>
				</tr>
			)
		})
	) : (
		<tr>
			<td colSpan="3">
				<Loader loaderMsg="Authentification..." colorText="red" />
			</td>
		</tr>
	)

	return (
		<Fragment>
			{ decision }

			<hr />
			<p>Les reponses aux questions posees: </p>

			<div className="answerContainer">
				<table className="answers">
					<thead>
						<tr>
							<th>Question</th>
							<th>Reponces</th>
							<th>Info</th>
						</tr>
					</thead>
				
					<tbody>
						{ displayQuestionAnswer }
					</tbody>
				</table>
			</div>

			<Modal show={showModal} hideModal={handleHideModal}>
				<div className="modalHeader">
					<h2>Titre de la modal</h2>
				</div>
				<div className="modalBody">
					corps de la modal
				</div>
				<div className="modalFooter">
					<button onClick={handleHideModal} className="modalBtn">Fermer</button>
				</div>
			</Modal>
		</Fragment>
	)

})

export default React.memo(QuizLevelOver)