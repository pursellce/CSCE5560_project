import { initializeApp } from 'firebase/app'
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
import { getAuth, applyActionCode, onAuthStateChanged  } from 'firebase/auth'
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

const urlParams = new URLSearchParams(window.location.search);
const actionCode = urlParams.get('oobCode');
  
if (actionCode) {
 applyActionCode(auth, actionCode)
   .then(() => {
    console.log("Email verification completed successfully");
  })
  .catch((error) => {
      console.error("Error completing email verification", error);
     });
} else {
console.error("Email verification action code not found");
}


