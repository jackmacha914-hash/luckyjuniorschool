```javascript
// ===============================
// FEE FORM MODULE
// js/finance/feeForm.js
// ===============================

// -------------------------------
// Calculate Balance (delegated)
// -------------------------------
function calculateBalance() {
    return window.calculateBalance?.() || 0;
}

// -------------------------------
// Initialize Fee Form
// -------------------------------
function initializeFeeForm() {

    console.log('Initializing fee form');

    // ---------------------------
    // Elements
    // ---------------------------
    const feeForm = document.getElementById('fee-form');
    const classSelect = document.getElementById('fee-class-name');
    const studentSelect = document.getElementById('fee-student-id');

    const totalFeesInput = document.getElementById('fee-fees-per-term');
    const firstInstallmentInput = document.getElementById('fee-first-installment');
    const secondInstallmentInput = document.getElementById('fee-second-installment');
    const thirdInstallmentInput = document.getElementById('fee-third-installment');
    const balanceInput = document.getElementById('fee-bal');
    const dueDateInput = document.getElementById('fee-due-date');

    const academicYearEl = document.getElementById('fee-academic-year');
    const academicTermEl = document.getElementById('fee-academic-term');
    const notesEl = document.getElementById('fee-notes');

    if (!feeForm || !classSelect || !studentSelect) {
        console.error('Required form elements not found');
        return;
    }

    // ---------------------------
    // Default Dates
    // ---------------------------
    const today = new Date().toISOString().split('T')[0];

    if (dueDateInput) dueDateInput.value = today;

    // ---------------------------
    // Class change handler
    // ---------------------------
    classSelect.addEventListener('change', handleClassChange);

    // ---------------------------
    // ONE submit handler ONLY
    // ---------------------------
    feeForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const selectedMode =
            document.querySelector('input[name="fee-mode"]:checked')?.value;

        if (!selectedMode) {
            alert('Please select fee mode (student or class)');
            return;
        }

        // -----------------------
        // Common fee data
        // -----------------------
        const feeData = {
            className: classSelect.value,
            feesPerTerm: parseCurrency(totalFeesInput?.value || 0),
            balance: parseCurrency(balanceInput?.value || 0),
            dueDate: dueDateInput?.value || '',
            academicYear: academicYearEl?.value || '',
            academicTerm: academicTermEl?.value || '',
            notes: notesEl?.value || ''
        };

        // -----------------------
        // STUDENT MODE
        // -----------------------
        if (selectedMode === 'student') {

            feeData.studentId = studentSelect.value;

            if (!feeData.studentId) {
                alert("Please select a student.");
                return;
            }

            try {

                const res = await fetch(
                    `${API_BASE_URL}/fees`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAuthToken()}`
                        },
                        body: JSON.stringify(feeData)
                    }
                );

                if (!res.ok) {
                    throw new Error(await res.text());
                }

                alert("Fee successfully added for student!");

            } catch (err) {

                console.error(err);

                alert("Failed to add fee.");
            }
        }

        // -----------------------
        // CLASS MODE
        // -----------------------
        else {

            try {

                const resStudents = await fetch(
                    `${API_BASE_URL}/students/class/${encodeURIComponent(feeData.className)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${getAuthToken()}`
                        }
                    }
                );

                if (!resStudents.ok) {
                    throw new Error('Failed to load students');
                }

                const students = await resStudents.json();

                const list = Array.isArray(students)
                    ? students
                    : (students.data || []);

                await Promise.all(
                    list.map(async (s) => {

                        const studentFee = {
                            ...feeData,
                            studentId: s._id || s.id
                        };

                        const res = await fetch(
                            `${API_BASE_URL}/fees`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${getAuthToken()}`
                                },
                                body: JSON.stringify(studentFee)
                            }
                        );

                        if (!res.ok) {
                            console.error(
                                `Failed for student ${s.name}`
                            );
                        }
                    })
                );

                alert(
                    `Fees added for ${feeData.className}`
                );

            } catch (err) {

                console.error(err);

                alert("Failed to add class fees.");
            }
        }

        // -----------------------
        // Reset form
        // -----------------------
        feeForm.reset();

        if (studentSelect) {
            studentSelect.innerHTML =
                '<option value="">Select a student</option>';
        }
    });

    // ---------------------------
    // Input listeners
    // ---------------------------
    [totalFeesInput, firstInstallmentInput, secondInstallmentInput, thirdInstallmentInput]
        .forEach(input => {

            if (!input) return;

            input.addEventListener('input', () => {
                calculateBalance();
            });
        });

    console.log('Fee form initialized');
}

// -------------------------------
// Global export
// -------------------------------
window.initializeFeeForm = initializeFeeForm;

// -------------------------------
// Module loaded
// -------------------------------
console.log('Finance FeeForm Module Loaded');
```
