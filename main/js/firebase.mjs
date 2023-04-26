// Import the functions needed from the browser SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";
//Recaptcha STUFF





//Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrgPio0COrd8AiMDiBb7sWsUx_Xl7Eip0",
    authDomain: "csce5560-project.firebaseapp.com",
    databaseURL: "https://csce5560-project-default-rtdb.firebaseio.com",
    projectId: "csce5560-project",
    storageBucket: "csce5560-project.appspot.com",
    messagingSenderId: "53120338249",
    appId: "1:53120338249:web:4839a3e417b0345ad6f298",
    measurementId: "G-8JE4QWELZJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//reCAPTCHA stuff
  // Pass your reCAPTCHA v3 site key (public key) to activate(). This
  // key is the counterpart to the secret key set in the Firebase console.
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lfnab4lAAAAANl-9F4OHi0d9nxezFM4EqLzFuR4'),
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });


/*
alternative if statement for testing
if (process.browser){
  const appCheckKey = "CDD5A472-7BA1-494D-86BB-2117BD651C96";
}
*/

//Authorization Object
const auth = getAuth(app);

//Register User Function
var form = document.getElementById("registFormID");
form.addEventListener("submit", registerUser)
function registerUser (){
  var email = document.getElementById("registerEmailID");
  var password = document.getElementById("registerPasswordID");
  createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    alert("user created!!");
    console.log("User created!");
    if(userCredential.user){
      location.href = 'index.html';
    }
    else{
      alert("Something went wrong...");
    }
  })
.catch((error) => {
  const errorCode = error.code;
  console.log(errorCode);
  const errorMessage = error.message;
  console.log(errorMessage);
});
}