// Import the functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

//register user function
function registerUser (){
  var email = document.getElementById("registerEmailID");
  var password = document.getElementById("registerPasswordID");
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // After account created, user is automatically signed in an sent back to home page
    const user = userCredential.user;
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

  