// jsquizpageM3.js

// Module-specific variables for Module 3
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 900; // 15 minutes in seconds for Module 3 (corrected)
let timerInterval; // Declare timer interval here for this module

// Store original questions and answers for Module 3 (from your provided list)
const originalQuestions = [
    {
        question: "What is the purpose of waste classification?",
        options: [
            "A. To increase landfill size",
            "B. To make waste collection slower",
            "C. To determine the best way to handle waste",
            "D. To avoid separating waste"
        ],
        answer: "C. To determine the best way to handle waste"
    },
    {
        question: "What does compostable waste primarily consist of?",
        options: [
            "A. Plastics and metals",
            "B. Garden and food waste",
            "C. Batteries and paint",
            "D. Used syringes"
        ],
        answer: "B. Garden and food waste"
    },
    {
        question: "Which of the following is an example of compostable waste?",
        options: [
            "A. Tin cans",
            "B. Expired medicine",
            "C. Fruit and vegetable peelings",
            "D. Face masks"
        ],
        answer: "C. Fruit and vegetable peelings"
    },
    {
        question: "What is recyclable waste?",
        options: [
            "A. Waste burned at home",
            "B. Contaminated trash",
            "C. Waste that can be processed for reuse",
            "D. Medical waste"
        ],
        answer: "C. Waste that can be processed for reuse"
    },
    {
        question: "Which item is considered recyclable?",
        options: [
            "A. Sanitary napkin",
            "B. Newspaper",
            "C. Soiled bandage",
            "D. Food waste"
        ],
        answer: "B. Newspaper"
    },
    {
        question: "What does special waste include?",
        options: [
            "A. Organic kitchen waste",
            "B. Broken glass",
            "C. Hazardous household items",
            "D. Unused tissues"
        ],
        answer: "C. Hazardous household items"
    },
    {
        question: "Which of the following is an example of special waste?",
        options: [
            "A. Vegetable peels",
            "B. Batteries",
            "C. Paper",
            "D. Candy wrappers"
        ],
        answer: "B. Batteries"
    },
    {
        question: "What type of waste are worn-out or broken appliances classified as?",
        options: [
            "A. Compostable",
            "B. Residual",
            "C. Recyclable",
            "D. Special"
        ],
        answer: "D. Special"
    },
    {
        question: "What are residual wastes?",
        options: [
            "A. Medical sharps",
            "B. Wastes that are neither compostable nor recyclable",
            "C. Kitchen scraps",
            "D. Garden trimmings"
        ],
        answer: "B. Wastes that are neither compostable nor recyclable"
    },
    {
        question: "Which item is classified as residual waste?",
        options: [
            "A. Glass bottle",
            "B. Plastic-lined juice carton",
            "C. Steel spoon",
            "D. Fresh leaves"
        ],
        answer: "B. Plastic-lined juice carton"
    },
    {
        question: "What is household healthcare waste?",
        options: [
            "A. Plastic bottles and cans",
            "B. Wastes contaminated with infectious materials",
            "C. Dry paper products",
            "D. Compostable garden waste"
        ],
        answer: "B. Wastes contaminated with infectious materials"
    },
    {
        question: "Which of the following is a type of household healthcare waste?",
        options: [
            "A. Face masks",
            "B. Aluminum cans",
            "C. Cardboard",
            "D. Old clothes"
        ],
        answer: "A. Face masks"
    },
    {
        question: "What category do used syringes fall under?",
        options: [
            "A. Recyclable",
            "B. Residual",
            "C. Healthcare",
            "D. Compostable"
        ],
        answer: "C. Healthcare"
    },
    {
        question: "Which waste type includes sharps and soiled dressings?",
        options: [
            "A. Recyclable waste",
            "B. Compostable waste",
            "C. Household healthcare waste",
            "D. Residual waste"
        ],
        answer: "C. Household healthcare waste"
    },
    {
        question: "Which of the following is NOT compostable?",
        options: [
            "A. Fish entrails",
            "B. Soft vegetable trims",
            "C. Aluminum foil",
            "D. Fruit seeds"
        ],
        answer: "C. Aluminum foil"
    },
    {
        question: "Which is an example of residual waste?",
        options: [
            "A. Corrugated cardboard",
            "B. Used diapers",
            "C. Paper scraps",
            "D. Meat scraps"
        ],
        answer: "B. Used diapers"
    },
    {
        question: "Paint and thinner are classified as what kind of waste?",
        options: [
            "A. Compostable",
            "B. Recyclable",
            "C. Special",
            "D. Residual"
        ],
        answer: "C. Special"
    },
    {
        question: "Which waste type is considered dangerous if not disposed of properly?",
        options: [
            "A. Recyclable",
            "B. Compostable",
            "C. Household healthcare waste",
            "D. Residual"
        ],
        answer: "C. Household healthcare waste"
    },
    {
        question: "Which item is classified as recyclable?",
        options: [
            "A. Glass bottle",
            "B. Disposable gloves",
            "C. Worn-out rug",
            "D. Garden waste"
        ],
        answer: "A. Glass bottle"
    },
    {
        question: "Why is classifying waste important?",
        options: [
            "A. It wastes time and resources",
            "B. It helps burn more waste",
            "C. It supports safe and efficient disposal methods",
            "D. It reduces waste collection"
        ],
        answer: "C. It supports safe and efficient disposal methods"
    }
];

