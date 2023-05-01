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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('signup').style.visibility = 'hidden';
    document.getElementById('logout').style.visibilty = 'visible';
  } else {
    document.getElementById('login').style.visibility = 'visible';
    document.getElementById('signup').style.visibility = 'visible';
    document.getElementById('logout').style.visibilty = 'hidden';
  }
});

/*
document.getElementById('buy1').onclick = function() {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // Insert Stripe payment stuff here
    } else {
      alert("You need to be logged in to purchase this item.")
  }
};
*/
//Signout Function
document.getElementById('signout').onclick = function(){
  signOut(auth);
}

document.getElementById('buy1').onclick = function() {
  sessionStorage.setItem("name", "Women's Pleated Deepneck Top");
  sessionStorage.setItem("item", 1);
  sessionStorage.setItem("size", document.getElementById('size1').value);
  sessionStorage.setItem("quantity", document.getElementById('quantity1').value);
  window.location.href = "Payment.html";
};

document.getElementById('buy2').onclick = function() {
  sessionStorage.setItem("name", "Women's Green Shirt");
  sessionStorage.setItem("item", 2);
  sessionStorage.setItem("size", document.getElementById('size2').value);
  sessionStorage.setItem("quantity", document.getElementById('quantity2').value);
  window.location.href = "Payment.html";
};

document.getElementById('buy3').onclick = function() {
  sessionStorage.setItem("name", "Women's White Top");
  sessionStorage.setItem("item", 3);
  sessionStorage.setItem("size", document.getElementById('size3').value);
  sessionStorage.setItem("quantity", document.getElementById('quantity3').value);
  window.location.href = "Payment.html";
};