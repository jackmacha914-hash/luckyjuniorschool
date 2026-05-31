```javascript id="xg4l8u"
// ===============================
// CLASS MANAGEMENT
// js/finance/classes.js
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
            'Could not find class select element'
        );

        return;
    }

    try {

        // Reset dropdown
        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // Build grouped classes
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

        console.log('Classes loaded successfully');

        // Enable select
        classSelect.disabled = false;

        // Prevent duplicate listeners
        classSelect.removeEventListener(
            'change',
            handleClassChange
        );

        // Add listener
        classSelect.addEventListener(
            'change',
            handleClassChange
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

    const studentSelect =
        document.getElementById('fee-student-id');

    // Validation
    if (!studentSelect) {

        console.error(
            'Student select element not found'
        );

        return;
    }

    // No class selected
    if (!className) {

        studentSelect.disabled = true;

        studentSelect.innerHTML =
            `<option value="">
                ${APP_MESSAGES.selectClass}
            </option>`;

        return;
    }

    // Loading state
    studentSelect.disabled = true;

    studentSelect.innerHTML =
        `<option value="">
            ${APP_MESSAGES.loadingStudents}
        </option>`;

    try {

        // Token
        const token = getAuthToken();

        if (!token) {
            throw new Error(
                'Authentication token missing'
            );
        }

        // Fetch students
        const response = await fetch(
            `${API_BASE_URL}/students/class/${encodeURIComponent(className)}`,
            {
                method: 'GET',
                headers: getFetchHeaders()
            }
        );

        // HTTP Error
        if (!response.ok) {

            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        // Parse response
        const data = await response.json();

        console.log(
            'Students API Response:',
            data
        );

        // Handle different API formats
        const students = Array.isArray(data)
            ? data
            : (data.data || []);

        // Validation
        if (!Array.isArray(students)) {

            throw new Error(
                'Invalid students data format received from server'
            );
        }

        // Reset select
        studentSelect.innerHTML =
            `<option value="">
                ${APP_MESSAGES.selectStudent}
            </option>`;

        // Empty class
        if (students.length === 0) {

            studentSelect.innerHTML =
                `<option value="">
                    ${APP_MESSAGES.noStudents}
                </option>`;

            return;
        }

        // Add students
        students.forEach(student => {

            try {

                const option =
                    document.createElement('option');

                // Student ID
                option.value =
                    student._id ||
                    student.id ||
                    '';

                // Student name
                const displayName =
                    student.fullName ||
                    student.name ||
                    'Unknown Student';

                // Admission number
                const admissionNumber =
                    student.admissionNumber ||
                    student.admNo ||
                    '';

                // Final display
                option.textContent =
                    admissionNumber
                        ? `${displayName} (${admissionNumber})`
                        : displayName;

                studentSelect.appendChild(option);

            } catch (studentError) {

                console.error(
                    'Error processing student:',
                    student,
                    studentError
                );
            }
        });

        // Enable select
        studentSelect.disabled = false;

        console.log(
            `${students.length} students loaded successfully`
        );

    } catch (error) {

        console.error(
            'Error loading students:',
            error
        );

        // Error state
        studentSelect.innerHTML =
            `<option value="">
                Error loading students
            </option>`;

        // Load fallback mock data
        loadMockStudents(studentSelect);
    }
}

// -------------------------------
// Load Mock Students
// -------------------------------
function loadMockStudents(selectElement) {

    try {

        if (!selectElement) {

            console.error(
                'Select element missing'
            );

            return;
        }

        // Reset select
        selectElement.innerHTML =
            '<option value="">Select a student (using test data)</option>';

        // Use mock students from config
        MOCK_STUDENTS.forEach(student => {

            const option =
                document.createElement('option');

            option.value =
                student.id;

            option.textContent =
                `${student.fullName} (${student.admissionNumber})`;

            selectElement.appendChild(option);
        });

        // Enable dropdown
        selectElement.disabled = false;

        console.log(
            'Loaded mock student data'
        );

    } catch (error) {

        console.error(
            'Error loading mock students:',
            error
        );

        selectElement.innerHTML =
            '<option value="">Error loading test data</option>';
    }
}

// -------------------------------
// Assign Global Functions
// -------------------------------
window.loadClasses = loadClasses;
window.handleClassChange = handleClassChange;
window.loadMockStudents = loadMockStudents;

// -------------------------------
// Classes Loaded
// -------------------------------
console.log(
    'Finance Classes Module Loaded Successfully'
);
```
