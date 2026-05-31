// ===============================
// Initialize Accountant Page
// ===============================
function initializeAccountantPage() {
    console.log('Initializing accountant page');

    // Core initializers (from other modules)
    if (typeof loadClasses === 'function') loadClasses();
    if (typeof initializeFeeForm === 'function') initializeFeeForm();
    if (typeof loadFeeRecords === 'function') loadFeeRecords();

    // ===============================
    // Debug Button (safe)
    // ===============================
    const debugButton = document.createElement('button');

    debugButton.textContent = 'Debug: Load Test Students';
    debugButton.style.margin = '10px';
    debugButton.style.padding = '5px 10px';

    debugButton.onclick = () => {
        const studentSelect = document.getElementById('fee-student-id');

        if (studentSelect && typeof loadMockStudents === 'function') {
            loadMockStudents(studentSelect);
        }
    };

    const formContainer = document.querySelector('#accountant-section .form-container');

    if (formContainer) {
        formContainer.appendChild(debugButton);
    }
}

// ===============================
// DOM Ready
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded - Accountant Page');

    const accountantSection = document.getElementById('accountant-section');

    if (!accountantSection) {
        console.log('Not on accountant page, skipping initialization');
        return;
    }

    try {
        initializeAccountantPage();
        console.log('Accountant script loaded and initialized');
    } catch (error) {
        console.error('Error initializing accountant page:', error);
    }
});

// ===============================
// Fallback if script loads late
// ===============================
if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
) {
    const accountantSection = document.getElementById('accountant-section');

    if (accountantSection) {
        initializeAccountantPage();
    }
}
