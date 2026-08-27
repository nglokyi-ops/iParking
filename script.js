// =====================================
// FIREBASE IMPORTS
// =====================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {

    apiKey: "AIzaSyCaRJ5VIqKoa4GKS7MYBEo7ooDaTE3KEYI",

    authDomain: "iparking-e333b.firebaseapp.com",

    databaseURL:
    "https://iparking-e333b-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "iparking-e333b",

    storageBucket: "iparking-e333b.firebasestorage.app",

    messagingSenderId: "336114013412",

    appId: "1:336114013412:web:e6a18068b885a290c688f1"

};


// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

console.log("Firebase initialized");


// =====================================
// PARKING SLOT LIST
// =====================================

const parkingSlots = [
    "A1",
    "A2",
    "A3",
    "A4",
    "P1",
    "P2",
    "P3",
    "P4"
];


// =====================================
// READ PARKING STATUS FROM FIREBASE
// =====================================

parkingSlots.forEach((slotName) => {

    // Find parking button in HTML
    const slotButton =
        document.getElementById(slotName);


    // Firebase location
    const slotRef =
        ref(db,  "Parking/" + slotName + "/status");


    // Listen for Firebase changes
    onValue(slotRef, (snapshot) => {

        const occupied = snapshot.val();

        console.log(
            slotName,
            "Firebase value:",
            occupied
        );


        // =============================
        // OCCUPIED
        // =============================

        if (occupied === true)
        {
            slotButton.classList.remove("available");

            slotButton.classList.add("occupied");

            console.log(slotName + " = OCCUPIED");
        }


        // =============================
        // AVAILABLE
        // =============================

        else
        {
            slotButton.classList.remove("occupied");

            slotButton.classList.add("available");

            console.log(slotName + " = AVAILABLE");
        }
        
        updateAvailableCounter();
        updateOccupiedCounter();

    });

});

// =============================
// Counter Available
// =============================
function updateAvailableCounter() {

    const availableSlots =
        document.querySelectorAll(".available").length;

    document.getElementById("availableCount").textContent =
        availableSlots;
}

// =============================
// Counter Occupied
// =============================
function updateOccupiedCounter() {

    const occupiedSlots =
        document.querySelectorAll(".occupied").length;

    document.getElementById("occupiedCount").textContent =
        occupiedSlots;
}