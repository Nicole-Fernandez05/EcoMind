/* JavaScript for progress circle (for visual effect, not actual data) */
document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const percentageText = card.querySelector('.stat-progress-circle span').textContent;
        const percentage = parseFloat(percentageText.replace('%', ''));
        let progressFill = card.querySelector('.stat-progress-fill');
        if (!progressFill) {
            progressFill = document.createElement('div');
            progressFill.classList.add('stat-progress-fill');
            card.querySelector('.stat-progress-circle').prepend(progressFill);
        }
        progressFill.style.setProperty('--progress', percentage + '%');
    });
});
