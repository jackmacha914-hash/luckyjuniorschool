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

    // -------------------------------
    // STOP DOUBLE INITIALIZATION
    // -------------------------------
    if (form.dataset.initialized === 'true') {

        console.log(
            'Bulk fee form already initialized'
        );

        return;
    }

    form.dataset.initialized = 'true';

    // -------------------------------
    // SUBMIT HANDLER
    // -------------------------------
    form.addEventListener(
        'submit',
        async function handleSubmit(e) {

            e.preventDefault();

            // -------------------------------
            // PREVENT DOUBLE CLICK
            // -------------------------------
            if (form.dataset.submitting === 'true') {
                return;
            }

            form.dataset.submitting = 'true';

            const students =
                window.selectedClassStudents || [];

            const className =
                window.selectedClassName;

            // VALIDATION
            if (!className) {

                form.dataset.submitting = 'false';

                alert('Select a class first');

                return;
            }

            if (!students.length) {

                form.dataset.submitting = 'false';

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

            // IDS ONLY
            const studentIds =
                students.map(s => s._id);

            console.log(
                'Submitting bulk fee data:',
                feeData
            );

            console.log(
                'Student IDs:',
                studentIds
            );

            try {

                const response = await fetch(
                    'https://luckyjuniorschool.onrender.com/api/fees/bulk-create',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':
                                `Bearer ${localStorage.getItem('token')}`
                        },

                        body: JSON.stringify({
                            students: studentIds,
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
                    `Fees added for ${studentIds.length} students`
                );

                form.reset();

                // CLEAR GLOBALS
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
                    err.message || 'Error saving fees'
                );

            } finally {

                form.dataset.submitting = 'false';
            }
        }
    );
}

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
