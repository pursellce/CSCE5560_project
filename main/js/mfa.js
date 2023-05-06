import { initializeApp } from 'firebase/app'
//Configuration
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxx"
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


