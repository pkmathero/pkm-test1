import { data } from './script.js'; // Sesuaikan path dengan nama berkas Anda
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, onValue, set, database } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABTWYrtRsXI7BcFQzE_mEk7wM_9PCEAAk",
    authDomain: "pkm-athero.firebaseapp.com",
    databaseURL: "https://pkm-athero-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pkm-athero",
    storageBucket: "pkm-athero.appspot.com",
    messagingSenderId: "92399131259",
    appId: "1:92399131259:web:dad060d2dde3439aa2a0de",
    measurementId: "G-D13VVQH9YW"
  };

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase()
const db2 = database()
// const dbRef = ref(db);

let data_BPM;
//BPM 
onValue(ref(db, 'BPM/BPM_1'), (snapshot) => {
  data_BPM = snapshot.val();
  var tampil_BPM   = document.getElementById('BPM')
  tampil_BPM.innerHTML = "BPM: " + data_BPM 
});

let data_SPO2
//Kadar SPO2
onValue(ref(db, 'SPO2/SPO2_1'), (snapshot) => {
  data_SPO2 = snapshot.val();
  var tampil_SPO2   = document.getElementById('SPO2')
  tampil_SPO2.innerHTML = "SPO2: " + data_SPO2 + " %" 
});
//Ekspor variabel ke file lain
export { data_BPM, data_SPO2 }; 
var dataToSend = data;
set(ref(db2, 'Kondisi/Kondisi_1'), dataToSend)
  .then(() => {
  console.log("Data berhasil dikirim.");
  })
  .catch((error) => {
  console.error("Gagal mengirim data:", error);
  });