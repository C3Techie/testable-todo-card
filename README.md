# Advanced Todo Item Card | HNG Internship Stage 1

An interactive, stateful, and highly accessible Todo Card component built for **HNG Internship Stage 1**. This version extends the Stage 0 foundation into a more functional "app-like" experience with real-time state synchronization.

## 🚀 Stage 1 Enhancements (What Changed)
*   **Editing Mode**: A fully functional edit form that allows users to modify the task title, description, priority, and due date.
*   **Status Transitions**: Added a status dropdown ("Pending", "In Progress", "Done") that synchronizes perfectly with the completion checkbox.
*   **Expand/Collapse**: Long descriptions are now truncated by default to maintain page cleanlines, with an accessible toggle to reveal full content.
*   **Granular Time Handling**: Improved time logic now shows minute-by-minute updates (e.g., "Due in 3 hours", "Overdue by 15 minutes") and stops when the task is marked "Completed".
*   **Visual State Feedback**: Added dynamic background tints based on priority and specialized styles for "In Progress" and "Overdue" states.

## 🎨 Design Decisions
*   **State-Driven UI**: Moved from static hardcoded values to a centralized `state` object. The UI now re-renders dynamically whenever the state changes, ensuring consistency across multiple controls (e.g., checkbox vs. dropdown).
*   **Priority Indicators**: Implemented subtle background tints for each priority level (Low/Medium/High) to provide immediate visual context without overwhelming the user.
*   **Focus Management**: Implemented accessibility-first focus handling. Opening the edit form automatically focuses the first input, and closing it returns focus to the Edit button.
*   **Glassmorphism Accents**: Used modern CSS variables and transitions to create a premium, fluid feel that reacts to user interaction.

## ♿ Accessibility Notes
*   **Aria-Live**: The time remaining element uses `aria-live="polite"` to notify screen readers of updates without interrupting the user.
*   **Aria-Expanded**: The expand/collapse toggle correctly updates `aria-expanded` and `aria-controls` for assistive technology.
*   **Keyboard Flow**: Maintained a logical tab order: Checkbox -> Status Control -> Expand Toggle -> Edit Button -> Delete Button.
*   **Semantic Forms**: Use proper `<label for="...">` associations for all form fields in Edit Mode.

## 🛠️ Technologies Used
*   **HTML5 & CSS3**: Custom properties (Variables), Flexbox, Grid, and CSS transitions.
*   **Vanilla JavaScript**: State management, DOM manipulation, and interval-based time logic.

## ⚠️ Known Limitations
*   **No Persistence**: This version does not use `localStorage`. Refreshing the page will reset all changes to the initial state.
*   **Single Card**: This is a standalone component demonstration, not a full list management system.

## 🚀 Quick Start
1. Clone the repository.
2. Open `index.html` in any browser.

## 🔗 Live Demo
[https://c3techie.github.io/testable-todo-card/](https://c3techie.github.io/testable-todo-card/)
