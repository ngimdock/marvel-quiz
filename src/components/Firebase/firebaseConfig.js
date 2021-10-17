import app from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
	// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
 //  	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
 //  	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
 //  	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
 //  	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
 //  	appId: process.env.REACT_APP_FIREBASE_APP_ID

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
		this.db = app.firestore()
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

	//firestore
	user = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;
