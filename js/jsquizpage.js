// JavaScript for Header and Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

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
        // Check if the click occurred directly on the container and not on the sidebar menu itself
        if (event.target === sidebarContainer) {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow body scrolling again
        }
    });

    // Optional: Close sidebar when a link inside is clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow body scrolling again
        });
    });
});

// JavaScript for Quiz functionality
let currentQuestionIndex = 0;
let timeLeft = 7200; // 2 hours in seconds
let timerInterval;
let userAnswers = [];
// Store original questions and answers as a base, LLM will rephrase
const originalQuestions = [
    {
        question: "What is the goal of promoting composting under RA 9003?",
        options: [
            "A. To burn organic waste",
            "B. To reduce organic waste in landfills",
            "C. To sell waste overseas",
            "D. To increase garbage collection"
        ],
        answer: "B. To reduce organic waste in landfills"
    },
    {
        question: "What is one key purpose of Republic Act No. 9003?",
        options: [
            "A. Encourage illegal dumping",
            "B. Promote incineration",
            "C. Mandate solid waste management programs",
            "D. Increase landfill usage"
        ],
        answer: "C. Mandate solid waste management programs"
    },
    {
        question: "What does proper hazardous waste disposal prevent?",
        options: [
            "A. Soil enrichment",
            "B. Health risks from toxic exposure",
            "C. Recycling of toxic materials",
            "D. Water purification"
        ],
        answer: "B. Health risks from toxic exposure"
    },
    {
        question: "What type of waste is typically biodegradable?",
        options: [
            "A. Plastic bottles",
            "B. Aluminum cans",
            "C. Food scraps",
            "D. Glass jars"
        ],
        answer: "C. Food scraps"
    },
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
        question: "Which of the following is a sustainable waste management practice?",
        options: [
            "A. Dumping into rivers",
            "B. Incineration",
            "C. Recycling",
            "D. Burning plastics"
        ],
        answer: "C. Recycling"
    },
    {
        question: "What is waste segregation?",
        options: [
            "A. Mixing all types of waste into one bin",
            "B. Burning all types of waste",
            "C. Separating waste based on type, composition, or recyclability",
            "D. Throwing away waste without classification"
        ],
        answer: "C. Separating waste based on type, composition, or recyclability"
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
        question: "What is a direct benefit of efficient waste management?",
        options: [
            "A. More waste is created",
            "B. Higher landfill dependency",
            "C. Increased collection costs",
            "D. Streamlined collection and processing"
        ],
        answer: "D. Streamlined collection and processing"
    }
];

let questions = []; // This array will hold the current shuffled and rephrased questions

// Utility to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to rephrase question and options using LLM
async function fetchRephrasedQuestion(originalQuestionObj) {
    // Construct the prompt to get rephrased question and options without prefixes, plus the correct answer text
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
    const apiKey = ""; // Remember to fill in your API Key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
    } finally {
        // Removed showLoading(false);
    }
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time: " + minutes + ":" + seconds;
        timeLeft = timer; // Update global timeLeft variable

        if (--timer < 0) {
            timer = 0;
            clearInterval(timerInterval);
            showMessageBox("Time is up! Quiz ended.", showResults);
        }
    }, 1000);
}

function selectOption(optionElement) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionElement.classList.add('selected');
}

async function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.textContent;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            await updateQuestion(); // Await updateQuestion as it now calls LLM
        } else {
            showMessageBox("Quiz completed!", () => {
                clearInterval(timerInterval);
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
        // Fetch rephrased question and options
        const originalQuestion = questions[currentQuestionIndex];
        const rephrasedData = await fetchRephrasedQuestion(originalQuestion);

        questions[currentQuestionIndex].question = rephrasedData.question;
        questions[currentQuestionIndex].options = rephrasedData.options;
        questions[currentQuestionIndex].answer = rephrasedData.answer; // Update to new answer string

        questionText.textContent = questions[currentQuestionIndex].question;
        optionsElements.forEach((option, index) => {
            option.textContent = questions[currentQuestionIndex].options[index];
            option.classList.remove('selected');
        });
        itemNumber.textContent = `Item ${currentQuestionIndex + 1}`;
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
    const timeTaken = 7200 - timeLeft; // Time taken in seconds
    const percentageScore = questions.length > 0 ? ((correctAnswers / questions.length) * 100).toFixed(1) : 0; // Fixed to 1 decimal place


    const quizContainer = document.querySelector('.quiz-container');
    // Add a class to the quiz-container to enable results-specific scrolling
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
                    <button class="retake-quiz-button" onclick="retakeQuiz()">Retake Quiz</button>
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
    const resultsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#4CAF50', '#ff8a80'], /* Green and Red */
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, /* Allow chart to resize more freely */
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Inter'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Quiz Performance',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: 'Inter'
                    },
                    color: '#333'
                },
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
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 7200; // Reset timer

    // Re-initialize questions array with a shuffled copy of originalQuestions
    questions = [...originalQuestions]; // Create a shallow copy
    shuffleArray(questions); // Shuffle questions for a new take

    // Re-initialize quiz container and timer
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('results-view'); // Remove results view class
    quizContainer.innerHTML = `
        <div class="question-header">
            <div class="item-number">Item 1</div>
            <div class="time" id="time">Time: 05:00</div>
        </div>
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
    startTimer(timeLeft, display);
    updateQuestion();
}


// Custom message box function (replaces alert())
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

// Initial setup on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Create a mutable copy of originalQuestions to shuffle
    questions = [...originalQuestions];
    shuffleArray(questions); // Shuffle questions on page load
    await updateQuestion(); // Load the first (shuffled and rephrased) question
    const display = document.querySelector('#time');
    startTimer(timeLeft, display);
});
