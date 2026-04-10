document.addEventListener('DOMContentLoaded', () => {
    const todoCard = document.querySelector('[data-testid="test-todo-card"]');
    const toggle = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
    const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

    // Hardcoded Due Date: April 15, 2026, 6:00 PM
    const targetDate = new Date('2026-04-15T18:00:00');

    /**
     * Calculates and formats the time remaining until the target date.
     */
    function updateTimeRemaining() {
        const now = new Date();
        const diff = targetDate - now;
        const isOverdue = diff < 0;
        const absDiff = Math.abs(diff);

        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

        let timeStr = "";
        
        if (isOverdue) {
            if (days > 0) timeStr = `Overdue by ${days} day${days > 1 ? 's' : ''} ⚠️`;
            else if (hours > 0) timeStr = `Overdue by ${hours} hour${hours > 1 ? 's' : ''} ⚠️`;
            else if (minutes > 0) timeStr = `Overdue by ${minutes} minute${minutes > 1 ? 's' : ''} ⚠️`;
            else timeStr = "Overdue! ⚠️";
            
            timeRemainingElement.style.color = "var(--danger)";
        } else {
            if (days > 0) timeStr = `Due in ${days} day${days > 1 ? 's' : ''}`;
            else if (hours > 0) timeStr = `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
            else if (minutes > 0) timeStr = `Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
            else timeStr = "Due now! 🕒";
            
            timeRemainingElement.style.color = "var(--text-muted)";
        }

        timeRemainingElement.textContent = timeStr;
    }

    /**
     * Toggles the completion state of the todo card.
     */
    function toggleCompletion() {
        if (toggle.checked) {
            todoCard.classList.add('completed');
            statusBadge.textContent = 'Done ✅';
            statusBadge.setAttribute('aria-label', 'Current Status: Done');
        } else {
            todoCard.classList.remove('completed');
            statusBadge.textContent = 'Pending ⏳';
            statusBadge.setAttribute('aria-label', 'Current Status: Pending');
        }
    }

    // Event Listeners
    toggle.addEventListener('change', toggleCompletion);

    editBtn.addEventListener('click', () => {
        console.log("Edit clicked");
        // Visual feedback for dummy action
        editBtn.style.transform = "scale(0.9)";
        setTimeout(() => editBtn.style.transform = "scale(1)", 100);
    });

    deleteBtn.addEventListener('click', () => {
        alert("Delete clicked - This would remove the task.");
    });

    // Initial runs
    updateTimeRemaining();
    
    // Optional: Update every minute
    setInterval(updateTimeRemaining, 60000);
});
