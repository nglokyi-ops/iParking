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


// =====================================
// MAP POPUP
// =====================================

// Find all parking slot buttons
const slots =
    document.querySelectorAll(".slot");

// Find popup elements
const mapPopup =
    document.getElementById("mapPopup");

const selectedSlot =
    document.getElementById("selectedSlot");

const closePopup =
    document.getElementById("closePopup");

const routeLine =
    document.getElementById("routeLine");


// =====================================
// ROUTES
// =====================================

const routes = {

    A1: "450,600 340,450 500,320 550,400",

    A2: "450,600 340,450 560,280 600,350",

    A3: "450,600 340,450 580,260 760,500 670,570 640,530",

    A4: "450,600 340,450 580,260 750,500 720,530 680,490",

    P1: "450,600 340,450 580,270 640,360 680,340",

    P2: "450,600 340,450 580,270 660,390 720,370",

    P3: "450,600 340,450 580,270 700,450 740,420",
    
    P4: "450,600 340,450 580,270 720,480 770,460" 

};


// =====================================
// CLICK PARKING SLOT
// =====================================

slots.forEach(function(slot) {

    slot.addEventListener("click", function() {

        // Show selected parking slot
        selectedSlot.textContent = slot.id;

        // Draw route
        routeLine.setAttribute(
            "points",
            routes[slot.id]
        );

        // Open popup
        mapPopup.style.display = "flex";

    });

});


// =====================================
// CLOSE POPUP
// =====================================

closePopup.addEventListener("click", function() {

    mapPopup.style.display = "none";

});


// Close when clicking outside white box
mapPopup.addEventListener("click", function(event) {

    if (event.target === mapPopup) {

        mapPopup.style.display = "none";

    }

});
