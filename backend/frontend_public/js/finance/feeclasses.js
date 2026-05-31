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
        console.error('Could not find fee-class-name element');
        return;
    }

    try {

        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // SAFE CHECK (prevents crash)
        const groups = window.CLASS_GROUPS || [];

        groups.forEach(group => {

            const optgroup =
                document.createElement('optgroup');

            optgroup.label = group.label;

            group.classes.forEach(cls => {

                const option =
                    document.createElement('option');

                option.value = cls.value;
                option.textContent = cls.text;

                optgroup.appendChild(option);
            });

            classSelect.appendChild(optgroup);
        });

        classSelect.disabled = false;

        classSelect.removeEventListener(
            'change',
            handleBulkClassChange
        );

        classSelect.addEventListener(
            'change',
            handleBulkClassChange
        );

        console.log('Classes loaded successfully');

    } catch (error) {

        console.error('Error loading classes:', error);

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

    window.selectedClassStudents = [];
    window.selectedClassName = '';

    if (!selectedClass) return;

    try {

        console.log('Loading students for:', selectedClass);

        window.selectedClassName = selectedClass;

        // ✅ FIXED: backend filtered endpoint (BEST PRACTICE)
        const response = await fetch(
            `https://luckyjuniorschool.onrender.com/api/students/class/${encodeURIComponent(selectedClass)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        const result = await response.json();

        console.log('FULL API RESULT:', result);

        // ✅ ALWAYS NORMALIZE DATA SAFELY
        const students =
            Array.isArray(result)
                ? result
                : (result.data || result.students || []);

        window.selectedClassStudents = students;

        console.log('FILTERED STUDENTS:', students);
        console.log(`Loaded ${students.length} students`);

        // ❌ removed alert (too noisy)
        console.log(`${students.length} students loaded`);

    } catch (error) {

        console.error('Error loading students:', error);

        window.selectedClassStudents = [];
        window.selectedClassName = '';
    }
}

// -------------------------------
// GLOBAL ACCESS
// -------------------------------
window.loadClasses = loadClasses;
window.handleBulkClassChange = handleBulkClassChange;

// -------------------------------
// AUTO LOAD
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bulk fee page ready');
    loadClasses();
});

// -------------------------------
// MODULE LOADED
// -------------------------------
console.log('Bulk Fee Class Module Loaded');
