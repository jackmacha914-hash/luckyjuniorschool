// ===============================
// CLASS MANAGEMENT (BULK VERSION)
// ===============================

// -------------------------------
// Load Classes
// -------------------------------
function loadClasses() {

    console.log('Loading classes...');

    const classSelect =
        document.getElementById('fee-class-name');

    if (!classSelect) {

        console.error(
            'Could not find fee-class-name element'
        );

        return;
    }

    try {

        // RESET
        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // POPULATE
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
    `https://luckyjuniorschool.onrender.com/api/students`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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
            'FULL API RESULT:',
            result
        );

        console.log(
            'RESULT TYPE:',
            typeof result
        );

        console.log(
            'RESULT KEYS:',
            Object.keys(result)
        );

        console.log(
            'ENTIRE RESPONSE:',
            JSON.stringify(result, null, 2)
        );

        // GET STUDENTS ARRAY
        let students = [];

        if (Array.isArray(result)) {

            students = result;

        } else if (Array.isArray(result.data)) {

            students = result.data;

        } else if (Array.isArray(result.students)) {

            students = result.students;
        }

        // FILTER BY CLASS
        students = students.filter(student => {

            return (
                student.class === selectedClass ||
                student.className === selectedClass ||
                student.grade === selectedClass
            );
        });

        // SAVE GLOBALLY
        window.selectedClassStudents =
            students;

        console.log(
            'FILTERED STUDENTS:',
            students
        );

        console.log(
            `Loaded ${students.length} students`
        );

        // SUCCESS MESSAGE
        alert(
            `${students.length} students loaded`
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
