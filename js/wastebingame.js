// wastebingame.js

document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game-btn');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const playAgainBtn = document.getElementById('play-again-btn');
    const finalScoreSpan = document.getElementById('final-score');

    const scoreElement = document.getElementById('score');
    const correctElement = document.getElementById('correct');
    const wrongElement = document.getElementById('wrong');

    const currentItemImage = document.getElementById('current-item-image');
    const currentItemName = document.getElementById('current-item-name');
    const draggableItem = document.querySelector('.draggable-item');
    const bins = document.querySelectorAll('.bin');

    // New elements for the game summary screen
    const gameSummaryScreen = document.createElement('div');
    gameSummaryScreen.id = 'game-summary-screen';
    gameSummaryScreen.classList.add('game-summary-screen', 'hidden');
    gameSummaryScreen.innerHTML = `
        <h2>Game Summary</h2>
        <p>Total Score: <span id="summary-total-score">0</span></p>
        <p>Correct Answers: <span id="summary-correct-answers">0</span></p>
        <p>Wrong Answers: <span id="summary-wrong-answers">0</span></p>
        <div class="chart-container">
            <canvas id="summary-chart"></canvas>
        </div>
        <div class="summary-buttons"> <button id="summary-play-again-btn">Play Again</button>
            <button id="summary-home-btn" onclick="location.href='homepage.html'">Home</button>
        </div>
    `;
    document.querySelector('main.game-container').appendChild(gameSummaryScreen);

    const summaryTotalScoreSpan = document.getElementById('summary-total-score');
    const summaryCorrectAnswersSpan = document.getElementById('summary-correct-answers');
    const summaryWrongAnswersSpan = document.getElementById('summary-wrong-answers');
    const summaryPlayAgainBtn = document.getElementById('summary-play-again-btn');
    const summaryHomeBtn = document.getElementById('summary-home-btn'); // Get the new home button
    const summaryChartCanvas = document.getElementById('summary-chart');

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let itemCounter = 0;
    const maxItems = 20;

    const items = [
        { name: "Plastic Bottle", category: "Recyclable", image: "https://i.ibb.co/ccf45hC9/plastic-bottle.png" },
        { name: "Banana Peel", category: "Biodegradable", image: "https://i.ibb.co/ZzLbTRPk/banana-peel.png" },
        { name: "Used Battery", category: "Hazardous", image: "https://i.ibb.co/Kv8Lg8X/battery.png" },
        { name: "Cardboard Box", category: "Recyclable", image: "https://i.ibb.co/2Dvw1Xt/cardboard-box.png" },
        { name: "Glass Jar", category: "Recyclable", image: "https://i.ibb.co/przWzdsq/glass-jar.png" },
        { name: "Apple Core", category: "Biodegradable", image: "https://i.ibb.co/ynjRNZsH/apple-core.png" },
        { name: "Soda Can", category: "Recyclable", image: "https://i.ibb.co/v4Brb6Rm/soda-can.png" },
        { name: "Light Bulb", category: "Hazardous", image: "https://i.ibb.co/cc94YyyF/light-bulb.png" },
        { name: "Newspaper", category: "Recyclable", image: "https://i.ibb.co/QvKdX1Kj/newspaper.png" },
        { name: "Plastic Bag", category: "Non-Biodegradable", image: "https://i.ibb.co/bMFb0bBC/plastic-bag.png" },
        { name: "Styrofoam Cup", category: "Non-Biodegradable", image: "https://i.ibb.co/0pgvqDTv/styrofoam-cup.png" },
        { name: "Expired Medicine", category: "Hazardous", image: "https://i.ibb.co/HLC0Y4dx/medicine.png" },
        { name: "Dried Leaves", category: "Biodegradable", image: "https://i.ibb.co/QWy3MwW/dried-leaves.png" },
        { name: "Milk Carton", category: "Recyclable", image: "https://i.ibb.co/Hm9dKLW/milk-carton.png" },
        { name: "Old Tire", category: "Non-Biodegradable", image: "https://i.ibb.co/r2K0Tc3K/tire.png" },
        { name: "Ceramic Mug", category: "Non-Biodegradable", image: "https://i.ibb.co/xqP1BZF0/ceramic-mug.png" },
        { name: "Fabric Scraps", category: "Non-Biodegradable", image: "https://i.ibb.co/tphvgGs4/fabric-scraps.png" },
        { name: "Aerosol Can", category: "Hazardous", image: "https://i.ibb.co/TxnVH6sp/aerosol-can.png" },
        { name: "Egg Shells", category: "Biodegradable", image: "https://i.ibb.co/p6JVJxGY/egg-shells.png" },
        { name: "Metal Scrap", category: "Recyclable", image: "https://i.ibb.co/LhxGN4R0/metal-scrap.png" }
    ];


    let randomizedItems = [];
    let currentItem = null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeGame() {
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        itemCounter = 0;
        scoreElement.textContent = score;
        correctElement.textContent = correctCount;
        wrongElement.textContent = wrongCount;

        shuffleArray(items);
        randomizedItems = items.slice(0, maxItems); // Get first 20 randomized items

        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        gameSummaryScreen.classList.add('hidden'); // Hide summary screen on new game
        loadNextItem();
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
        finalScoreSpan.textContent = score; // This is the old game over screen, still updating it for consistency

        // Immediately transition to the new summary screen
        showGameSummary();
    }

    // Function to show game summary
    function showGameSummary() {
        gameScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden'); // Ensure old game over screen is hidden
        gameSummaryScreen.classList.remove('hidden');

        summaryTotalScoreSpan.textContent = score;
        summaryCorrectAnswersSpan.textContent = correctCount;
        summaryWrongAnswersSpan.textContent = wrongCount;

        // Chart.js implementation
        const ctx = summaryChartCanvas.getContext('2d');
        if (window.myChart) {
            window.myChart.destroy(); // Destroy previous chart instance if it exists
        }
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Correct', 'Wrong'],
                datasets: [{
                    label: 'Answers',
                    data: [correctCount, wrongCount],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)', // Green for Correct
                        'rgba(220, 53, 69, 0.7)'  // Red for Wrong
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allows the chart to fit into its container better
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0 // Ensure whole numbers for counts
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide the legend as labels are self-explanatory
                    },
                    title: {
                        display: true,
                        text: 'Answer Breakdown',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }

    function loadNextItem() {
        if (itemCounter < maxItems) {
            currentItem = randomizedItems[itemCounter];
            currentItemImage.src = currentItem.image; // Updated to use direct URL
            currentItemImage.alt = currentItem.name;
            currentItemName.textContent = currentItem.name;
            draggableItem.setAttribute('data-category', currentItem.category);
            draggableItem.style.opacity = '1';
            draggableItem.style.pointerEvents = 'auto';
            itemCounter++;
        } else {
            // Call the new summary function when all items are done
            showGameSummary();
        }
    }

    // Drag and Drop functionality
    let draggedItem = null;

    draggableItem.addEventListener('dragstart', (e) => {
        draggedItem = e.target.closest('.draggable-item');
        e.dataTransfer.setData('text/plain', draggedItem.dataset.category);
        setTimeout(() => {
            draggedItem.style.opacity = '0.5';
        }, 0);
    });

    draggableItem.addEventListener('dragend', () => {
        draggedItem.style.opacity = '1';
        draggedItem = null;
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', (e) => {
            e.preventDefault();
            bin.classList.add('drag-over');
        });

        bin.addEventListener('dragleave', () => {
            bin.classList.remove('drag-over');
        });

        bin.addEventListener('drop', (e) => {
            e.preventDefault();
            bin.classList.remove('drag-over');

            const droppedCategory = e.dataTransfer.getData('text/plain');
            const targetBinCategory = bin.id;

            if (draggedItem && droppedCategory === targetBinCategory) {
                score += 10;
                correctCount++;
            } else {
                score -= 5;
                wrongCount++;
            }
            scoreElement.textContent = score;
            correctElement.textContent = correctCount;
            wrongElement.textContent = wrongCount;

            loadNextItem();
        });
    });

    // Event Listeners for Game Flow
    startGameBtn.addEventListener('click', initializeGame);
    playAgainBtn.addEventListener('click', initializeGame); // This is for the old "Game Over" screen
    summaryPlayAgainBtn.addEventListener('click', initializeGame); // New button for the summary screen

    // No need for a separate event listener for summaryHomeBtn as it uses inline onclick

    // Sidebar functionality
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

    hamburgerIcon.addEventListener('click', () => {
        sidebarContainer.classList.add('open');
        sidebarMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebarContainer.classList.remove('open');
        sidebarMenu.classList.remove('open');
        document.body.style.overflow = '';
    });

    sidebarContainer.addEventListener('click', (event) => {
        if (event.target === sidebarContainer) {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Set current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();
});
