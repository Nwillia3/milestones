
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const config = {
  apiKey: "AIzaSyAnw1ZbMEuE0uqmOUJ5bjkMl0inrUE94qU",
  authDomain: "getmilestones.firebaseapp.com",
  databaseURL: "https://getmilestones.firebaseio.com",
  projectId: "getmilestones",
  storageBucket: "getmilestones.appspot.com",
  messagingSenderId: "72320588684",
  appId: "1:72320588684:web:8689bed50f7f1287"
};

/**
 * Implemented as a singleton
 */
class Firebase {
  constructor() {
    if (!Firebase.instance) {
      Firebase.instance = this

      app.initializeApp(config)
    }

    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.fdb = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();


    return Firebase.instance
  }

  // *** Auth API ***

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  // *** TODO: Merge Auth and DB User API in LocalStorage *** //

  // *** User API ***

  user = uid => this.fdb.collection("users").doc(uid)

}

const FirebaseInstance = new Firebase()
Object.freeze(FirebaseInstance)


export default FirebaseInstance;