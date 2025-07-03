// jsquizpageM4.js

// Module-specific variables for Module 4
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 900; // Corrected to 15 minutes (900 seconds) for Module 4
let timerInterval; // Declare timer interval here for this module

// Store original questions and answers for Module 4
const originalQuestions = [
    {
        question: "What is the most common method of waste disposal?",
        options: [
            "A. Composting",
            "B. Incineration",
            "C. Landfilling",
            "D. Recycling"
        ],
        answer: "C. Landfilling"
    },
    {
        question: "What is the main disadvantage of landfilling?",
        options: [
            "A. It’s too fast",
            "B. It produces fuel",
            "C. It takes up a lot of space",
            "D. It’s very cheap"
        ],
        answer: "C. It takes up a lot of space"
    },
    {
        question: "What is incineration also known as?",
        options: [
            "A. Chemical washing",
            "B. Mechanical sorting",
            "C. Combustion",
            "D. Digestion"
        ],
        answer: "C. Combustion"
    },
    {
        question: "What does incineration reduce in waste volume?",
        options: [
            "A. 10–20%",
            "B. 20–30%",
            "C. 50–60%",
            "D. 70–80%"
        ],
        answer: "D. 70–80%"
    },
    {
        question: "What is produced by incineration?",
        options: [
            "A. Oil",
            "B. Compost",
            "C. Ash, gas, and heat",
            "D. Plastic"
        ],
        answer: "C. Ash, gas, and heat"
    },
    {
        question: "What is the purpose of resource recovery?",
        options: [
            "A. To store waste underground",
            "B. To destroy useful materials",
            "C. To convert waste into energy or materials",
            "D. To freeze waste"
        ],
        answer: "C. To convert waste into energy or materials"
    },
    {
        question: "Recycling helps to:",
        options: [
            "A. Increase fossil fuel use",
            "B. Create more landfill waste",
            "C. Save energy and natural resources",
            "D. Produce more harmful emissions"
        ],
        answer: "C. Save energy and natural resources"
    },
    {
        question: "Which process turns waste into new products?",
        options: [
            "A. Composting",
            "B. Incineration",
            "C. Landfilling",
            "D. Recycling"
        ],
        answer: "D. Recycling"
    },
    {
        question: "What does plasma gasification use to break down waste?",
        options: [
            "A. Bacteria",
            "B. Water",
            "C. Cold air",
            "D. Electrically charged gas (plasma)"
        ],
        answer: "D. Electrically charged gas (plasma)"
    },
    {
        question: "Plasma gasification can:",
        options: [
            "A. Pollute more than landfilling",
            "B. Create renewable energy",
            "C. Only process food waste",
            "D. Turn waste into compost"
        ],
        answer: "B. Create renewable energy"
    },
    {
        question: "What is composting mainly used for?",
        options: [
            "A. Plastic waste",
            "B. Organic waste",
            "C. Electronics",
            "D. Metals"
        ],
        answer: "B. Organic waste"
    },
    {
        question: "What is produced from composting?",
        options: [
            "A. Acid",
            "B. Synthetic fuel",
            "C. Nutrient-rich soil",
            "D. Ash"
        ],
        answer: "C. Nutrient-rich soil"
    },
    {
        question: "What helps break down waste during composting?",
        options: [
            "A. Machines",
            "B. Microbes",
            "C. Fire",
            "D. Chemicals"
        ],
        answer: "B. Microbes"
    },
    {
        question: "What kind of waste is ideal for composting?",
        options: [
            "A. Paper",
            "B. Aluminum",
            "C. Organic kitchen and plant waste",
            "D. Plastic"
        ],
        answer: "C. Organic kitchen and plant waste"
    },
    {
        question: "What does Waste-to-Energy (WtE) produce?",
        options: [
            "A. Clothing",
            "B. Electricity, heat, or fuel",
            "C. New landfills",
            "D. Batteries"
        ],
        answer: "B. Electricity, heat, or fuel"
    },
    {
        question: "WtE helps reduce:",
        options: [
            "A. Solar power",
            "B. Fossil fuel use",
            "C. Recycling plants",
            "D. Composting bins"
        ],
        answer: "B. Fossil fuel use"
    },
    {
        question: "Waste minimization focuses on:",
        options: [
            "A. Buying more disposable products",
            "B. Fixing and reusing items",
            "C. Throwing away reusable goods",
            "D. Ignoring recycling"
        ],
        answer: "B. Fixing and reusing items"
    },
    {
        question: "What is the simplest way to manage waste?",
        options: [
            "A. Burn all waste",
            "B. Create less waste",
            "C. Build more landfills",
            "D. Import waste"
        ],
        answer: "B. Create less waste"
    },
    {
        question: "Recycling is especially common for which materials?",
        options: [
            "A. Food and leaves",
            "B. Wood and soil",
            "C. Plastic, paper, and metal",
            "D. Batteries and oil"
        ],
        answer: "C. Plastic, paper, and metal"
    },
    {
        question: "Which method destroys harmful materials and produces energy using high heat?",
        options: [
            "A. Composting",
            "B. Landfilling",
            "C. Plasma gasification",
            "D. Recycling"
        ],
        answer: "C. Plasma gasification"
    }
];

let questions = []; // This array will hold the current shuffled and rephrased questions for Module 4

// --- Common/Utility Functions (Self-contained within jsquizpageM4.js) ---

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
    const timeTaken = 900 - timeLeft; // Time taken in seconds for Module 4 (15 minutes)
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
    const currentModule = 4; // This is specifically for Module 4 quiz
    const nextModule = currentModule + 1; // Module 5

    if (percentageScore >= passingScore) {
        localStorage.setItem(`module${currentModule}Completed`, 'true');
        localStorage.setItem(`module${nextModule}Unlocked`, 'true'); // Unlock the next module (Module 5)
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
    timeLeft = 900; // Reset timer for Module 4 to 15 minutes
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

    // Set initial time display for Module 4
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
