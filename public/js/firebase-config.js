import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFbEir_TzlorxtEoSnw2Iua6hCLvueiaM",
  authDomain: "website-gainthehouse.firebaseapp.com",
  projectId: "website-gainthehouse",
  storageBucket: "website-gainthehouse.appspot.com",
  messagingSenderId: "960402060248",
  appId: "1:960402060248:web:28a5e0420374ae304578ad",
  measurementId: "G-BLDSXDKTKP"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
