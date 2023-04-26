// Import the functions needed from the browser SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {initializeAppCheck, ReCaptchaEnterpriseProvider} from "firebase/app-check";
//Recaptcha STUFF
const {RecaptchaEnterpriseServiceClient} =
require('@google-cloud/recaptcha-enterprise');
/**
* Create an assessment to analyze the risk of an UI action. Note that
* this example does set error boundaries and returns `null` for
* exceptions.
* projectID: GCloud Project ID
* recaptchaSiteKey: Site key obtained by registering a domain/app to use recaptcha services.
* token: The token obtained from the client on passing the recaptchaSiteKey.
* recaptchaAction: Action name corresponding to the token.
*/
async function createAssessment({
projectID = "6LfczrwlAAAAAAI_IuJi_Y2bSx_GvzikK8uXL6x3",
recaptchaSiteKey = "6LfczrwlAAAAAAI_IuJi_Y2bSx_GvzikK8uXL6x3",
token = "action-token",
recaptchaAction = "action-name",
}) {
// Create the reCAPTCHA client & set the project path. There are multiple
// ways to authenticate your client. For more information see:
// https://cloud.google.com/docs/authentication
// TODO: To avoid memory issues, move this client generation outside
// of this example, and cache it (recommended) or call client.close()
// before exiting this method.
const client = new RecaptchaEnterpriseServiceClient();
const projectPath = client.projectPath(projectID);

// Build the assessment request.
const request = ({
assessment: {
 event: {
   token: token,
   siteKey: recaptchaSiteKey,
 },
},
parent: projectPath,
});

// client.createAssessment() can return a Promise or take a Callback
const [ response ] = await client.createAssessment(request);

// Check if the token is valid.
if (!response.tokenProperties.valid) {
console.log("The CreateAssessment call failed because the token was: " +
response.tokenProperties.invalidReason);

return null;
}

// Check if the expected action was executed.
// The `action` property is set by user client in the
// grecaptcha.enterprise.execute() method.
if (response.tokenProperties.action === recaptchaAction) {

// Get the risk score and the reason(s).
// For more information on interpreting the assessment,
// see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
console.log("The reCAPTCHA score is: " +
response.riskAnalysis.score);

response.riskAnalysis.reasons.forEach((reason) => {
console.log(reason);
});
return response.riskAnalysis.score;
} else {
console.log("The action attribute in your reCAPTCHA tag " +
"does not match the action you are expecting to score");
return null;
}
}




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
    provider: new ReCaptchaEnterpriseProvider('6LfczrwlAAAAAAI_IuJi_Y2bSx_GvzikK8uXL6x3'),
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
  createUserWithEmailAndPassword(auth, email, password)
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