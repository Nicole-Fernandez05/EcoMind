// jsquizpage.js

// Module-specific variables for Module 1
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 600; // 10 minutes in seconds for Module 1
let timerInterval; // Declare timer interval here for this module

// STORE ORIGINAL QUESTIONS AND ANSWERS FOR MODULE 1
// These are the questions you provided.
const originalQuestions = [
    {
        question: "What is waste segregation?",
        options: [
            "Mixing all types of waste into one bin",
            "Burning all types of waste",
            "Separating waste based on type, composition, or recyclability",
            "Throwing away waste without classification"
        ],
        answer: "Separating waste based on type, composition, or recyclability"
    },
    {
        question: "What law is known as the Ecological Solid Waste Management Act of 2000?",
        options: [
            "Republic Act No. 7160",
            "Republic Act No. 9003",
            "Republic Act No. 10121",
            "Republic Act No. 8425"
        ],
        answer: "Republic Act No. 9003"
    },
    {
        question: "What is one key purpose of Republic Act No. 9003?",
        options: [
            "Encourage illegal dumping",
            "Promote incineration",
            "Mandate solid waste management programs",
            "Increase landfill usage"
        ],
        answer: "Mandate solid waste management programs"
    },
    {
        question: "Which of the following is a category of waste that should be separated?",
        options: [
            "Liquid only",
            "Biodegradable",
            "Precious metals",
            "Unused items"
        ],
        answer: "Biodegradable"
    },
    {
        question: "Why is proper waste segregation important for the environment?",
        options: [
            "It increases pollution",
            "It reduces the risk of contamination",
            "It delays waste disposal",
            "It produces more waste"
        ],
        answer: "It reduces the risk of contamination"
    },
    {
        question: "How does recycling contribute to natural resource conservation?",
        options: [
            "It increases energy use",
            "It uses more raw materials",
            "It reduces demand for virgin resources",
            "It harms the environment"
        ],
        "answer": "It reduces demand for virgin resources"
    },
    {
        question: "What is a direct benefit of efficient waste management?",
        options: [
            "More waste is created",
            "Higher landfill dependency",
            "Increased collection costs",
            "Streamlined collection and processing"
        ],
        answer: "Streamlined collection and processing"
    },
    {
        question: "What does proper hazardous waste disposal prevent?",
        options: [
            "Soil enrichment",
            "Health risks from toxic exposure",
            "Recycling of toxic materials",
            "Water purification"
        ],
        answer: "Health risks from toxic exposure"
    },
    {
        question: "What is one effect of reducing landfill dependency?",
        options: [
            "Increased pollution",
            "Shortened landfill lifespan",
            "Extended landfill lifespan",
            "More land needed for dumpsites"
        ],
        answer: "Extended landfill lifespan"
    },
    {
        question: "What is a common obstacle in effective waste segregation?",
        options: [
            "Excess awareness",
            "Too many recycling centers",
            "Lack of education and awareness",
            "Perfect compliance"
        ],
        answer: "Lack of education and awareness"
    },
    {
        question: "Why can inconsistent segregation practices be problematic?",
        options: [
            "They save time",
            "They lead to less waste",
            "They cause confusion and reduce efficiency",
            "They promote sustainability"
        ],
        answer: "They cause confusion and reduce efficiency"
    },
    {
        question: "What infrastructure issue affects waste segregation?",
        options: [
            "Excess collection bins",
            "Limited recycling bins and collection systems",
            "Too many composting options",
            "Free recycling services"
        ],
        answer: "Limited recycling bins and collection systems"
    },
    {
        question: "What happens when food waste is mixed with recyclables?",
        options: [
            "Better composting",
            "Easier sorting",
            "Contamination of recyclable materials",
            "Lower waste volume"
        ],
        answer: "Contamination of recyclable materials"
    },
    {
        question: "Which factor can limit the ability to set up waste segregation systems?",
        options: [
            "Overfunding",
            "Lack of waste",
            "Cost and limited resources",
            "Too much space"
        ],
        answer: "Cost and limited resources"
    },
    {
        question: "What type of waste is typically biodegradable?",
        options: [
            "Plastic bottles",
            "Aluminum cans",
            "Food scraps",
            "Glass jars"
        ],
        "answer": "Food scraps"
    },
    {
        question: "What is the goal of promoting composting under RA 9003?",
        options: [
            "To burn organic waste",
            "To reduce organic waste in landfills",
            "To sell waste overseas",
            "To increase garbage collection"
        ],
        answer: "To reduce organic waste in landfills"
    },
    {
        question: "Which of the following is a sustainable waste management practice?",
        options: [
            "Dumping into rivers",
            "Incineration",
            "Recycling",
            "Burning plastics"
        ],
        answer: "Recycling"
    },
    {
        question: "How can communities help improve waste segregation?",
        options: [
            "Ignore recycling laws",
            "Mix all types of waste",
            "Practice and promote proper segregation",
            "Depend solely on the government"
        ],
        answer: "Practice and promote proper segregation"
    },
    {
        question: "Which sector is responsible for educating people on waste segregation?",
        options: [
            "Private companies only",
            "The military",
            "Communities, schools, and local government",
            "Tourists"
        ],
        answer: "Communities, schools, and local government"
    },
    {
        question: "What is a consequence of poor waste segregation?",
        options: [
            "Increased recyclability",
            "Cleaner environment",
            "Contaminated waste streams",
            "Decreased landfill use"
        ],
        answer: "Contaminated waste streams"
    }
];

