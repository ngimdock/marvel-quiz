import app from 'firebase/app';



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
	}
}

export default Firebase;