let questions = []; // This array will hold the current shuffled and rephrased questions for Module 3

// --- Common/Utility Functions (Self-contained within jsquizpageM3.js) ---

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to fetch a rephrased question and options from Gemini API
async function fetchRephrasedQuestion(originalQuestionObj) {
    // IMPORTANT: Replace with your actual API key
    const apiKey = "YOUR_GEMINI_API_KEY"; // <<< Replace this placeholder with your actual key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `Rephrase the following multiple-choice question and its options. Provide the correct answer text separately. Ensure the meaning of the question and the correct answer remains the same.
    \nOriginal Question: ${originalQuestionObj.question}
    \nOriginal Options (without A,B,C,D prefixes):
    ${originalQuestionObj.options.map(o => o.substring(3)).join('\n')}
    \nOriginal Correct Answer Text (without prefix): ${originalQuestionObj.answer.substring(3)}
    \nProvide the response in JSON format with 'rephrasedQuestion' (string), 'rephrasedOptions' (array of strings, no A,B,C,D prefixes), and 'correctAnswerText' (string, the plain text of the correct option).`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = {
        contents: chatHistory,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "rephrasedQuestion": { "type": "STRING" },
                    "rephrasedOptions": {
                        "type": "ARRAY",
                        "items": { "type": "STRING" }
                    },
                    "correctAnswerText": { "type": "STRING" }
                },
                "required": ["rephrasedQuestion", "rephrasedOptions", "correctAnswerText"]
            }
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const jsonString = result.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(jsonString);

            let newOptions = parsedJson.rephrasedOptions;
            shuffleArray(newOptions); // Shuffle the rephrased options

            // Add A, B, C, D prefixes to the shuffled options
            const prefixedOptions = newOptions.map((option, idx) => {
                return String.fromCharCode(65 + idx) + ". " + option;
            });

            // Find the correct answer text in the newly prefixed and shuffled options
            let newCorrectAnswer = "";
            const correctText = parsedJson.correctAnswerText;
            for (let i = 0; i < prefixedOptions.length; i++) {
                // Check if the option's text (after the prefix) matches the correct text
                if (prefixedOptions[i].substring(3).trim() === correctText.trim()) {
                    newCorrectAnswer = prefixedOptions[i];
                    break;
                }
            }
            return {
                question: parsedJson.rephrasedQuestion,
                options: prefixedOptions,
                answer: newCorrectAnswer || originalQuestionObj.answer // Fallback if remapping fails
            };

        } else {
            console.error("LLM response structure unexpected or empty:", result);
            return originalQuestionObj; // Fallback to original on bad structure
        }
    } catch (error) {
        console.error("Error fetching rephrased question:", error);
        return originalQuestionObj; // Fallback to original on error
    }
}

// Function to start the quiz timer
function startTimer(duration, display) {
    let timer = duration;
    clearInterval(timerInterval); // Clear any existing timer for this module
    timerInterval = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time: " + minutes + ":" + seconds;
        timeLeft = timer; // Update the module's timeLeft variable

        if (--timer < 0) {
            timer = 0;
            clearInterval(timerInterval);
            showMessageBox("Time is up! Quiz ended.", showResults);
        }
    }, 1000);
}

// Function to handle option selection
function selectOption(optionElement) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionElement.classList.add('selected');
}

// Function to show custom message boxes
function showMessageBox(message, callback) {
    const messageBoxOverlay = document.createElement('div');
    messageBoxOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        text-align: center;
        font-family: 'Inter', sans-serif;
        max-width: 400px;
        width: 90%;
    `;

    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.cssText = `
        font-size: 1.2em;
        margin-bottom: 20px;
        color: #333;
    `;

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease;
    `;
    okButton.onmouseover = () => okButton.style.backgroundColor = '#45a049';
    okButton.onmouseout = () => okButton.style.backgroundColor = '#4CAF50';

    okButton.addEventListener('click', () => {
        document.body.removeChild(messageBoxOverlay);
        if (callback) {
            callback();
        }
    });

    messageBox.appendChild(messageText);
    messageBox.appendChild(okButton);
    messageBoxOverlay.appendChild(messageBox);
    document.body.appendChild(messageBoxOverlay);
}

// --- Quiz Specific Functions ---

async function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.textContent;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            await updateQuestion();
        } else {
            showMessageBox("Quiz completed!", () => {
                clearInterval(timerInterval); // Clear the module's timer interval
                showResults();
            });
        }
    } else {
        showMessageBox("Please select an option.");
    }
}

async function updateQuestion() {
    const questionText = document.getElementById('question-text');
    const optionsElements = document.querySelectorAll('.options .option');
    const itemNumber = document.querySelector('.item-number');

    if (currentQuestionIndex < questions.length) {
        // Clear content while fetching to avoid "Loading..." text
        questionText.textContent = "";
        optionsElements.forEach(option => {
            option.textContent = "";
            option.classList.remove('selected');
        });
        itemNumber.textContent = `Item ${currentQuestionIndex + 1}`; // Update item number immediately

        // Fetch rephrased question and options
        const originalQuestion = questions[currentQuestionIndex];
        const rephrasedData = await fetchRephrasedQuestion(originalQuestion);

        questions[currentQuestionIndex].question = rephrasedData.question;
        questions[currentQuestionIndex].options = rephrasedData.options;
        questions[currentQuestionIndex].answer = rephrasedData.answer; // Update to new answer string

        // Populate with fetched data
        questionText.textContent = questions[currentQuestionIndex].question;
        optionsElements.forEach((option, index) => {
            option.textContent = questions[currentQuestionIndex].options[index];
        });
    }
}

function showResults() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            correctAnswers++;
        }
    });

    const incorrectAnswers = questions.length - correctAnswers;
    const timeTaken = 900 - timeLeft; // Time taken in seconds for Module 3 (15 minutes)
    const percentageScore = questions.length > 0 ? ((correctAnswers / questions.length) * 100).toFixed(1) : 0;

    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.classList.add('results-view');

    quizContainer.innerHTML = `
        <div class="results-container">
            <div class="chart-section">
                <div class="chart-container">
                    <canvas id="resultsChart"></canvas>
                </div>
                <div class="chart-info">
                    <div class="chart-title">Score Breakdown</div>
                    <p>Time: ${Math.floor(timeTaken / 60)} minutes ${timeTaken % 60} seconds</p>
                    <p>Score: ${correctAnswers} out of ${questions.length} (${percentageScore}%)</p>
                    <div class="quiz-actions">
                        <button class="action-button" onclick="retakeQuiz()">Retake Quiz</button>
                        <a href="modulehomepage.html" class="action-button">Return to Modules</a>
                    </div>
                </div>
            </div>
            <div class="results-list">
                <h2>Detailed Answers</h2>
                ${questions.map((question, index) => {
                    const isCorrect = userAnswers[index] === question.answer;
                    return `
                        <div class="${isCorrect ? 'correct' : 'incorrect'}">
                            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                            <p><strong>Your Choice:</strong> ${userAnswers[index] || 'Not answered'}</p>
                            <p><strong>Correct Answer:</strong> ${question.answer}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#4CAF50', '#ff8a80'],
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { size: 14, family: 'Inter' } } },
                title: { display: true, text: 'Quiz Performance', font: { size: 20, weight: 'bold', family: 'Inter' }, color: '#333' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentageTooltip = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${value} (${percentageTooltip}%)`;
                        }
                    }
                }
            }
        }
    });

    const passingScore = 80;
    const currentModule = 3; // This is specifically for Module 3 quiz
    const nextModule = currentModule + 1; // Module 4

    if (percentageScore >= passingScore) {
        localStorage.setItem(`module${currentModule}Completed`, 'true');
        localStorage.setItem(`module${nextModule}Unlocked`, 'true'); // Unlock the next module (Module 4)
        showMessageBox(`Congratulations! You passed Module ${currentModule} with a score of ${percentageScore}%. Module ${nextModule} is now unlocked!`, () => {});
    } else {
        localStorage.setItem(`module${currentModule}Completed`, 'false');
        showMessageBox(`You scored ${percentageScore}%. You need ${passingScore}% to pass Module ${currentModule}. Please review the module and try again.`, () => {});
    }
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 900; // Reset timer for Module 3 to 15 minutes
    clearInterval(timerInterval); // Clear the module's timer interval

    // Re-initialize questions array with a shuffled copy of originalQuestions
    questions = [...originalQuestions];
    shuffleArray(questions); // Use the local shuffleArray function

    // Re-initialize quiz container content
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('results-view'); // Remove results view class
    quizContainer.innerHTML = `
        <div class="question-header">
            <div class="item-number">Item 1</div>
            <div class="time" id="time">Time: 15:00</div> </div>
        <div class="question">
            <p id="question-text"></p>
        </div>
        <div class="options">
            <div class="option" onclick="selectOption(this)"></div>
            <div class="option" onclick="selectOption(this)"></div>
            <div class="option" onclick="selectOption(this)"></div>
            <div class="option" onclick="selectOption(this)"></div>
        </div>
        <div class="navigation">
            <button class="submit-button" onclick="nextQuestion()">Submit Answer</button>
        </div>
    `;
    // Restart timer and update first question
    const display = document.querySelector('#time');
    startTimer(timeLeft, display); // Use the local startTimer function
    updateQuestion(); // Load the first question using the local updateQuestion
}

