// Import the functions needed from the browser SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
import {initializeAppCheck, ReCaptchaV3Provider} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app-check.js';

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

// Pass your reCAPTCHA v3 site key (public key) to activate(). This
// key is the counterpart to the secret key set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfczrwlAAAAAAI_IuJi_Y2bSx_GvzikK8uXL6x3'),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

//Authorization Object
const auth = getAuth(app);

//export variables and functions needed in other .js files
export {
  auth, createUserWithEmailAndPassword
}
