// JavaScript for Header and Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

    // Open sidebar
    if (hamburgerIcon) { // Added check for element existence
        hamburgerIcon.addEventListener('click', () => {
            sidebarContainer.classList.add('open');
            sidebarMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling body when sidebar is open
        });
    }

    // Close sidebar by clicking close button
    if (closeSidebarBtn) { // Added check for element existence
        closeSidebarBtn.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow body scrolling again
        });
    }

    // Close sidebar by clicking outside the menu (on the overlay)
    if (sidebarContainer) { // Added check for element existence
        sidebarContainer.addEventListener('click', (event) => {
            // Check if the click occurred directly on the container and not on the sidebar menu itself
            if (event.target === sidebarContainer) {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = ''; // Allow body scrolling again
            }
        });
    }

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
let timeLeft = 900; // 15 minutes in seconds
let timerInterval;
let userAnswers = [];
// Store original questions and answers as a base, LLM will rephrase
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
        answer: "It reduces demand for virgin resources"
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
    const prompt = `Rephrase the following multiple-choice question and its options. Ensure the meaning of the question and the correct answer remains the same.
    \nOriginal Question: ${originalQuestionObj.question}
    \nOriginal Options (without A,B,C,D prefixes):
    ${originalQuestionObj.options.map(o => o.replace(/^[A-D]\.\s*/, '')).join('\n')}
    \nOriginal Correct Answer Text (without prefix): ${originalQuestionObj.answer.replace(/^[A-D]\.\s*/, '')}
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
    const apiKey = "AIzaSyDAaB8sAR3TKJz92Y_8AeKjent6-k2ygTM";
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
            let llmCorrectAnswerText = parsedJson.correctAnswerText;

            // --- CRITICAL FIX START ---
            // Find the *exact* matching rephrased option for the correct answer
            let finalCorrectAnswerText = '';
            // First, try to find an exact match from the LLM's rephrased options
            const exactMatch = newOptions.find(option => option === llmCorrectAnswerText);

            if (exactMatch) {
                finalCorrectAnswerText = exactMatch;
            } else {
                // If no exact match, try to find a "contains" match or closest match
                // This is a fallback and can still be imperfect if rephrasing is too drastic
                const fuzzyMatch = newOptions.find(option =>
                    option.toLowerCase().includes(llmCorrectAnswerText.toLowerCase()) ||
                    llmCorrectAnswerText.toLowerCase().includes(option.toLowerCase())
                );

                if (fuzzyMatch) {
                    finalCorrectAnswerText = fuzzyMatch;
                    console.warn(`Fuzzy match for correct answer: Original LLM provided "${llmCorrectAnswerText}", using rephrased option "${fuzzyMatch}"`);
                } else {
                    // As a last resort, if the LLM's correct answer text isn't in its own options,
                    // we'll add it if it's not already there and set it as the correct answer.
                    // This scenario suggests a significant LLM misbehavior, but provides a fallback.
                    console.error("LLM's rephrased correct answer text does not match any of its rephrased options. Adding it as an option.");
                    if (!newOptions.includes(llmCorrectAnswerText)) {
                        newOptions.push(llmCorrectAnswerText); // Add it to ensure it's an option
                        shuffleArray(newOptions); // Re-shuffle after adding
                    }
                    finalCorrectAnswerText = llmCorrectAnswerText; // Use the LLM's exact text
                }
            }
            // --- CRITICAL FIX END ---

            shuffleArray(newOptions); // Shuffle the rephrased options

            return {
                question: parsedJson.rephrasedQuestion,
                options: newOptions,
                answer: finalCorrectAnswerText // Now this *guarantees* it's one of the displayed options
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
        // Clear content while fetching to avoid "Loading..." text
        questionText.textContent = "";
        optionsElements.forEach(option => {
            option.textContent = "";
            option.classList.remove('selected');
        });
        itemNumber.textContent = `Item ${currentQuestionIndex + 1}`; // Update item number immediately

        // Fetch rephrased question and options
        const originalQuestion = originalQuestions[currentQuestionIndex]; // Use originalQuestions here
        const rephrasedData = await fetchRephrasedQuestion(originalQuestion);

        // Update the current question in the `questions` array with the rephrased data
        questions[currentQuestionIndex] = {
            question: rephrasedData.question,
            options: rephrasedData.options,
            answer: rephrasedData.answer // This is the plain text of the correct option, now guaranteed to be in options
        };

        // Populate with fetched data
        questionText.textContent = questions[currentQuestionIndex].question;
        optionsElements.forEach((option, index) => {
            // Ensure there are enough options to populate. If LLM provides fewer than 4,
            // the extra option elements will remain blank.
            if (questions[currentQuestionIndex].options[index]) {
                option.textContent = questions[currentQuestionIndex].options[index];
            } else {
                option.textContent = ""; // Clear if no option available
            }
        });
    }
}


function showResults() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        // Now compare the selected text directly with the plain text answer
        if (userAnswers[index] === question.answer) {
            correctAnswers++;
        }
    });

    const incorrectAnswers = questions.length - correctAnswers;
    const timeTaken = 900 - timeLeft; // Using 900 seconds (15 minutes) for consistency
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
                    <div class="quiz-actions"> <button class="action-button" onclick="retakeQuiz()">Retake Quiz</button>
                        <a href="modulehomepage.html" class="action-button">Return to Modules</a> </div>
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

    // --- LOGIC FOR UNLOCKING MODULES ---
    const passingScore = 80; // 80% to pass
    const currentModule = 1; // This is for Module 1 quiz, so it unlocks Module 2

    if (percentageScore >= passingScore) {
        localStorage.setItem(`module${currentModule}Completed`, 'true');
        showMessageBox(`Congratulations! You passed Module ${currentModule} with a score of ${percentageScore}%. The next module is now unlocked!`, () => {
            // No automatic redirect here, user clicks "Return to Modules"
        });
    } else {
        localStorage.setItem(`module${currentModule}Completed`, 'false'); // Optionally store false if they didn't pass
        showMessageBox(`You scored ${percentageScore}%. You need ${passingScore}% to pass Module ${currentModule}. Please review the module and try again.`, () => {
            // No automatic redirect here, user clicks "Retake Quiz" or "Return to Modules"
        });
    }
    // --- END LOGIC ---
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 900; // Reset timer to 15 minutes
    clearInterval(timerInterval); // Ensure any existing timer is cleared

    // Re-initialize questions array with a shuffled copy of originalQuestions
    questions = [...originalQuestions]; // Create a shallow copy
    shuffleArray(questions); // Shuffle questions for a new take

    // Re-initialize quiz container and timer
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('results-view'); // Remove results view class
    quizContainer.innerHTML = `
        <div class="question-header">
            <div class="item-number">Item 1</div>
            <div class="time" id="time">Time: 15:00</div>
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

function returnToModules() {
    window.location.href = 'modulehomepage.html';
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
        margin-top: 10px; /* Added margin for consistency if there are other buttons */
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
    // Set initial time for quiz, consistent with HTML text "Time: 15:00"
    timeLeft = 900; // 15 minutes in seconds

    // Update the time display in HTML directly on load
    const timeDisplayElement = document.querySelector('#time');
    if (timeDisplayElement) {
        timeDisplayElement.textContent = "Time: 15:00";
    }

    // Create a mutable copy of originalQuestions to shuffle
    questions = [...originalQuestions];
    shuffleArray(questions); // Shuffle questions on page load
    await updateQuestion(); // Load the first (shuffled and rephrased) question
    const display = document.querySelector('#time');
    startTimer(timeLeft, display);
});
