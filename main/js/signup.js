// Show password toggle
  document.querySelector('#TogglePasswordVisibility').addEventListener("click", togglePass);
  function togglePass() {
    var pswEle = document.getElementById("registerPasswordID");
    var psw_repeatEle = document.getElementById("confirmPasswordID");
    if (pswEle.type === "password") {
      pswEle.type = "text";
    } else{
      pswEle.type = "password";
    }
    if (psw_repeatEle.type === "password") {
      psw_repeatEle.type = "text";
    } else{
      psw_repeatEle.type = "password";
    }
  }

//Password Contains X auto update
  var myInput = document.getElementById("registerPasswordID");
  var confirmPass = document.getElementById("confirmPasswordID");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var symbol = document.getElementById("symbol");
  var passRepeat = document.getElementById("passRepeat");
  
//Validate Password Complexity Requirements
  myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
      }
    // Validate length
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
    //Validates Symbols
    var symbols = /[!@#$%^&* _=+-]/g;
    if (myInput.value.match(symbols)) {
      symbol.classList.remove("invalid");
      symbol.classList.add("valid");
    } else {
      symbol.classList.remove("valid");
      symbol.classList.add("invalid");
    }
  }
  
//Validate Passwords Matching
  confirmPass.onkeyup = function(){
    if(confirmPass.value.match(myInput)){
      passRepeat.classList.remove("invalid");
      passRepeat.classList.add("valid");
    } else{
      passRepeat.classList.remove("valid");
      passRepeat.classList.add("invalid");
    }
  }

// Import the functions needed from the browser SDKs
import { initializeApp } from 'firebase/app'

import { 
  getAuth, createUserWithEmailAndPassword, 
  PhoneAuthProvider, PhoneMultiFactorGenerator, 
  multiFactor, RecaptchaVerifier, 
  sendEmailVerification, onAuthStateChanged 
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

var clicked = false;

//Monitor if user is logged in and toggle visibility of login and signup buttons accordingly
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('signup').style.visibility = 'hidden';
  } else {
    document.getElementById('login').style.visibility = 'visible';
    document.getElementById('signup').style.visibility = 'visible';
  }
});

//Register User (Password and Email) Function
var phoneNumber;
var registerForm = document.getElementById("registFormID");
registerForm.addEventListener("submit", ()=> {
  var email = document.getElementById("registerEmailID").value;
  var password = document.getElementById("registerPasswordID").value;
  phoneNumber = document.getElementById("registerPhoneID").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //After acccount is created, verify ownership of email
      sendEmailVerification(auth.currentUser)
      console.log("Verification Email Sent.");
      registerForm.reset()
      var signupInfo = document.getElementById('signupInfo');
      signupInfo.style.display = 'none';

      var verifyEmail = document.getElementById('verifyEmail');
      verifyEmail.style.display = 'block';
      console.log(userCredential);
    }
  )
});

document.getElementById('verifiedBtn').onclick = function() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.reload()
        .then(() => {
          if (user.emailVerified) {
            // The user's email has been verified
            console.log("Email verified.");
            verifyEmail.style.display = 'none';
            mfa.style.display = "block";

                // Initialize reCAPTCHA
                const recaptchaVerifier = new RecaptchaVerifier(document.getElementById('recaptcha-container'), {
                  size: 'invisible',
                  callback: () => {
                    // Send SMS verification code
                    const phoneAuthProvider = new PhoneAuthProvider(auth);
                    phoneAuthProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier).then((verificationId) => {
                        console.log('Verification code sent to', phoneNumber);


                        document.getElementById('codeSubmit').onclick = function() {
                        var verificationCode = document.getElementById("otp").value;
                        const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                        // Complete Enrollment
                        console.log("Completing MFA Setup")
                        return multiFactor(user).enroll(multiFactorAssertion, "Phone")
                        .then(() => {
                          console.log("MFA Setup for user. Redirting to home page.")
                          window.location.href = "index.html";
                        })
                        .catch((error) => {
                          console.error('Error setting up MFA', error);
                        });
                        }
                      })
                      .catch((error) => {
                        console.error('Error sending verification code', error);
                      });
                      
                  },
                }, auth);
                // Execute reCAPTCHA verification
                recaptchaVerifier.verify();
          } else {
            // The user's email has been verified. Try Again.
            if (!clicked) {
              clicked = true;
              const h2Check = document.createElement("h2");
              h2Check.innerHTML = "Email has not been verified yet. Try Again.";
              document.getElementById('check').appendChild(h2Check);
            }

          }
        })
    }
  });
};




