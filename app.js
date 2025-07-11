const firebaseConfig = {
  apiKey: "AIzaSyAjKuBsavU8XpnQ_04kL0Gxlaqexl_MW_w",
  authDomain: "drive-inchi.firebaseapp.com",
  projectId: "drive-inchi",
  storageBucket: "drive-inchi.appspot.com",
  messagingSenderId: "134309722061",
  appId: "1:134309722061:web:ff4d8470e193bbec5d9c44",
  measurementId: "G-572VC9MGK8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

window.saveConfig = async function () {
  const model = document.getElementById("model").value;
  const color = document.getElementById("color").value;
  const wheels = document.getElementById("wheels").value;
  const lights = document.getElementById("lights").value;

  const docRef = await db.collection("car_customizations").add({
    model, color, wheels, lights, createdAt: new Date()
  });

  document.getElementById("output").innerText = `Saved! Your ID: ${docRef.id}`;
};

window.loadConfig = async function () {
  const id = prompt("Enter your customization ID:");
  const doc = await db.collection("car_customizations").doc(id).get();

  if (doc.exists) {
    const data = doc.data();
    document.getElementById("model").value = data.model;
    document.getElementById("color").value = data.color;
    document.getElementById("wheels").value = data.wheels;
    document.getElementById("lights").value = data.lights;
    document.getElementById("output").innerText = `Loaded customization for: ${data.model}`;
  } else {
    document.getElementById("output").innerText = "No record found with that ID.";
  }
};
