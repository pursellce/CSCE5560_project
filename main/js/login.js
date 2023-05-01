import { initializeApp } from 'firebase/app'
import {
  getAuth, getMultiFactorResolver,
  PhoneAuthProvider, PhoneMultiFactorGenerator,
  RecaptchaVerifier, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

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
//Authorization Object
const auth = getAuth(app);
//Monitor if user is logged in and toggle visibility of login and signup buttons accordingly
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('signup').style.visibility = 'hidden';
    document.getElementById('logout').style.display = 'block';
  } else {
    document.getElementById('login').style.visibility = 'visible';
    document.getElementById('signup').style.visibility = 'visible';
    document.getElementById('logout').style.display = 'none';
  }
});

document.getElementById('logout').onclick = function(){
  console.log("Sign out.")
  signOut(auth);
}

//LOGIN Function
document.getElementById("mfaID").style.display='none';

var loginForm = document.getElementById("loginFormID");
//User enters email and password and hits submit button
loginForm.addEventListener("submit", ()=> {
  var email = document.getElementById("loginEmailID").value;
  var password = document.getElementById("loginPasswordID").value;
  //Begin logging in user with email and password
  signInWithEmailAndPassword(auth, email, password)
    //Catch error generated when account has mfa enabled (all users)
    .catch(function(error){
      if(error.code == 'auth/multi-factor-auth-required'){
        //To DO: if user is able to sign in without mfa delete their account and 
        //instruct to create new account with phone

        //hide email and password input boxes/submit button, display mfa input box/submit button
        document.getElementById("emailPassInfoID").style.display = 'none';
        document.getElementById("mfaID").style.display = 'block';

        //begin mfa login steps
        const resolver = getMultiFactorResolver(auth, error);
        if(resolver.hints.find((hint) => hint.factorId === PhoneMultiFactorGenerator.FACTOR_ID)){
          console.log("FactorID Check.");
          const phoneInfoOptions ={
            multiFactorHint: resolver.hints.find((hint) => hint.factorId),
            session: resolver.session
          };
          console.log("Start Recaptcha");
          //send SMS code
          const recaptchaVerifier = new RecaptchaVerifier(document.getElementById("recaptcha-container"), {
            size: 'invisible',
            callback: () =>{
            //send SMS verification code
            console.log("Send Message.");
              const phoneAuthProvider = new PhoneAuthProvider(auth);
              phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
                .then(function(verificationId){
                    //get SMS Verifcation Code from user
                  console.log("Message Sent.");
                  document.getElementById("mfaCodeSubmit").onclick = function(){
                    var verificationCode = document.getElementById("otpID").value;
                    const cred = PhoneAuthProvider.credential(
                      verificationId, verificationCode);
                    const multiFactorAssertion =
                    PhoneMultiFactorGenerator.assertion(cred);
                    //complete signin
                    console.log("Completing MFA login");
                    return resolver.resolveSignIn(multiFactorAssertion)
                      .then(()=>{
                        console.log("MFA Login Sucessful!");
                        window.location.href = "index.html";
                      })
                      .catch((error) => {
                        console.error('Error resolving mfa login')
                      })
                  }
                })
              },
            },
          auth);
          // Execute reCAPTCHA verification
          recaptchaVerifier.verify();
        }
      else if(error.code == 'auth/wrong-password'){
        loginForm.reset();
        alert("Password is incorrect, please try again.")
      }
      else{
        loginForm.reset();
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Something went wrong...please try again");
      }
    }
})
})





  // Show password toggle
  document.querySelector('#TogglePasswordVisibility').addEventListener("click", togglePass);
  function togglePass() {
    var pswEle = document.getElementById("loginPasswordID");
    if (pswEle.type === "password") {
      pswEle.type = "text";
    } else{
      pswEle.type = "password";
    }
  }