import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore , doc , setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

const submit = document.getElementById("submit");

submit.addEventListener('click', function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user_type = document.getElementById("user_type").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db,"users",user.uid),{
                email: user.email,
                uid: user.uid,
                displayName: username,
                user_type: user_type

            })

        .then(() =>{
            alert("Account Created Successfully. Please verify your email before logging in.");
            window.location.href="getStarted.html";
        })
        
  })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
  });
})