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

//Script to Import Firebase Stuff


//Register User Function
/* MAY REMOVE
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
*/
