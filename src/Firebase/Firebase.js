import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from './auth';
import EventEmitter from 'events';

/*
Times should look like this:
{
	time: number, // in milliseconds
	type: string, // the puzzle, eg 333, 444, pyram, etc. Should match up with the Tnoodle puzzle id
	subtype: string, // eg 'normal', 'one-handed', 'bld'
	scramble: string,
	penalty: number, // index from [none, +2, dnf]
	created: timestamp,
	archived: boolean, //whether the user has archived this solve or not. Used in queries.
}
 */

class Firebase extends EventEmitter {
	constructor() {
		super();
		if (!firebase.apps.length)	this.app = firebase.initializeApp(config);
		else this.app = firebase.apps[0];

		this.user = null;
		this.token = null;

		this.db = this.app.firestore();
		this.db.settings({
			timestampsInSnapshots: true,
		});

		this.googleProvider = new firebase.auth.GoogleAuthProvider();
		this.app.auth().useDeviceLanguage();

		this.app.auth().onAuthStateChanged(u => {
			if (u !== null) {
				this.emit('signIn', u);
				this.user = u;
			} else {
				this.emit('signOut');
				this.user = null;
			}
		});
	}

	signInPopup = async () => {
		const result = await this.app.auth().signInWithPopup(this.googleProvider);
		return result;
	};

	signOut = async () => {
		const result = await this.app.auth().signOut();
		return result;
	};

	addTime = timeObject => {
		this.db.collection(`users/${this.user.uid}/times`).add(timeObject);
	};
}

export default Firebase;
