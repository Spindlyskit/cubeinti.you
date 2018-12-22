import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from './auth';
import EventEmitter from 'events';

class Firebase extends EventEmitter {
	constructor() {
		super();
		if (!firebase.apps.length)	this.app = firebase.initializeApp(config);
		else this.app = firebase.apps[0];

		this.user = null;
		this.token = null;

		this.googleProvider = new firebase.auth.GoogleAuthProvider();
		this.app.auth().useDeviceLanguage();
	}

	signInPopup = async () => {
		const result = await this.app.auth().signInWithPopup(this.googleProvider);
		this.emit('signIn', result);
		return result;
	};

	signOut = async () => {
		const result = await this.app.auth().signOut();
		this.emit('signOut', result);
		return result;
	};
}

export default Firebase;
