import app from 'firebase/app';
import "firebase/auth";



const firebaseConfig = {
	apiKey: "AIzaSyBY9EHsPHZyX2SgVnJngEW5no_qgYW3FQg",
	authDomain: "marvel-quiz-47dae.firebaseapp.com",
	projectId: "marvel-quiz-47dae",
	storageBucket: "marvel-quiz-47dae.appspot.com",
	messagingSenderId: "333633875562",
	appId: "1:333633875562:web:1303de4b62a8945dbba413"
};

class Firebase {
	constructor(){
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
	}

	// inscription
	signupUser = (email, password) => 
		this.auth.createUserWithEmailAndPassword(email, password);

	// Connexion
	loginUser = (email, password) =>
	this.auth.signInWithEmailAndPassword(email, password);

	// Deconnexion
	signoutUser = () => this.auth.signOut();

	//Recuperer le mot de passe
	passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
