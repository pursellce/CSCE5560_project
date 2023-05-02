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
    document.getElementById('logout').style.display = 'block';
  } else {
    document.getElementById('login').style.visibility = 'visible';
    document.getElementById('signup').style.visibility = 'visible';
    document.getElementById('logout').style.display = 'none';
  }
});

//Signout Function
document.getElementById('logout').onclick = function(){
  console.log("Sign out.")
  signOut(auth);
}




import { loadStripe } from '@stripe/stripe-js';

const stripe =  await loadStripe('pk_test_51MzkXaEJsQttsu4FlxKIENaeeI3rUmOG5zRPisUdQCBK2uRjAHbw0czg7LjfAK7BLSmqIxCslFkfRubVcpklYMEc00VQq9rvYg');

let itemPrice;
let itemQuantity;

document.getElementById('buy1').onclick = function() {
  console.log("Button Clicked")
  onAuthStateChanged(auth, (user) => {
  if (user) {
    itemPrice = 'price_1N0XkjEJsQttsu4FFmP5PYDi';
    itemQuantity = parseInt(document.getElementById('quantity1').value);
    redirectToCheckout();
    } else {
      alert("You need to be logged in to purchase this item.")
    }
  });
};

document.getElementById('buy2').onclick = function() {
  console.log("Button Clicked")
  onAuthStateChanged(auth, (user) => {
  if (user) {
    itemPrice = 'price_1N2mvXEJsQttsu4FpIpdhlVJ';
    itemQuantity = parseInt(document.getElementById('quantity2').value);
    redirectToCheckout();
    } else {
      alert("You need to be logged in to purchase this item.")
    }
  });
};

document.getElementById('buy3').onclick = function() {
  console.log("Button Clicked")
  onAuthStateChanged(auth, (user) => {
  if (user) {
    itemPrice = 'price_1N2n3EEJsQttsu4FyE6ErcT4';
    itemQuantity = parseInt(document.getElementById('quantity3').value);
    redirectToCheckout();
    } else {
      alert("You need to be logged in to purchase this item.")
    }
  });
};

const redirectToCheckout = async () => {
  console.log("Redirect to checkout.");
  const { error } = await stripe.redirectToCheckout({
    lineItems: [
      { price: itemPrice, quantity: itemQuantity }
    ],
    mode: 'payment',
    successUrl: 'https://csce5560-project.firebaseapp.com/',
    cancelUrl: 'https://csce5560-project.firebaseapp.com/',
    shippingAddressCollection: {
      allowedCountries: ['US', 'CA'],
    },
  });
  if (error) {
    console.error(error);
  }
};

