document.addEventListener('DOMContentLoaded', () => {
    // State Object
    const state = {
        title: "Squash the Memory Leak in Prod 🐛",
        description: "A rogue memory leak has been silently crashing the auth service every 6 hours. Reproduce, profile, patch, and ship a hotfix before the next incident window.",
        priority: "High",
        status: "Pending",
        dueDate: "2026-04-15T18:00",
        isExpanded: false,
        isEditing: false
    };

    // DOM Elements - Containers
    const todoCard = document.querySelector('[data-testid="test-todo-card"]');
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    const collapsibleSection = document.querySelector('[data-testid="test-todo-collapsible-section"]');

    // DOM Elements - Display
    const titleDisplay = document.querySelector('[data-testid="test-todo-title"]');
    const descDisplay = document.querySelector('[data-testid="test-todo-description"]');
    const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
    const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
    const dueDateDisplay = document.querySelector('[data-testid="test-todo-due-date"]');
    const timeRemainingDisplay = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
    
    // DOM Elements - Controls
    const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
    const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

    // DOM Elements - Form
    const editTitleInput = document.getElementById('edit-title');
    const editDescInput = document.getElementById('edit-description');
    const editPrioritySelect = document.getElementById('edit-priority');
    const editDueDateInput = document.getElementById('edit-due-date');
    const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

    /**
     * Formats the date for display (e.g., "Due April 15, 2026")
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    /**
     * Calculates granular time remaining
     */
    function getGranularTime() {
        if (state.status === 'Done') return "Completed";

        const now = new Date();
        const target = new Date(state.dueDate);
        const diff = target - now;
        const isOverdue = diff < 0;
        const absDiff = Math.abs(diff);

        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (isOverdue) {
            state.isOverdue = true;
            if (days > 0) return `Overdue by ${days} day${days > 1 ? 's' : ''}`;
            if (hours > 0) return `Overdue by ${hours} hour${hours > 1 ? 's' : ''}`;
            return `Overdue by ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
            state.isOverdue = false;
            if (days > 0) return `Due in ${days} day${days > 1 ? 's' : ''}`;
            if (hours > 0) return `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
            if (minutes > 0) return `Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
            return "Due now!";
        }
    }

    /**
     * Main Render Function
     */
    function render() {
        // Toggle Modes
        viewMode.hidden = state.isEditing;
        editMode.hidden = !state.isEditing;

        // Update Attributes for CSS selectors
        todoCard.setAttribute('data-priority', state.priority);
        todoCard.setAttribute('data-status', state.status);
        todoCard.setAttribute('data-overdue', state.isOverdue && state.status !== 'Done');

        if (state.status === 'Done') {
            todoCard.classList.add('completed');
        } else {
            todoCard.classList.remove('completed');
        }

        // Update Display Text
        titleDisplay.textContent = state.title;
        descDisplay.textContent = state.description;
        priorityBadge.textContent = `${state.priority} ${state.priority === 'High' ? '🔥' : state.priority === 'Medium' ? '⚡' : '🌱'}`;
        statusBadge.textContent = `${state.status} ${state.status === 'Done' ? '✅' : state.status === 'In Progress' ? '🚀' : '⏳'}`;
        dueDateDisplay.textContent = `Due ${formatDate(state.dueDate)}`;
        dueDateDisplay.setAttribute('datetime', state.dueDate);
        
        // Time Remaining Logic
        const timeStr = getGranularTime();
        timeRemainingDisplay.textContent = timeStr;
        overdueIndicator.hidden = !(state.isOverdue && state.status !== 'Done');

        // Sync Controls
        checkbox.checked = state.status === 'Done';
        statusControl.value = state.status;

        // Expand/Collapse Logic
        // We measure if the content is truncated when collapsed
        const isExpanded = state.isExpanded;
        
        // Temporarily remove expanded class to measure real overflow
        collapsibleSection.classList.remove('expanded');
        const isOverflowing = collapsibleSection.scrollHeight > collapsibleSection.clientHeight;
        
        // Re-apply if it was actually expanded
        if (isExpanded) {
            collapsibleSection.classList.add('expanded');
            expandToggle.textContent = 'Show less';
            expandToggle.setAttribute('aria-expanded', 'true');
        } else {
            expandToggle.textContent = 'Show more';
            expandToggle.setAttribute('aria-expanded', 'false');
        }

        // Only show the toggle button if the text is actually long enough to be truncated
        expandToggle.style.display = (isOverflowing || isExpanded) ? 'inline-flex' : 'none';

        // Accessibility Labels
        priorityBadge.setAttribute('aria-label', `Priority: ${state.priority}`);
        statusBadge.setAttribute('aria-label', `Status: ${state.status}`);
    }

    // --- Event Listeners ---

    // Status / Checkbox Synchronization
    checkbox.addEventListener('change', () => {
        state.status = checkbox.checked ? 'Done' : 'Pending';
        render();
    });

    statusControl.addEventListener('change', () => {
        state.status = statusControl.value;
        render();
    });

    // Expand / Collapse
    expandToggle.addEventListener('click', () => {
        state.isExpanded = !state.isExpanded;
        render();
    });

    // Edit Mode Transitions
    editBtn.addEventListener('click', () => {
        state.isEditing = true;
        
        // Populate Form
        editTitleInput.value = state.title;
        editDescInput.value = state.description;
        editPrioritySelect.value = state.priority;
        editDueDateInput.value = state.dueDate;
        
        render();
        editTitleInput.focus(); // Focus management
    });

    cancelBtn.addEventListener('click', () => {
        state.isEditing = false;
        render();
        editBtn.focus(); // Return focus
    });

    editMode.addEventListener('submit', (e) => {
        e.preventDefault();
        
        state.title = editTitleInput.value;
        state.description = editDescInput.value;
        state.priority = editPrioritySelect.value;
        state.dueDate = editDueDateInput.value;
        state.isEditing = false;
        
        render();
        editBtn.focus(); // Return focus
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this task?")) {
            todoCard.style.opacity = '0';
            todoCard.style.transform = 'scale(0.9)';
            setTimeout(() => todoCard.remove(), 300);
        }
    });

    // Initial Render
    render();

    // Live Time Updates (every 30 seconds)
    setInterval(() => {
        if (state.status !== 'Done') {
            const timeStr = getGranularTime();
            timeRemainingDisplay.textContent = timeStr;
            overdueIndicator.hidden = !state.isOverdue;
            todoCard.setAttribute('data-overdue', state.isOverdue);
        }
    }, 30000);
});
