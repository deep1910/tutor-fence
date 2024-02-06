import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {    
    apiKey: "AIzaSyCZ2w5mmSSDVfb0xCAEhy7pGICmkDapS04",
    authDomain: "tutor-93492.firebaseapp.com",
    databaseURL: "https://tutor-93492-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tutor-93492",
    storageBucket: "tutor-93492.appspot.com",
    messagingSenderId: "422544221469",
    appId: "1:422544221469:web:8aa27ba8defc8f1cec2df4",
    measurementId: "G-5NKGYE87GD"
}


if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}


const db = getDatabase();

export {db};