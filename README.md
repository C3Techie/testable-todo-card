# Testable Todo Item Card | HNG Internship Stage 0

A clean, modern, highly accessible, and fully testable Todo/Task Card component built for the **HNG Internship Stage 0** Frontend task.

## 🎯 Task Focus
The primary focus of this project is on three key areas:
1. **Testability**: Strict adherence to exact `data-testid` attributes for automated grading.
2. **Accessibility (a11y)**: Implementation of proper semantic HTML, screen-reader compatibility (ARIA labels, polite live regions), keyboard navigability, and WCAG AA contrast compliance.
3. **Responsiveness**: A fluid layout using Flexbox that breaks down gracefully from desktop screens (≤1200px) down to narrow mobile screens (320px).

## ✨ Features
* **Semantic Structure**: Uses appropriate landmarks and tags like `<article>`, `<time>`, `<input type="checkbox">`, and `<ul>`.
* **Dynamic Time Remaining**: Calculates the remaining time based on a hardcoded due date and updates the view (e.g., "Due in 3 days", "Overdue by 2 hours").
* **Live Refresh**: Automatically recalculates the time remaining every 60 seconds.
* **Interactive States**: Toggling the checkbox properly reflects a "Done" state, dynamically adding strike-through styling, lowering opacity, and updating the visual status badge.
* **Mock Actions**: Accessible buttons for "Edit" (`console.log`) and "Delete" (`alert`) to demonstrate interactive element handling without full CRUD logic required for Stage 0.

## 🛠️ Technologies Used
* **HTML5**: For semantic and structural page layout.
* **CSS3**: For responsive design, custom checkbox styling, and modern UI aesthetics (blur backgrounds, hover effects).
* **Vanilla JavaScript**: For DOM manipulation, time calculations, and event handling. No external libraries or frameworks.

## 🚀 Quick Start
This project requires no build tools or package managers. 

To view it locally:
1. Clone or download the repository.
2. Open the `index.html` file directly in any modern web browser.

## 🔗 Live Demo
[https://c3techie.github.io/testable-todo-card/](https://c3techie.github.io/testable-todo-card/)
