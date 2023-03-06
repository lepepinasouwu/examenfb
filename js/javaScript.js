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
  FacebookAuthProvider,
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

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
const googlebut = document.getElementById("googlebut");
const providerGoogle = new GoogleAuthProvider();
const facebut = document.getElementById("facebut");
const providerFacebook = new FacebookAuthProvider();
const gitbut = document.getElementById("gitbut");
const providerGit = new GithubAuthProvider();
const principal = document.getElementById("principal");
const crud = document.getElementById("crud");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const pais = document.getElementById("pais");
const add = document.getElementById("add");
const leer = document.getElementById("leer");
const actualizar = document.getElementById("actualizar");
const borrar = document.getElementById("borrar");
const mostrar = document.getElementById("mostrar");
const id = document.getElementById("nombre2");
const usuario2 = document.getElementById("usuario2");
const pais2 = document.getElementById("pais2");
const puntuacion = document.getElementById("puntuacion");
const tablas = document.getElementById("tabla");

var long;
var lat;

const db = getFirestore(app);

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
    principal.classList.add("hide");
    crud.classList.remove("hide");
    observer.innerHTML = `
      ${user.email}
      `;
    // ...
  } else {
    // User is signed out
    // ...
    principal.classList.remove("hide");
    crud.classList.add("hide");
    observer.innerText = "No hay una cuenta";
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

facebut.addEventListener("click", function () {
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});

gitbut.addEventListener("click", function () {
  signInWithPopup(auth, providerGit)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
});

//Código del crud//

add.addEventListener("click", async () => {
  try {
    await setDoc(doc(db, "users", nombre.value), {
      Nombre: nombre.value,
      Usuario: usuario.value,
      País: pais.value,
    });
    alert(`Al id ${nombre.value} se le creó un registro.`);
  } catch (error) {
    alert("Llena los datos");
    console.error("Error adding document: " + error);
  }
});

leer.addEventListener("click", async () => {
  const docRef = doc(db, "users", id.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    usuario2.value = docSnap.data().Usuario;
    pais2.value = docSnap.data().País;
    puntuacion.value = docSnap.data().Puntuación;
    long = docSnap.data().Longitud;
    lat = docSnap.data().Latitud;

    console.log("Document data:", docSnap.data());
    //MAPBOX

    mapboxgl.accessToken =
      "pk.eyJ1IjoieWVndXNzc3MiLCJhIjoiY2xld2sxMHBlMjZmeDNzcTZtbHBrcjFpeSJ9.vfkeU_92PS5XbO76f9-UMw";
    const map = new mapboxgl.Map({
      container: "map",
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v12",
      center: [long, lat],
      zoom: 2,
      projection: "globe", // starting projection
      // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });

    // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    map.on("load", () => {
      // Load an image from an external URL.
      map.loadImage(
        "https://img.icons8.com/emoji/256/black-cat-emoji.png",
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage("cat", image);

          // Add a data source containing one point feature.
          map.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [long, lat],
                  },
                },
              ],
            },
          });

          // Add a layer to use the image to represent the data.
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "point", // reference the data source
            layout: {
              "icon-image": "cat", // reference the image
              "icon-size": 0.25,
            },
          });
        }
      );
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    alert("No hay registros, o el ID está mal.");
  }
});

actualizar.addEventListener("click", async () => {
  const elementRef = doc(db, "users", id.value);

  await updateDoc(elementRef, {
    Nombre: nombre2.value,
    Usuario: usuario2.value,
    País: pais2.value,
    Puntuación: puntuacion.value,
  });
  alert("El registro de " + id.value + " han cambiado.");
});

borrar.addEventListener("click", async () => {
  await deleteDoc(doc(db, "users", id.value));

  alert("El registro de " + id.value + " se borró");
});

mostrar.addEventListener("click", async () => {
  tablas.innerHTML = `<tr>
      <td>  ID  </td>
      <td>  Nombre  </td>
      <td>  Usuario  </td>
      <td>  País  </td>
      <td>  Puntuación  </td>
  </tr>`;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    tablas.innerHTML += `<tr>
          <td>${doc.id}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Usuario}</td>
          <td>${doc.data().País}</td>
          <td>${doc.data().Puntuación}</td>
      </tr>`;
  });
});
