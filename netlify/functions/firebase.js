const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBV4ENyf8O8prGCmXSBWg7DUnvuHnQAnfU",
  authDomain: "smc-final-project.firebaseapp.com",
  projectId: "smc-final-project",
  storageBucket: "smc-final-project.appspot.com",
  messagingSenderId: "660955503732",
  appId: "1:660955503732:web:7c0a578732def634df8521"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase