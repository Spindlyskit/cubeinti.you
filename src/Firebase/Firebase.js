import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from './auth';

class Firebase {
	constructor() {
		if (!firebase.apps.length)	this.app = firebase.initializeApp(config);
		else this.app = firebase.apps[0];

		this.user = null;
		this.token = null;

		this.googleProvider = new firebase.auth.GoogleAuthProvider();
		this.app.auth().useDeviceLanguage();
	}

	signInPopup = async () => {
		const result = await this.app.auth().signInWithPopup(this.googleProvider);
		return result;
	};

	signOut = () => this.app.auth().signOut();
}

export default Firebase;
