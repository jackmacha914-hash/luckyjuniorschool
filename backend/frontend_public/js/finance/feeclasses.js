// ===============================
// CLASS MANAGEMENT (BULK VERSION)
// ===============================

// -------------------------------
// Load Classes
// -------------------------------
function loadClasses() {

    console.log('Loading classes...');

    // NEW ID
    const classSelect =
        document.getElementById('bulk-fee-class');

    if (!classSelect) {

        console.error(
            'Could not find class select element'
        );

        return;
    }

    try {

        // Reset dropdown
        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // Populate classes
        CLASS_GROUPS.forEach(group => {

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

        // Prevent duplicate listeners
        classSelect.removeEventListener(
            'change',
            handleClassChange
        );

        // Listen for class change
        classSelect.addEventListener(
            'change',
            handleClassChange
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
async function handleClassChange(event) {

    const classSelect = event.target;

    const className =
        classSelect.value;

    // SAVE SELECTED CLASS
    window.selectedClassName =
        className;

    // Reset students
    window.selectedClassStudents = [];

    if (!className) {
        return;
    }

    try {

        console.log(
            'Loading students for:',
            className
        );

        // Fetch students
        const response = await fetch(
            `${API_BASE_URL}/students/class/${encodeURIComponent(className)}`,
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

        const data =
            await response.json();

        console.log(
            'Students API Response:',
            data
        );

        // Extract students
        const students =
            Array.isArray(data)
                ? data
                : (data.data || []);

        // SAVE STUDENTS
        window.selectedClassStudents =
            students;

        console.log(
            `${students.length} students loaded`
        );

    } catch (error) {

        console.error(
            'Error loading students:',
            error
        );

        alert(
            'Failed to load students'
        );
    }
}

// -------------------------------
// Global Access
// -------------------------------
window.loadClasses =
    loadClasses;

window.handleClassChange =
    handleClassChange;

// -------------------------------
// Module Loaded
// -------------------------------
console.log(
    'Bulk Class Module Loaded'
);
