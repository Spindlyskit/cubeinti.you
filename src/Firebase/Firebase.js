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

const defaultSettings = {
	darkTheme: false,
};

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

		this.app.auth().onAuthStateChanged(async u => {
			if (u !== null) {
				this.emit('signIn', u);
				this.user = u;
				const settingsTest = await this.db.doc(`users/${this.user.uid}`).get()
					.then(data => {
						if (data.exists) {
							return data.data();
						} else {
							this.db.doc(`users/${this.user.uid}`).set(defaultSettings);
							return defaultSettings;
						}
					});
				this.emit('settingsChange', settingsTest);
			} else {
				this.user = null;
				this.emit('signOut', this.user);
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

	updateSettings = settingsObject => {
		this.db.doc(`users/${this.user.uid}`).update(settingsObject);
	};

	addPenalty = (t, p) => {
		if (this.user) {
			this.db.collection(`users/${this.user.uid}/times`).where('created', '==', t.created)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						this.db.collection(`users/${this.user.uid}/times`).doc(doc.id).update({ penalty: p });
					});
				});
		}
	};

	deleteTime = t => {
		if (this.user) {
			this.db.collection(`users/${this.user.uid}/times`).where('created', '==', t.created)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						this.db.collection(`users/${this.user.uid}/times`).doc(doc.id).delete();
					});
				});
		}
	};
}

export default Firebase;
