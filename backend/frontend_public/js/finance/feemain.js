// ===============================
// Initialize Accountant Page
// ===============================
function initializeAccountanfunction initializeBulkFeeForm() {

    const form = document.getElementById('fee-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const students = window.selectedClassStudents || [];
        const className = window.selectedClassName;

        if (!className) {
            alert("Select a class first");
            return;
        }

        if (students.length === 0) {
            alert("No students found");
            return;
        }

        const feeData = {
            feesPerTerm: document.getElementById('fee-fees-per-term').value,
            balance: document.getElementById('fee-bal').value,
            dueDate: document.getElementById('fee-due-date').value,
            academicYear: document.getElementById('fee-academic-year').value,
            academicTerm: document.getElementById('fee-academic-term').value,
            notes: document.getElementById('fee-notes').value,
            className
        };

        try {

            const response = await fetch(`${API_BASE_URL}/fees/bulk-create`, {
                method: 'POST',
                headers: getFetchHeaders(),
                body: JSON.stringify({
                    students,
                    feeData
                })
            });

            if (!response.ok) throw new Error("Bulk save failed");

            alert(`Fees added for ${students.length} students`);

            form.reset();

            loadFeeRecords();

        } catch (err) {
            console.error(err);
            alert("Error saving fees");
        }
    });
}

window.initializeBulkFeeForm = initializeBulkFeeForm;tPage() {
    console.log('Initializing accountant page');

    // Core initializers (from other modules)
    if (typeof loadClasses === 'function') loadClasses();
    if (typeof initializeFeeForm === 'function') initializeBulkFeeForm();
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
