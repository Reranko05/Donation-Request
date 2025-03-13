import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC3MPFC9nVSRKHDrzdMUjsTAMt7HllAYIo",
    authDomain: "donation-platform-8b345.firebaseapp.com",
    databaseURL: "https://donation-platform-8b345-default-rtdb.firebaseio.com", 
    projectId: "donation-platform-8b345",
    storageBucket: "donation-platform-8b345.appspot.com",
    messagingSenderId: "369874218838",
    appId: "1:369874218838:web:39882650bdf9f7bde6f0f7",
    measurementId: "G-KS3895XW2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Check if user is logged in
let currentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        loadDonations(user.uid);
    } else {
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
});

// Handle Form Submission
document.getElementById("donateForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (!currentUser) {
        alert("You must be logged in to donate.");
        return;
    }

    const itemName = document.getElementById("itemname").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;

    const donationRef = push(ref(db, `donations/${currentUser.uid}`));

    set(donationRef, {
        itemName: itemName,
        category: category,
        quantity: quantity,
        available: "Yes",
        timestamp: Date.now()
    })
    .then(() => {
        alert("Donation added successfully!");
        document.getElementById("donateForm").reset();
        loadDonations(currentUser.uid);
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
});

// Function to Load Donations
function loadDonations(uid) {
    const tableBody = document.getElementById("donationTableBody");
    tableBody.innerHTML = "";

    const userDonationsRef = ref(db, `donations/${uid}`);
    onValue(userDonationsRef, (snapshot) => {
        tableBody.innerHTML = "";
        let count = 1;
        snapshot.forEach((childSnapshot) => {  // Fixed "foreach" to "forEach"
            const donation = childSnapshot.val();
            const row = `<tr>
                <td>${count++}</td>
                <td>${donation.itemName}</td>
                <td>${donation.category}</td>
                <td>${donation.quantity}</td>
                <td>${donation.available}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    });
}
