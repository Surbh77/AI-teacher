import { TalkingHead } from "talkinghead";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

let head;
const host = 'http://127.0.0.1:8000';


function makeSpeech(text) {
    console.log(text);
    return axios.post(host + '/talk', { text });
}

function learning(main_course,sub_course) {
    console.log(main_course,sub_course);
    return axios.post(host + '/learning', { main_course,sub_course });
}

function assesment(main_course,sub_course,content) {
    console.log(main_course,sub_course);
    return axios.post(host + '/assesment', { main_course,sub_course,content });
}

document.addEventListener('DOMContentLoaded', async function (e) {
    const nodeAvatar = document.getElementById('avatar');
    // let head;
    // function initializeTalkingHead() {
    head = new TalkingHead(nodeAvatar, {
        ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
        ttsApikey: "AIzaSyDvbbelIv8AaTF9Dkvo2RVVouSIJjmaeSs", // <- Change this
        cameraView: "upper",
        cameraRotateEnable:'true',
        avatarMood: 'neutral',
        lipsyncLang: 'en',
        ttsLang: "en-GB",
        ttsVoice: "en-GB-Standard-A",
        ttsRate:1.0,
    });
    // }
    const nodeLoading = document.getElementById('loading');
    async function loadAvatar(url) {
    try {
        nodeLoading.textContent = "Loading...";
        await head.showAvatar({
            //url: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png',
            url: url,
            body: 'M',
            ttsLang: "en-GB",
            ttsVoice: "en-GB-Standard-A",
            lipsyncLang: 'en'
        }, (ev) => {
            if (ev.lengthComputable) {
                let val = Math.min(100, Math.round(ev.loaded / ev.total * 100));
                nodeLoading.textContent = "Loading " + val + "%";
            }
        });
        nodeLoading.style.display = 'none';
    } catch (error) {
        console.log(error);
        nodeLoading.textContent = error.toString();
    }
    }
    // initializeTalkingHead();

    // Button click event to load first avatar
    const defaultAvatarUrl = '\avatar.glb'; // Change this to your default avatar file URL
    loadAvatar(defaultAvatarUrl);

    const avatarButton1 = document.getElementById('avatarButton1');
    avatarButton1.addEventListener('click', function() {
        const avatarUrl = '\avatar.glb'; // Change this to your first avatar file URL
        loadAvatar(avatarUrl);
    });

    // Button click event to load second avatar
    const avatarButton2 = document.getElementById('avatarButton2');
    avatarButton2.addEventListener('click', function() {
        const avatarUrl = '\avatar1.glb'; // Change this to your second avatar file URL
        loadAvatar(avatarUrl);
    });



    let count = 0;
    let result = '';

    const nodeSpeak = document.getElementById('speak');
    nodeSpeak.addEventListener('click', function () {
        try {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.start();
            recognition.onresult = (event) => {
                const result1 = event.results[0][0].transcript;
                result += result1;
                if (result) {
                    makeSpeech(result)
                        .then(response => {
                            let { blendData, filename } = response.data;
                            var synthesis = window.speechSynthesis;
                            var msg = new SpeechSynthesisUtterance();
                            var voices = window.speechSynthesis.getVoices();
                            msg.voice = voices[3]; // You may need to adjust the index based on available voices
                            msg.text = blendData;
                            head.speakText(msg.text);
                            console.log(msg.text)
                            const conversationNode = document.getElementById('conversation');
                            const newMessage = document.createElement('div');
                            const newMessage1 = document.createElement('div');
                            newMessage.textContent = result;
                            conversationNode.appendChild(newMessage);
                            newMessage1.textContent = msg.text;
                            conversationNode.appendChild(newMessage1);
                            result += msg.text;
                            count++;
                        });
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
});

let assessmentData;

document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.getElementById('assesment');
    const subcourse = [
        ["Introduction to C++", "Basic Syntax", "Operators", "Control Flow", "Functions", "Arrays", "Pointers", "Strings", "Structures and Classes", "Object-Oriented Programming (OOP)"],
        ["Basic Structure and Syntax", "Text Formatting", "Links and Anchors", "Lists", "Images", "Forms and Input Elements", "Tables", "Semantic HTML", "Meta Tags", "Meta Tags"],
        ["Basic Selectors", "Box Model", "Typography", "Colors and Backgrounds", "Layout Techniques", "Flexbox", "CSS Grid", "Responsive Design", "Transitions and Animations", "Browser Developer Tools"],
        ["Basic Syntax and Queries","Data Types","Creating and Manipulating Tables","Primary Keys and Foreign Keys","CRUD Operations (Create, Read, Update, Delete)","Filtering Data with WHERE Clause","Sorting Data with ORDER BY Clause","Aggregation Functions (SUM, AVG, COUNT, MAX, MIN)","Grouping Data with GROUP BY Clause","Joins (INNER JOIN, LEFT JOIN, RIGHT JOIN)"]
    ];
    const subcoursedisc = [
        ["Understand what C++ is, its history, and its importance in programming.", 
        "Learn about the basic syntax of C++ programming language including comments, data types, variables, and identifiers.", 
        "Study arithmetic, relational, logical, assignment, and other operators in C++.", 
        "Explore control flow statements such as if, else, switch, and loops like for, while, and do-while", 
        "Understand how to define and use functions in C++, including function prototypes, parameters, return types, and recursion.", 
        "Learn about arrays, one-dimensional and multi-dimensional arrays, and their usage in C++.", 
        "Understand the concept of pointers, pointer arithmetic, and their applications in C++.", 
        "Explore string handling in C++ including string objects, string manipulation functions, and string literals.", 
        "Learn about user-defined data types like structures and classes, their differences, and how to define and use them.", 
        "Understand the principles of OOP such as encapsulation, inheritance, and polymorphism, and how they are implemented in C++."],
        ["Button A", "Button B", "Button C", "Button D", "Button E", "Button F", "Button G", "Button H", "Button I", "Button J", "Button K", "Button L", "Button M", "Button N", "Button O", "Button P"],
        ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Brown", "Gray", "Cyan", "Magenta", "Teal", "Lime", "Indigo"],
    ];

    function generateButtons(buttonNames,main_course) {
        console.log('Programing Language',main_course)
        head.speakText('It seams you are interested in learning'+main_course)
        buttonContainer.innerHTML = ''; // Clear existing buttons
        buttonNames.forEach((name, index) => {
            const button = document.createElement('button');
            button.className = 'new-button';
            button.textContent = name;
            button.onclick = () => {
                getResponse(name,main_course);
            };
            buttonContainer.appendChild(button);
        });
    }

    function getResponse(newButtonName,main_course) {
        console.log(`Existing Button Name: ${main_course}`);
        console.log(`New Button Name: ${newButtonName}`);
        
        // Send API request here with existingButtonName and newButtonName
        
        // Example API request using fetch
        head.speakText(newButtonName+' is an interesting topic in '+main_course+'. Give me a minute to grab the learning content')
        learning(main_course,newButtonName)
        // .then(response => response.json())

        .then(data => {
            console.log(' Learning API Response:', data.data);
            head.speakText(data.data)
            const learningNode = document.getElementById('learning');
            const newMessage = document.createElement('div');
            learningNode.style.display = 'block';
            learningNode.style.overflow = 'auto';
            learningNode.innerHTML =  marked.parse(data.data);
            // learningNode.textContent = data.data;
            // Handle API response here if needed

            setTimeout(() => {
                // Create a new button for taking assessment
                // const takeAssessmentButton = document.createElement('button');
                // takeAssessmentButton.className = 'takeAssessmentButton';
                // takeAssessmentButton.textContent = 'Take Assessment';
                const takeAssessmentButton = document.getElementById('take-assesment');
                takeAssessmentButton.style.display='block';
                takeAssessmentButton.onclick = () => {
                    // Implement the logic for taking the assessment
                    console.log('Assessment Button Clicked');
                    assesment(main_course,newButtonName,data.data)

                    .then(data=>{
                        // renderAssessmentForm()
                        console.log('Assesment API Response:', data.data);
                        assessmentData=data.data
                        displayAssessmentForm(assessmentData);
                        takeAssessmentButton.style.display='none';
                        learningNode.style.display = 'none';
                        // learningNode.style.display = 'none';
                        // learningNode.innerHTML =  marked.parse(assesmentdata.data);
                        // const responseData = assesmentdata.data;
                        // console.log('Assesment API Response Questions:',responseData.questions)
                        // var questionsData = {
                        //     "questions": [
                        //         {
                        //             "question": "Which operator is used for addition in C++?",
                        //             "options": ["+", "*", "-", "/"],
                        //             "answer": "+"
                        //         },
                        //         {
                        //             "question": "Which operator is used to check if two values are equal in C++?",
                        //             "options": ["==", "!=", ">", "<"],
                        //             "answer": "=="
                        //         }
                        //     ]
                        // };
                        // const responseData = JSON.parse(questionsData);
                        // const assessmentForm = generateAssessmentForm(responseData.questions);
                        // document.getElementById('assesment-container').appendChild(assessmentForm);

                        // const assesmentNode = document.getElementById('assesment-container');
                        // assesmentNode.style.display = 'block';
                        // learningNode.textContent = assesmentdata.data;
                    })
                    .catch(error=>{
                        console.error('Error:', error);
                    });
                };
                buttonContainer.appendChild(takeAssessmentButton);
            }, 10000);
            


        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here if needed
        });
    }

    // Add click event listeners to existing buttons
    document.getElementById('c++').addEventListener('click', () => generateButtons(subcourse[0],'C++'));
    document.getElementById('HTML').addEventListener('click', () => generateButtons(subcourse[1],'HTML'));
    document.getElementById('CSS').addEventListener('click', () => generateButtons(subcourse[2],'CSS'));
    document.getElementById('SQL').addEventListener('click', () => generateButtons(subcourse[3],'SQL'));
});


function submitAssessmentForm(assessmentData) {
    const form = document.getElementById('assessmentForm');
    const questions = Array.from(form.querySelectorAll('.question'));
    let score = 0;
    console.log('Score===>>>',score)
    console.log('Assesment Data==>>',assessmentData)
    questions.forEach((question, index) => {
        const selectedOption = form.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            console.log(selectedOption)
            const selectedAnswer = selectedOption.value;
            const correctAnswer = assessmentData.questions[index].answer;
            if (selectedAnswer === correctAnswer) {
                score++;
            }
        }
    });

    const scoreContainer = document.getElementById('score');
    scoreContainer.textContent = `Your score: ${score}/${questions.length}`;
}


function displayAssessmentForm(assessmentData) {
    const questions = assessmentData.questions;
    const formContainer = document.getElementById('assessmentForm');
    formContainer.innerHTML = ''; // Clear previous content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
        `;

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options');

        question.options.forEach(option => {
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question${index}`;
            optionInput.value = option;

            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;

            const optionWrapper = document.createElement('div');
            optionWrapper.appendChild(optionInput);
            optionWrapper.appendChild(optionLabel);

            optionsContainer.appendChild(optionWrapper);
        });

        questionElement.appendChild(optionsContainer);
        formContainer.appendChild(questionElement);
    });

    const assesmebtsubmitNode = document.getElementById('assesmentsubmit');
    assesmebtsubmitNode.style.display='block';

}

const assesmebtsubmitNode = document.getElementById('assesmentsubmit');
assesmebtsubmitNode.addEventListener('click', function() {submitAssessmentForm(assessmentData)})


















