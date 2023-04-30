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

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

var name = sessionStorage.getItem("name");
var size = sessionStorage.getItem("size");
var quantity = sessionStorage.getItem("quantity");
var item = sessionStorage.getItem("item");

var img = document.createElement('img');
if (item == 1) {
    img.src ='https://mauricesprodatg.scene7.com/is/image/mauricesProdATG/208509_C1943?$large$';
} else if (item == 2) {
    img.src ='https://www.lulus.com/images/product/xlarge/4187950_846442.jpg?w=195&hdpi=1';
} else if (item == 3) {
    img.src ='https://www.lulus.com/images/product/xlarge/4188590_846422.jpg?w=195&hdpi=1';
} else {
    alert("Error Displaying Product image!")
}
img.width="97"
img.height="146"
document.getElementById('product').appendChild(img);

const pName = document.createElement("p");
pName.innerHTML = name;
document.getElementById('productName').appendChild(pName);

const productSize = document.createElement("p");
productSize.innerHTML = "Size: " + size
document.getElementById('productInfo').appendChild(productSize);

const productQuantity = document.createElement("p");
productQuantity.innerHTML = "Quantity: " + quantity;
document.getElementById('productInfo').appendChild(productQuantity);

var totalCost = quantity * 20;

const price = document.createElement("p");
price.innerHTML = "Total: $" + totalCost;
document.getElementById('totalPrice').appendChild(price);

document.getElementById('buy').onclick = function() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //User is logged in and can buy
    } else {
      alert("You need to be logged in to purchase this item.")
    }
  });
};