let questions = []; // This array will hold the current shuffled questions for Module 1

// --- Common/Utility Functions ---

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
        userAnswers[currentQuestionIndex] = selectedOption.textContent.trim(); // Store plain text
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
        // Update item number immediately
        itemNumber.textContent = `Item ${currentQuestionIndex + 1}`;

        const currentQ = questions[currentQuestionIndex];
        questionText.textContent = currentQ.question;

        // Shuffle options for the current question
        const shuffledOptions = [...currentQ.options]; // Make a copy before shuffling
        shuffleArray(shuffledOptions);

        optionsElements.forEach((option, index) => {
            option.textContent = shuffledOptions[index]; // Display shuffled options without prefixes
            option.classList.remove('selected');
        });

        // Store the shuffled options back into the questions array for reference
        questions[currentQuestionIndex].options = shuffledOptions;
    }
}

function showResults() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        // The comparison needs to be between the user's plain text choice
        // and the plain text of the correct answer that was stored in 'question.answer'
        // during initialization.
        if (userAnswers[index] === question.answer) {
            correctAnswers++;
        }
    });

    const incorrectAnswers = questions.length - correctAnswers;
    const timeTaken = 600 - timeLeft; // Time taken in seconds for Module 1 (10 minutes)
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
                    const isCorrect = userAnswers[index] === question.answer; // Direct comparison now
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

    // --- LOGIC FOR UNLOCKING MODULES ---
    const passingScore = 80; // 80% to pass
    const currentModule = 1; // This is for Module 1 quiz
    const nextModule = currentModule + 1; // This will be 2 for Module 1

    if (percentageScore >= passingScore) {
        localStorage.setItem(`module${currentModule}Completed`, 'true');
        localStorage.setItem(`module${nextModule}Unlocked`, 'true'); // Unlock Module 2
        showMessageBox(`Congratulations! You passed Module ${currentModule} with a score of ${percentageScore}%. Module ${nextModule} is now unlocked!`, () => {});
    } else {
        localStorage.setItem(`module${currentModule}Completed`, 'false');
        showMessageBox(`You scored ${percentageScore}%. You need ${passingScore}% to pass Module ${currentModule}. Please review the module and try again.`, () => {});
    }
    // --- END LOGIC ---
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 600; // Reset timer for Module 1 to 10 minutes
    clearInterval(timerInterval); // Clear the module's timer interval

    // Re-initialize questions array with a deep copy of originalQuestions
    // and strip prefixes from options and answer during this initialization.
    questions = originalQuestions.map(q => ({
        question: q.question,
        options: q.options.map(option => option.replace(/^[A-D]\.\s*/, '')),
        answer: q.answer.replace(/^[A-D]\.\s*/, '')
    }));
    shuffleArray(questions); // Shuffle the questions themselves

    // Re-initialize quiz container content
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('results-view'); // Remove results view class
    quizContainer.innerHTML = `
        <div class="question-header">
            <div class="item-number">Item 1</div>
            <div class="time" id="time">Time: 10:00</div>
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
    updateQuestion(); // Load the first (shuffled) question
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

    // Set initial time display for Module 1
    const timeDisplayElement = document.querySelector('#time');
    if (timeDisplayElement) {
        const initialMinutes = parseInt(timeLeft / 60, 10);
        const initialSeconds = parseInt(timeLeft % 60, 10);
        timeDisplayElement.textContent = `Time: ${initialMinutes < 10 ? '0' : ''}${initialMinutes}:${initialSeconds < 10 ? '0' : ''}${initialSeconds}`;
    }

    // Initialize questions by making a copy and stripping prefixes
    questions = originalQuestions.map(q => ({
        question: q.question,
        options: q.options.map(option => option.replace(/^[A-D]\.\s*/, '')),
        answer: q.answer.replace(/^[A-D]\.\s*/, '')
    }));
    shuffleArray(questions); // Shuffle the questions themselves
    await updateQuestion(); // Load the first (shuffled) question
    const display = document.querySelector('#time');
    startTimer(timeLeft, display);
});
