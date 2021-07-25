import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    // this.auth = app.auth();
    this.db = app.firestore();
  }

  async signup(name, email, password) {
    const newUser = await app.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  async login(email, password) {
    return await app.auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await app.auth().signOut();
  }

  async resetPassword(email) {
    await app.auth().sendPasswordResetEmail(email);
  }

  getUser() {
    return app.auth().currentUser;
  }

  async __executeDummyFunction(throwException) {
    if (throwException) {
      throw {
        message: "A terrible error has occurred!",
      };
    } else {
      return {
        message: "Execution is good!",
      };
    }
  }
}

const firebase = new Firebase();
export default firebase;
