// ===============================
// Initialize Accountant Page
// ===============================
function initializeAccountantPage() {

    console.log('Initializing accountant page');

    // Load classes
    if (typeof loadClasses === 'function') {
        loadClasses();
    }

    // Load bulk fee form
    if (typeof initializeBulkFeeForm === 'function') {
        initializeBulkFeeForm();
    }

    // Load fee records
    if (typeof loadFeeRecords === 'function') {
        loadFeeRecords();
    }

    // Debug button
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
// Bulk Fee Form
// ===============================
function initializeBulkFeeForm() {

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

        if (!students.length) {
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

            if (typeof loadFeeRecords === 'function') {
                loadFeeRecords();
            }

        } catch (err) {
            console.error(err);
            alert("Error saving fees");
        }
    });
}

// expose
window.initializeBulkFeeForm = initializeBulkFeeForm;
window.initializeAccountantPage = initializeAccountantPage;

// ===============================
// DOM READY
// ===============================
document.addEventListener('DOMContentLoaded', () => {

    const accountantSection =
        document.getElementById('accountant-section');

    if (!accountantSection) return;

    initializeAccountantPage();
});

// ===============================
// Fallback load
// ===============================
if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
) {
    const accountantSection =
        document.getElementById('accountant-section');

    if (accountantSection) {
        initializeAccountantPage();
    }
}
