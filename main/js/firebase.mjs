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
  multiFactor, RecaptchaVerifier, sendEmailVerification, 
  onAuthStateChanged, signInWithEmailAndPassword,
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


//Authorization Object
//Register User (Password and Email) Function
var registerForm = document.getElementById("registFormID");
registerForm.addEventListener("submit", ()=> {
  var email = document.getElementById("registerEmailID").value;
  var password = document.getElementById("registerPasswordID").value;
  //var verificationCode = document.getElementById("verificationCodeID").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //After acccount is created, verify ownership of email
      sendEmailVerification(auth.currentUser)
    }
  )
});


var mfaForm = document.getElementById("mfaFormID")
mfaForm.addEventListener("submit",()=>{
  var phone = document.getElementById("registerPhoneID");
  const recaptchaVerifier = new RecaptchaVerifier (submitButton, undefined, auth);
  var user = auth.currentUser;
  multiFactor(user).getSession()
    .then(function (multiFactorSession){
      const phoneInfoOptions ={
        phoneNumber : phone,
        session : multiFactorSession
      };
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      // Send SMS Verification Code
      return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
    })
    // User is Prompted for Verification Code
    .then(function(verificationID){
      var codeForm = document.getElementById("codeFormID");
      //user submits verifcation code
      codeForm.addEventListener("submit", ()=>{
        var verificationCode = document.getElementById("otp").value;
        const cred = PhoneAuthProvider.credential(verificationID, verificationCode);
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
        // Complete Enrollment
        return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
      })
    })
})