function returnToModules() {
    window.location.href = 'modulehomepage.html';
}

// --- Event Listeners for Page Initialization and Sidebar ---

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Header and Sidebar functionality
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

    if (hamburgerIcon && closeSidebarBtn && sidebarContainer && sidebarMenu) {
        // Open sidebar
        hamburgerIcon.addEventListener('click', () => {
            sidebarContainer.classList.add('open');
            sidebarMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling body when sidebar is open
        });

        // Close sidebar by clicking close button
        closeSidebarBtn.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow body scrolling again
        });

        // Close sidebar by clicking outside the menu (on the overlay)
        sidebarContainer.addEventListener('click', (event) => {
            if (event.target === sidebarContainer) {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = ''; // Allow body scrolling again
            }
        });

        // Close sidebar when a link inside is clicked
        const sidebarLinks = document.querySelectorAll('.sidebar-links a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = ''; // Allow body scrolling again
            });
        });
    }

    // Set initial time display for Module 3
    const timeDisplayElement = document.querySelector('#time');
    if (timeDisplayElement) {
        const initialMinutes = parseInt(timeLeft / 60, 10);
        const initialSeconds = parseInt(timeLeft % 60, 10);
        timeDisplayElement.textContent = `Time: ${initialMinutes < 10 ? '0' : ''}${initialMinutes}:${initialSeconds < 10 ? '0' : ''}${initialSeconds}`;
    }

    questions = [...originalQuestions];
    shuffleArray(questions); // Use the local shuffleArray function
    await updateQuestion(); // Load the first (shuffled and rephrased) question using the local updateQuestion
    const display = document.querySelector('#time');
    startTimer(timeLeft, display); // Use the local startTimer function
});
