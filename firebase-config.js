import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWu81tDboNemWkj8376iycHA0B-XPDpvM",
  authDomain: "neurocare-94033.firebaseapp.com",
  databaseURL: "https://neurocare-94033-default-rtdb.firebaseio.com",
  projectId: "neurocare-94033",
  storageBucket: "neurocare-94033.firebasestorage.app",
  messagingSenderId: "314429385093",
  appId: "1:314429385093:web:345d2b8f3ee446ca37fcec"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);