// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHoyhZGGSA3XX2VkvPd-8_ZuCPAESVb7M",
  authDomain: "prueba-1-8f7ba.firebaseapp.com",
  projectId: "prueba-1-8f7ba",
  storageBucket: "prueba-1-8f7ba.appspot.com",
  messagingSenderId: "1065213227563",
  appId: "1:1065213227563:web:a9111c92fd15b17047f06e",
  measurementId: "G-VPJEN815JP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const reg = document.getElementById("reg");
const log = document.getElementById("log");
const mail = document.getElementById("mail");
const pass = document.getElementById("pass");
const close = document.getElementById("close");
const observer = document.getElementById("observer");
const providerGoogle = new GoogleAuthProvider();
const googlebut = document.getElementById("googlebut");

reg.addEventListener("click", function () {
  createUserWithEmailAndPassword(auth, mail.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Sí");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

log.addEventListener("click", function () {
  signInWithEmailAndPassword(auth, mail.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Sí por dos");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

close.addEventListener("click", function () {
  createUserWithEmailAndPassword(auth, mail.value, pass.value);
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Saliste de tu cuenta");
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    observer.innerHTML = `
      Cuenta conectada: ${user.email}
      `;
    // ...
  } else {
    // User is signed out
    // ...
    observer.innerText = "No hay una cuenta conectada";
  }
});

googlebut.addEventListener("click", function () {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
