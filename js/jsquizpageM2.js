// jsquizpageM2.js

// Module-specific variables for Module 2
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 900; // 15 minutes in seconds for Module 2
let timerInterval; // Declare timer interval here for this module

// STORE ORIGINAL QUESTIONS AND ANSWERS FOR MODULE 2 - *USING YOUR PROVIDED QUESTIONS*
const originalQuestions = [
    {
        question: "What is the first and most critical step in proper waste disposal?",
        options: [
            "Burning waste",
            "Landfilling",
            "Segregation at source",
            "Hiring cleaners"
        ],
        answer: "Segregation at source"
    },
    {
        question: "What type of waste includes food scraps and garden waste?",
        options: [
            "Non-biodegradable",
            "Biodegradable",
            "Hazardous",
            "Recyclable"
        ],
        answer: "Biodegradable"
    },
    {
        question: "Which of the following is considered recyclable?",
        options: [
            "Used syringes",
            "Plastic bottles",
            "Rotten vegetables",
            "Contaminated packaging"
        ],
        answer: "Plastic bottles"
    },
    {
        question: "Which item is classified as hazardous waste?",
        options: [
            "Glass bottles",
            "Paper",
            "Batteries",
            "Leaves"
        ],
        answer: "Batteries"
    },
    {
        question: "What does community education aim to promote?",
        options: [
            "More garbage production",
            "Improper waste handling",
            "Responsible waste disposal behavior",
            "Ignoring recycling"
        ],
        answer: "Responsible waste disposal behavior"
    },
    {
        question: "Which platform is not typically used for spreading waste disposal awareness?",
        options: [
            "Social media",
            "Posters",
            "Infographics",
            "Private emails"
        ],
        answer: "Private emails"
    },
    {
        question: "What type of facility processes biodegradable waste?",
        options: [
            "Incinerator",
            "Composting unit",
            "Plasma reactor",
            "Recycling plant"
        ],
        answer: "Composting unit"
    },
    {
        question: "Why are recycling centers important?",
        options: [
            "They increase landfill space",
            "They store food",
            "They process recyclable materials",
            "They dispose of hazardous waste"
        ],
        answer: "They process recyclable materials"
    },
    {
        question: "What is one way individuals can help reduce waste generation?",
        options: [
            "Using disposable items",
            "Burning plastic",
            "Buying more packaging",
            "Using reusable products"
        ],
        answer: "Using reusable products"
    },
    {
        question: "Which of the following is an individual responsibility?",
        options: [
            "Building landfills",
            "Designing waste bins",
            "Disposing of waste correctly",
            "Making national policies"
        ],
        answer: "Disposing of waste correctly"
    },
    {
        question: "What should schools do to help with waste management?",
        options: [
            "Avoid teaching it",
            "Promote single-use items",
            "Incorporate waste education into the curriculum",
            "Reduce recycling bins"
        ],
        answer: "Incorporate waste education into the curriculum"
    },
    {
        question: "How can youth be engaged in waste management?",
        options: [
            "Ban them from waste programs",
            "Let them create more waste",
            "Involve them in clean-up drives and eco-clubs",
            "Ignore their role"
        ],
        answer: "Involve them in clean-up drives and eco-clubs"
    },
    {
        question: "What is the long-term benefit of youth engagement in waste management?",
        options: [
            "Short-term popularity",
            "Reduces class time",
            "Builds a culture of environmental responsibility",
            "Increases school waste"
        ],
        answer: "Builds a culture of environmental responsibility"
    },
    {
        question: "What is the role of the government in waste management?",
        options: [
            "Ignoring public awareness",
            "Importing more waste",
            "Providing policies and support systems",
            "Burning all waste"
        ],
        answer: "Providing policies and support systems"
    },
    {
        question: "Why is segregation at source effective?",
        options: [
            "It helps mix waste",
            "It creates more pollution",
            "It allows proper treatment of different waste types",
            "It increases waste volume"
        ],
        answer: "It allows proper treatment of different waste types"
    },
    {
        question: "What happens if waste is not properly segregated?",
        options: [
            "Better compost",
            "Higher recycling rates",
            "Contamination and poor waste management",
            "Improved energy use"
        ],
        answer: "Contamination and poor waste management"
    },
    {
        question: "What are clean-up events used for?",
        options: [
            "Polluting new areas",
            "Burning hazardous waste",
            "Raising money for waste companies",
            "Encouraging community participation in waste reduction"
        ],
        answer: "Encouraging community participation in waste reduction"
    },
    {
        question: "Why is individual responsibility important in waste management?",
        options: [
            "People create waste and can manage it at the source",
            "Only companies produce waste",
            "Individuals control waste laws",
            "It’s optional and has no effect"
        ],
        answer: "People create waste and can manage it at the source"
    },
    {
        question: "What is the ultimate goal of proper waste disposal?",
        options: [
            "To burn all trash",
            "To increase landfill use",
            "To work toward a zero-waste, sustainable future",
            "To export waste to other countries"
        ],
        answer: "To work toward a zero-waste, sustainable future"
    },
    {
        question: "Which group is not primarily responsible for proper waste management?",
        options: [
            "Individuals",
            "Governments",
            "Schools",
            "None; all are responsible"
        ],
        answer: "None; all are responsible"
    }
];

let questions = []; // This array will hold the current shuffled questions for Module 2

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
            option.textContent = shuffledOptions[index]; // Display shuffled options (already prefix-free)
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
    const timeTaken = 900 - timeLeft; // Time taken in seconds for Module 2 (15 minutes)
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

    const passingScore = 80;
    const currentModule = 2; // This is specifically for Module 2 quiz
    const nextModule = currentModule + 1;

    if (percentageScore >= passingScore) {
        localStorage.setItem(`module${currentModule}Completed`, 'true');
        localStorage.setItem(`module${nextModule}Unlocked`, 'true'); // Unlock the next module (Module 3)
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
    timeLeft = 900; // Reset timer for Module 2 to 15 minutes
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

    // Set initial time display for Module 2
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
