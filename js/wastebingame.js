document.addEventListener('DOMContentLoaded', () => {
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
        randomizedItems = items.slice(0, maxItems);
        gameScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        loadNextItem();
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
        finalScoreSpan.textContent = score;
    }

    function loadNextItem() {
        if (itemCounter < maxItems) {
            currentItem = randomizedItems[itemCounter];
            currentItemImage.src = currentItem.image;
            currentItemImage.alt = currentItem.name;
            currentItemName.textContent = currentItem.name;
            draggableItem.setAttribute('data-category', currentItem.category);
            draggableItem.style.opacity = '1';
            draggableItem.style.pointerEvents = 'auto';
            itemCounter++;
        } else {
            endGame();
        }
    }

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

    playAgainBtn.addEventListener('click', initializeGame);

    // Initialize the game automatically when the page loads
    initializeGame();

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

    document.getElementById('year').textContent = new Date().getFullYear();
});
