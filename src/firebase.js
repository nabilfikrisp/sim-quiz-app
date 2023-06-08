// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getDatabase } from 'firebase/database';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyD7BnO7YY-0Xjk23n1F79MFJijQuie8KKA',

    authDomain: 'sim-quiz-app.firebaseapp.com',

    projectId: 'sim-quiz-app',

    storageBucket: 'sim-quiz-app.appspot.com',

    messagingSenderId: '36498834661',

    appId: '1:36498834661:web:0f5716cb97dcd5d021400c',

    databaseURL:
        'https://sim-quiz-app-default-rtdb.asia-southeast1.firebasedatabase.app/.firebaseio.com'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default { app, database };
