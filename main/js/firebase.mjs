// Import the functions needed from the browser SDKs
import { initializeApp } from 'firebase/app'
//import {
  //getFirestore, collection, onSnapshot,
  //addDoc, deleteDoc, doc, query, where,
  //orderBy, getDoc, updateDoc
//} from 'firebase/firestore'
import { 
  getAuth,createUserWithEmailAndPassword,
  PhoneAuthProvider, PhoneMultiFactorGenerator,
  multiFactor, RecaptchaVerifier,  
  //onAuthStateChanged, signInWithEmailAndPassword,
  //isSignInWithEmailLink, sendSignInLinkToEmail,
  //signOut 
} from 'firebase/auth'
//import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';
 
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
const auth = getAuth();
const recaptchaVerifier = new RecaptchaVerifier ('recaptcha-container-id', undefined, auth);

//Authorization Object
//Register User Function
var registerForm = document.getElementById("registFormID");
registerForm.addEventListener("submit", ()=> {
  var email = document.getElementById("registerEmailID").value;
  var password = document.getElementById("registerPasswordID").value;
  var phone = document.getElementById("registerPhoneID").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      multiFactor(user).getSession()
        .then(function (multiFactorSession){
          const phoneInfoOptions ={
            phoneNumber : phone,
            session : multiFactorSession
          };
          const phoneAuthProvider = new PhoneAuthProvider(auth);

          // Send SMS Verification Code
          return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
        }).then(function(verificationID){
          // User is Prompted for Verification Code
          const cred = PhoneAuthProvider.credential(verificationID, verificationCode);
          const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

          // Complete Enrollment
          return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
        });

    }
        





    )
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    })
  }
)


var regSubmit =document.getElementById("registerSubmit");  
