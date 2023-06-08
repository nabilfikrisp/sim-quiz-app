import { getDatabase, ref, child, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

let data;

const firebaseConfig = {
    apiKey: 'AIzaSyD7BnO7YY-0Xjk23n1F79MFJijQuie8KKA',

    authDomain: 'sim-quiz-app.firebaseapp.com',

    databaseURL:
        'https://sim-quiz-app-default-rtdb.asia-southeast1.firebasedatabase.app',

    projectId: 'sim-quiz-app',

    storageBucket: 'sim-quiz-app.appspot.com',

    messagingSenderId: '36498834661',

    appId: '1:36498834661:web:b02063941d65c26e21400c'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

get(child(dbRef, `scores`))
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            data = snapshot.val();
            const tableBody = document.querySelector('table.table tbody');
            tableBody.innerHTML = '';
            Object.keys(data).forEach((id) => {
                const { username, score } = data[id];

                const row = document.createElement('tr');
                const usernameCell = document.createElement('td');
                const scoreCell = document.createElement('td');

                usernameCell.textContent = username;
                scoreCell.textContent = Math.round((score / 15) * 100);

                row.appendChild(usernameCell);
                row.appendChild(scoreCell);

                tableBody.appendChild(row);
            });
        } else {
            console.log('No data available');
        }
    })
    .catch((error) => {
        console.error(error);
    });
