// jsquizpageM2.js

// Module-specific variables for Module 2
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 900; // 15 minutes in seconds for Module 2
let timerInterval; // Declare timer interval here for this module

// Store original questions and answers for Module 2
const originalQuestions = [
    {
        question: "What is the first and most critical step in proper waste disposal?",
        options: [
            "A. Burning waste",
            "B. Landfilling",
            "C. Segregation at source",
            "D. Hiring cleaners"
        ],
        answer: "C. Segregation at source"
    },
    {
        question: "What type of waste includes food scraps and garden waste?",
        options: [
            "A. Non-biodegradable",
            "B. Biodegradable",
            "C. Hazardous",
            "D. Recyclable"
        ],
        answer: "B. Biodegradable"
    },
    {
        question: "Which of the following is considered recyclable?",
        options: [
            "A. Used syringes",
            "B. Plastic bottles",
            "C. Rotten vegetables",
            "D. Contaminated packaging"
        ],
        answer: "B. Plastic bottles"
    },
    {
        question: "Which item is classified as hazardous waste?",
        options: [
            "A. Glass bottles",
            "B. Paper",
            "C. Batteries",
            "D. Leaves"
        ],
        answer: "C. Batteries"
    },
    {
        question: "What does community education aim to promote?",
        options: [
            "A. More garbage production",
            "B. Improper waste handling",
            "C. Responsible waste disposal behavior",
            "D. Ignoring recycling"
        ],
        answer: "C. Responsible waste disposal behavior"
    },
    {
        question: "Which platform is not typically used for spreading waste disposal awareness?",
        options: [
            "A. Social media",
            "B. Posters",
            "C. Infographics",
            "D. Private emails"
        ],
        answer: "D. Private emails"
    },
    {
        question: "What type of facility processes biodegradable waste?",
        options: [
            "A. Incinerator",
            "B. Composting unit",
            "C. Plasma reactor",
            "D. Recycling plant"
        ],
        answer: "B. Composting unit"
    },
    {
        question: "Why are recycling centers important?",
        options: [
            "A. They increase landfill space",
            "B. They store food",
            "C. They process recyclable materials",
            "D. They dispose of hazardous waste"
        ],
        answer: "C. They process recyclable materials"
    },
    {
        question: "What is one way individuals can help reduce waste generation?",
        options: [
            "A. Using disposable items",
            "B. Burning plastic",
            "C. Buying more packaging",
            "D. Using reusable products"
        ],
        answer: "D. Using reusable products"
    },
    {
        question: "Which of the following is an individual responsibility?",
        options: [
            "A. Building landfills",
            "B. Designing waste bins",
            "C. Disposing of waste correctly",
            "D. Making national policies"
        ],
        answer: "C. Disposing of waste correctly"
    },
    {
        question: "What should schools do to help with waste management?",
        options: [
            "A. Avoid teaching it",
            "B. Promote single-use items",
            "C. Incorporate waste education into the curriculum",
            "D. Reduce recycling bins"
        ],
        answer: "C. Incorporate waste education into the curriculum"
    },
    {
        question: "How can youth be engaged in waste management?",
        options: [
            "A. Ban them from waste programs",
            "B. Let them create more waste",
            "C. Involve them in clean-up drives and eco-clubs",
            "D. Ignore their role"
        ],
        answer: "C. Involve them in clean-up drives and eco-clubs"
    },
    {
        question: "What is the long-term benefit of youth engagement in waste management?",
        options: [
            "A. Short-term popularity",
            "B. Reduces class time",
            "C. Builds a culture of environmental responsibility",
            "D. Increases school waste"
        ],
        answer: "C. Builds a culture of environmental responsibility"
    },
    {
        question: "What is the role of the government in waste management?",
        options: [
            "A. Ignoring public awareness",
            "B. Importing more waste",
            "C. Providing policies and support systems",
            "D. Burning all waste"
        ],
        answer: "C. Providing policies and support systems"
    },
    {
        question: "Why is segregation at source effective?",
        options: [
            "A. It helps mix waste",
            "B. It creates more pollution",
            "C. It allows proper treatment of different waste types",
            "D. It increases waste volume"
        ],
        answer: "C. It allows proper treatment of different waste types"
    },
    {
        question: "What happens if waste is not properly segregated?",
        options: [
            "A. Better compost",
            "B. Higher recycling rates",
            "C. Contamination and poor waste management",
            "D. Improved energy use"
        ],
        answer: "C. Contamination and poor waste management"
    },
    {
        question: "What are clean-up events used for?",
        options: [
            "A. Polluting new areas",
            "B. Burning hazardous waste",
            "C. Raising money for waste companies",
            "D. Encouraging community participation in waste reduction"
        ],
        answer: "D. Encouraging community participation in waste reduction"
    },
    {
        question: "Why is individual responsibility important in waste management?",
        options: [
            "A. People create waste and can manage it at the source",
            "B. Only companies produce waste",
            "C. Individuals control waste laws",
            "D. It’s optional and has no effect"
        ],
        answer: "A. People create waste and can manage it at the source"
    },
    {
        question: "What is the ultimate goal of proper waste disposal?",
        options: [
            "A. To burn all trash",
            "B. To increase landfill use",
            "C. To work toward a zero-waste, sustainable future",
            "D. To export waste to other countries"
        ],
        answer: "C. To work toward a zero-waste, sustainable future"
    },
    {
        question: "Which group is not primarily responsible for proper waste management?",
        options: [
            "A. Individuals",
            "B. Governments",
            "C. Schools",
            "D. None; all are responsible"
        ],
        answer: "D. None; all are responsible"
    }
];

let questions = []; // This array will hold the current shuffled and rephrased questions for Module 2

// --- Common/Utility Functions (Self-contained within jsquizpageM2.js) ---

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

    // Set initial time display for Module 2
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
