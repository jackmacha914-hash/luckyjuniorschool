
// ===============================
// Initialize Accountant Page
// ===============================
function initializeAccountantPage() {

    console.log('Initializing accountant page');

    const init = () => {

        const classSelect = document.getElementById('fee-class-name');

        if (!classSelect) {
            console.warn('Class dropdown not ready yet, retrying...');
            setTimeout(init, 200);
            return;
        }

        // SAFE INITIALIZATION FLOW
        if (typeof loadClasses === 'function') {
            loadClasses();
        }

        if (typeof initializeBulkFeeForm === 'function') {
            initializeBulkFeeForm();
        }

        if (typeof loadFeeRecords === 'function') {
            loadFeeRecords();
        }

        console.log('Accountant initialized successfully');
    };

    init();
}


// ===============================
// Bulk Fee Form
// ===============================
function initializeBulkFeeForm() {

    const form = document.getElementById('fee-form');

    if (!form) return;

    // Prevent duplicate event listeners
    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleSubmit);

    async function handleSubmit(e) {
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
    }
}


// ===============================
// GLOBAL EXPORTS
// ===============================
window.initializeBulkFeeForm = initializeBulkFeeForm;
window.initializeAccountantPage = initializeAccountantPage;


// ===============================
// DOM READY (SAFE + RELIABLE)
// ===============================
document.addEventListener('DOMContentLoaded', () => {

    const accountantSection =
        document.getElementById('accountant-section');

    if (!accountantSection) return;

    initializeAccountantPage();
});


// ===============================
// FALLBACK (FOR LATE SCRIPT LOAD)
// ===============================
(function safeInit() {

    const accountantSection =
        document.getElementById('accountant-section');

    if (!accountantSection) return;

    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {
        initializeAccountantPage();
    }
})();
