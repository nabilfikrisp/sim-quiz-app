import questionsData from './questions';
// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getDatabase, ref, push, update, child } from 'firebase/database';

import img1 from './images/11.png';
import img2 from './images/12.png';
import img3 from './images/13.png';
import img4 from './images/14.png';
import img5 from './images/15.png';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

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

const questions = questionsData;
const question = document.getElementById('question');
const choices = document.getElementsByClassName('choice-text');
const choiceBox = document.getElementsByClassName('choice-box');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const questionIndex = document.getElementById('current-question-index');

const scoreInput = document.getElementById('score-input');
const answeredSpan = document.getElementById('answered');
const timerSpan = document.getElementById('timer');
const TIMER = 180;
const startSection2 = document.getElementById('start-section-2');
const section2Instruction = document.getElementById('section-2-instruction');

let timerInterval;
let autoInterval;
let currentQuestion = {};
let currentQuestionIndex = 1;
let score = 0;
let userAnswers = {};
let answered = Object.keys(questions).length;
let checkedRadio = 0;
const usernameInput = document.querySelector('#username-input');

const form = document.getElementById('form-input');
const submitBtn = document.getElementById('submit-form');
const imageQuestion = document.querySelector('#image-question');

startSection2.addEventListener('click', function () {
    const username = document.querySelector('#username');
    if (username === '') {
        usernameInput.value = 'player';
    } else {
        usernameInput.value = username.value;
    }

    const bgm = document.querySelector('#bgm');
    bgm.volume = 0.7;
    bgm.play();

    document.getElementById('test_body').classList.remove('hidden');
    document.getElementById('test_body').classList.add('flex');

    section2Instruction.classList.add('hidden');
    clearInterval(autoInterval);
    startSectionTwo();
});

function startSectionTwo() {
    currentQuestion = questions[currentQuestionIndex];
    question.innerHTML = currentQuestion.Question;
    questionIndex.innerHTML = currentQuestionIndex;

    for (let choice of choiceBox) {
        const choiceSpan = choice.children['choice-span'];
        const choiceRadio = choice.children['choice-radio'];
        const number = choiceSpan.dataset['number'];

        choiceSpan.innerText = currentQuestion[`Choice${number}`];
        choiceRadio.value = currentQuestion[`Choice${number}`];
        choiceRadio.checked = false;
    }

    for (let i = 1; i <= Object.keys(questions).length; i++) {
        userAnswers[i] = '0';
    }

    for (let choice of choiceBox) {
        const choiceRadio = choice.children['choice-radio'];

        choiceRadio.checked = false;

        choice.addEventListener('click', (event) => {
            event.stopPropagation();

            const selectedChoice = event.currentTarget.children['choice-radio'];
            const selectedAnswer = selectedChoice.dataset['number'];

            userAnswers[currentQuestionIndex] = selectedAnswer;
            answered =
                15 - Object.values(userAnswers).filter((x) => x === '0').length;
            answeredSpan.innerHTML = answered;
            console.log(userAnswers);
        });
    }

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        submitForm();
    });

    function submitForm() {
        calculateScore();
        storeScore(usernameInput.value, scoreInput.value)
            .then(() => {
                showScore();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function showScore() {
        const scoreBody = document.querySelector('#score_body');
        const scorep = document.querySelector('#score_p');

        scorep.innerHTML = Math.round((scoreInput.value / 15) * 100);

        scoreBody.classList.remove('hidden');
        scoreBody.classList.add('flex');
        document.getElementById('test_body').classList.add('hidden');
    }

    function storeScore(uname, sc) {
        return new Promise((resolve, reject) => {
            const db = getDatabase();

            const data = {
                username: uname,
                score: sc
            };

            const newScoreKey = push(child(ref(db), 'scores')).key;

            const updates = {};
            updates['/scores/' + newScoreKey] = data;

            update(ref(db), updates)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    function calculateScore() {
        score = 0;
        for (let i = 1; i < Object.keys(userAnswers).length; i++) {
            if (userAnswers[i] == questions[i]['Answer']) {
                if (score < 15) {
                    score++;
                }
            }
        }
        scoreInput.value = score;
    }

    function getNextQuestion() {
        if (currentQuestionIndex <= Object.keys(questions).length) {
            currentQuestionIndex++;

            currentQuestion = questions[currentQuestionIndex];
            question.innerHTML = currentQuestion.Question;
            questionIndex.innerHTML = currentQuestionIndex;

            for (let choice of choiceBox) {
                const choiceSpan = choice.children['choice-span'];
                const choiceRadio = choice.children['choice-radio'];
                const number = choiceSpan.dataset['number'];

                choiceSpan.innerText = currentQuestion[`Choice${number}`];
                choiceRadio.value = currentQuestion[`Choice${number}`];
                choiceRadio.checked = false;
            }
        }
    }

    function getPrevQuestion() {
        if (currentQuestionIndex >= 1) {
            currentQuestionIndex--;
            currentQuestion = questions[currentQuestionIndex];
            question.innerHTML = currentQuestion.Question;
            questionIndex.innerHTML = currentQuestionIndex;

            for (let choice of choiceBox) {
                let choiceSpan = choice.children['choice-span'];
                let choiceRadio = choice.children['choice-radio'];
                let number = choiceSpan.dataset['number'];
                choiceSpan.innerText = currentQuestion[`Choice${number}`];
                choiceRadio.value = currentQuestion[`Choice${number}`];
                choiceRadio.checked = false;
            }
        }
    }

    nextBtn.addEventListener('click', getNextQuestion);
    prevBtn.addEventListener('click', getPrevQuestion);

    const observer = new MutationObserver(function (mutationsList, observer) {
        if (currentQuestionIndex == 1) {
            prevBtn.classList.add('hidden');
        } else if (currentQuestionIndex == Object.keys(questions).length) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
            imageQuestion.src = `./src/images/15.png`;
        } else if (currentQuestionIndex >= 11 && currentQuestionIndex <= 14) {
            imageQuestion.classList.remove('hidden');
            imageQuestion.src = `./src/images/${currentQuestionIndex}.png`;
        } else {
            nextBtn.classList.remove('hidden');
            prevBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            imageQuestion.classList.add('hidden');
            imageQuestion.src = `./src/images/11.png`;
        }

        if (userAnswers[currentQuestionIndex] !== '0') {
            checkedRadio = userAnswers[currentQuestionIndex] - 1;
            choiceBox[checkedRadio].children['choice-radio'].checked = true;
        }
    });

    observer.observe(questionIndex, {
        characterData: true,
        childList: true,
        attributes: false
    });

    function startTimer() {
        clearInterval(timerInterval);
        let minute = Math.floor(TIMER / 60);
        let second = TIMER - minute * 60;

        timerInterval = setInterval(function () {
            timerSpan.innerHTML = formatTime(minute, second);

            if (second == 0 && minute == 0) {
                // submitForm();
                submitBtn.click();
            }
            if (second == 0) {
                minute--;
                second = 60;
            }
            second--;
        }, 1000);
    }

    function formatTime(minute, second) {
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return `${minute}:${second}`;
    }

    // form.addEventListener('handle', function (event) {
    //     // Prevent the default form submission behavior
    //     event.preventDefault();

    //     // Retrieve the values of the fields
    //     const correctAnswer = parseInt(
    //         document.getElementById('score-input').value
    //     );
    //     const username = document.getElementById('username-input').value;

    //     // Optionally, provide feedback or perform additional actions
    //     console.log('Form submitted');
    //     console.log('Correct answer:', correctAnswer);
    //     console.log('Username:', username);
    // });

    startTimer();
}
