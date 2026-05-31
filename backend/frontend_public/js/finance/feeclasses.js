// ===============================
// CLASS MANAGEMENT (BULK VERSION)
// ===============================

// -------------------------------
// Load Classes
// -------------------------------
function loadClasses() {

    console.log('Loading classes...');

    // BULK CLASS DROPDOWN
    const classSelect =
        document.getElementById('fee-class-name');

    if (!classSelect) {

        console.error(
            'Could not find bulk-fee-class element'
        );

        return;
    }

    try {

        // RESET
        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // POPULATE CLASSES
        CLASS_GROUPS.forEach(group => {

            const optgroup =
                document.createElement('optgroup');

            optgroup.label =
                group.label;

            group.classes.forEach(cls => {

                const option =
                    document.createElement('option');

                option.value =
                    cls.value;

                option.textContent =
                    cls.text;

                optgroup.appendChild(option);
            });

            classSelect.appendChild(optgroup);
        });

        // ENABLE
        classSelect.disabled = false;

        // REMOVE OLD LISTENER
        classSelect.removeEventListener(
            'change',
            handleBulkClassChange
        );

        // ADD NEW LISTENER
        classSelect.addEventListener(
            'change',
            handleBulkClassChange
        );

        console.log(
            'Classes loaded successfully'
        );

    } catch (error) {

        console.error(
            'Error loading classes:',
            error
        );

        classSelect.innerHTML =
            '<option value="">Error loading classes</option>';
    }
}

// -------------------------------
// Handle Class Change
// -------------------------------
async function handleBulkClassChange(event) {

    const selectedClass =
        event.target.value;

    // RESET
    window.selectedClassStudents = [];
    window.selectedClassName = '';

    if (!selectedClass) {
        return;
    }

    try {

        console.log(
            'Loading students for:',
            selectedClass
        );

        // SAVE CLASS
        window.selectedClassName =
            selectedClass;

        // FETCH STUDENTS
        const response = await fetch(
            `${API_BASE_URL}/students/class/${encodeURIComponent(selectedClass)}`,
            {
                method: 'GET',
                headers: getFetchHeaders()
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error ${response.status}`
            );
        }

        // RESPONSE
        const result =
            await response.json();

        console.log(
            'API Response:',
            result
        );

        // STUDENTS ARRAY
        const students =
            Array.isArray(result)
                ? result
                : (result.data || []);

        // SAVE GLOBALLY
        window.selectedClassStudents =
            students;

        console.log(
            `Loaded ${students.length} students`
        );

    } catch (error) {

        console.error(
            'Error loading students:',
            error
        );

        window.selectedClassStudents = [];
        window.selectedClassName = '';

        alert(
            'Failed to load students'
        );
    }
}

// -------------------------------
// GLOBAL ACCESS
// -------------------------------
window.loadClasses =
    loadClasses;

window.handleBulkClassChange =
    handleBulkClassChange;

// -------------------------------
// AUTO LOAD
// -------------------------------
document.addEventListener(
    'DOMContentLoaded',
    () => {

        console.log(
            'Bulk fee page ready'
        );

        loadClasses();
    }
);

// -------------------------------
// MODULE LOADED
// -------------------------------
console.log(
    'Bulk Fee Class Module Loaded'
);
