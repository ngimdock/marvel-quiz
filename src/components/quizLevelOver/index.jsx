import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
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

	const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY //get my public for .env file
	const hash = "ddb8c45452135169f0ea7d52d5100507" //md5 hash code


	// state variable
	const [quizData, setQuizData] = useState([])
	const [ showModal, setSowModal ] = useState(false)
	const [characterData, setCharacterData] = useState([])
	const [isCharacterLoading, setIsCharacterLoading] = useState(true)
	const [characterError, setCharacterError] = useState(null)

	//handler
	const handleShowModal = id => {
		setSowModal(true)
		
		axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
		.then(response => {
			setCharacterData(response.data)
			console.log(response)
			setIsCharacterLoading(false)
		})
		.catch(err => {
			setCharacterError(err)
		})
	}

	const handleHideModal = () => {
		setSowModal(false)
	}

	//side effects
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

	// JSX LOGIC
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

	// modal jsx
	let characterNode = null

	if(isCharacterLoading){
		characterNode = (
			<Fragment>
				<div className="modalHeader">
					<h2>Loading marvel information...</h2>
				</div>
				<div className="modalBody">
					<Loader />
				</div>
				<div className="modalFooter">
					<button onClick={handleHideModal} className="modalBtn">Fermer</button>
				</div>
			</Fragment>
		)
	}else{
		characterNode = characterError ? (
			<p>{characterError.message}</p>
		) : (
			<Fragment>
				<div className="modalHeader">
					<h2>{ characterData.data.results[0].name }</h2>
				</div>
				<div className="modalBody">
					<p>
						plus d'informations? visitez 
						<a target="_blank" href={ characterData.data.results[0].urls[0].url }>ce site</a>
					</p>
				</div>
				<div className="modalFooter">
					<button onClick={handleHideModal} className="modalBtn">Fermer</button>
				</div>
			</Fragment>
		)
	}


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
				{ characterNode }
			</Modal>
		</Fragment>
	)

})

export default React.memo(QuizLevelOver)

