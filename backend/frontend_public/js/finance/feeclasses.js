// ===============================
// CLASS MANAGEMENT (BULK VERSION)
// ===============================

// Load Classes
function loadClasses() {

    console.log('Loading classes...');

    // UPDATED ID
    const classSelect = document.getElementById('bulk-fee-class');

    if (!classSelect) {
        console.error('Could not find class select element');
        return;
    }

    try {

        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        CLASS_GROUPS.forEach(group => {

            const optgroup = document.createElement('optgroup');
            optgroup.label = group.label;

            group.classes.forEach(cls => {

                const option = document.createElement('option');

                option.value = cls.value;
                option.textContent = cls.text;

                optgroup.appendChild(option);
            });

            classSelect.appendChild(optgroup);
        });

        classSelect.disabled = false;

        // REMOVE OLD EVENT
        classSelect.removeEventListener('change', handleClassChange);

        // ADD NEW EVENT
        classSelect.addEventListener('change', async function () {

            const selectedClass = this.value;

            if (!selectedClass) return;

            try {

                // SAVE CLASS GLOBALLY
                window.selectedClassName = selectedClass;

                const response = await fetch(
                    `${API_BASE_URL}/students/class/${selectedClass}`,
                    {
                        headers: getFetchHeaders()
                    }
                );

                const result = await response.json();

                console.log('API Response:', result);

                if (result.success) {

                    // SAVE STUDENTS GLOBALLY
                    window.selectedClassStudents = result.data;

                    console.log(
                        'Students loaded:',
                        window.selectedClassStudents.length
                    );

                } else {

                    window.selectedClassStudents = [];

                    alert('No students found');
                }

            } catch (error) {

                console.error('Error loading students:', error);

                window.selectedClassStudents = [];

                alert('Failed to load students');
            }
        });

        console.log('Classes loaded successfully');

    } catch (error) {

        console.error('Error loading classes:', error);

        classSelect.innerHTML =
            '<option value="">Error loading classes</option>';
    }
}
