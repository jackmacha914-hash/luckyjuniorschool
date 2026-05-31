// Initialize Accountant Page
function initializeAccountantPage() {
    console.log('Initializing accountant page');

    loadClasses();
    initializeFeeForm();
    loadFeeRecords();

    // Debug Button
    const debugButton = document.createElement('button');

    debugButton.textContent = 'Debug: Load Test Students';
    debugButton.style.margin = '10px';
    debugButton.style.padding = '5px 10px';

    debugButton.onclick = () => {
        const studentSelect = document.getElementById('fee-student-id');

        if (studentSelect) {
            loadMockStudents(studentSelect);
        }
    };

    const formContainer = document.querySelector('#accountant-section .form-container');

    if (formContainer) {
        formContainer.appendChild(debugButton);
    }
}

// DOM Load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded - Accountant Page');

    const accountantSection = document.getElementById('accountant-section');

    if (!accountantSection) {
        console.log('Not on accountant page, skipping initialization');
        return;
    }

    try {
        console.log('Initializing accountant page...');

        initializeAccountantPage();

        console.log('Accountant script loaded and initialized');

    } catch (error) {
        console.error('Error initializing accountant page:', error);
    }
});

// If DOM already loaded
if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
) {
    console.log('DOM already loaded, initializing...');

    const accountantSection = document.getElementById('accountant-section');

    if (accountantSection) {
        initializeAccountantPage();
    }
}
