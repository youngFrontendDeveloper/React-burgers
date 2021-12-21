// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYSsLnOl9Fz8J5q5l_D4yarf-T3AihgFA",
  authDomain: "very-hot-burgers-72242.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-72242-default-rtdb.firebaseio.com",
  projectId: "very-hot-burgers-72242",
  storageBucket: "very-hot-burgers-72242.appspot.com",
  messagingSenderId: "265624169041",
  appId: "1:265624169041:web:de71bf29aea3d60a13a670"
};

// Initialize Firebase - связывания нашего проекта с Firebase:
export const app = initializeApp( firebaseConfig );

// Получаем данные из базы данных firebase:
export const db = getDatabase( app );

// // сылка на restaurants из базы данных
// export const restaurantsRef = ref( db, "restaurants" );
//
// // Доступ к конкретному restaurant
// export const getRestaurantRefById = (id) => ref( db, `restaurants/${ id }` );
//
//
// // export const base = Rebase.createClass( db );
// console.log( db );
