// ===============================
// Initialize Accountant Page
// ===============================
function initializeAccountantPage() {

    console.log('Initializing accountant page');

    const init = () => {

        const classSelect =
            document.getElementById('fee-class-name');

        if (!classSelect) {

            console.warn(
                'Class dropdown not ready yet, retrying...'
            );

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

        console.log(
            'Accountant initialized successfully'
        );
    };

    init();
}


// ===============================
// Bulk Fee Form
// ===============================
function initializeBulkFeeForm() {

    const form =
        document.getElementById('fee-form');

    if (!form) return;

    // Prevent duplicate listeners
    form.removeEventListener(
        'submit',
        handleSubmit
    );

    form.addEventListener(
        'submit',
        handleSubmit
    );

    async function handleSubmit(e) {

        e.preventDefault();

        const students =
            window.selectedClassStudents || [];

        const className =
            window.selectedClassName;

        // VALIDATION
        if (!className) {

            alert('Select a class first');
            return;
        }

        if (!students.length) {

            alert('No students found');
            return;
        }

        // FORM DATA
        const feeData = {

            feesPerTerm:
                Number(
                    document.getElementById('fee-fees-per-term').value
                ) || 0,

            balance:
                Number(
                    document.getElementById('fee-bal').value
                ) || 0,

            dueDate:
                document.getElementById('fee-due-date').value,

            academicYear:
                document.getElementById('fee-academic-year').value,

            academicTerm:
                document.getElementById('fee-academic-term').value,

            notes:
                document.getElementById('fee-notes').value,

            className
        };

        console.log(
            'Submitting bulk fee data:',
            feeData
        );

        console.log(
            'Students:',
            students
        );

        try {

            const response = await fetch(
                'https://luckyjuniorschool.onrender.com/api/fees/bulk-create',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },

                    body: JSON.stringify({

                        // SEND IDS ONLY
                        students:
                            students.map(s => s._id),

                        feeData
                    })
                }
            );

            const result =
                await response.json();

            console.log(
                'Bulk save response:',
                result
            );

            if (!response.ok) {

                throw new Error(
                    result.error || 'Bulk save failed'
                );
            }

            alert(
                `Fees added for ${students.length} students`
            );

            form.reset();

            // RESET GLOBALS
            window.selectedClassStudents = [];
            window.selectedClassName = '';

            // RELOAD TABLE
            if (typeof loadFeeRecords === 'function') {
                loadFeeRecords();
            }

        } catch (err) {

            console.error(
                'Bulk fee save error:',
                err
            );

            alert(
                'Error saving fees: ' + err.message
            );
        }
    }
}


// ===============================
// GLOBAL EXPORTS
// ===============================
window.initializeBulkFeeForm =
    initializeBulkFeeForm;

window.initializeAccountantPage =
    initializeAccountantPage;


// ===============================
// DOM READY
// ===============================
document.addEventListener(
    'DOMContentLoaded',
    () => {

        const accountantSection =
            document.getElementById(
                'accountant-section'
            );

        if (!accountantSection) return;

        initializeAccountantPage();
    }
);


// ===============================
// FALLBACK SAFE INIT
// ===============================
(function safeInit() {

    const accountantSection =
        document.getElementById(
            'accountant-section'
        );

    if (!accountantSection) return;

    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {

        initializeAccountantPage();
    }

})();
