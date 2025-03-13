import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore , doc , setDoc , updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const submit = document.getElementById("submit");

submit.addEventListener('click', function(event){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const phone_number = document.getElementById("phone_number").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;

    onAuthStateChanged(auth, (user) => {
        if(user){
            const userRef = doc(db, "users", user.uid);

            updateDoc(userRef,{
                name: name,
                age: age,
                phone_number: phone_number,
                state: state,
                city: city
            })
            .then(() => {
              alert("Details updated successfully!");
              window.location.href = "dashboard.html"; // Redirect after updating
            })
            .catch((error) => {
              alert("Error updating details: " + error.message);
            });
        } else {
          alert("No user is signed in. Please log in first.");
        }
    });
});