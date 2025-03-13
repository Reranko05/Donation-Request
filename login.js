import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3MPFC9nVSRKHDrzdMUjsTAMt7HllAYIo",
  authDomain: "donation-platform-8b345.firebaseapp.com",
  projectId: "donation-platform-8b345",
  storageBucket: "donation-platform-8b345.firebasestorage.app",
  messagingSenderId: "369874218838",
  appId: "1:369874218838:web:39882650bdf9f7bde6f0f7",
  measurementId: "G-KS3895XW2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById("submit");

submit.addEventListener('click' , function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;



signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("Login Successful!");
    window.location.href = "dashboard.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

});