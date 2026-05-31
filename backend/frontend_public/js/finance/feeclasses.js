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
        console.error('Could not find class select element');
        return;
    }

    // ✅ SAFE GLOBAL ACCESS
    const groups = window.CLASS_GROUPS;

    if (!groups) {
        console.error('CLASS_GROUPS not found in config.js');
        classSelect.innerHTML =
            '<option value="">Configuration error</option>';
        return;
    }

    try {

        // Reset dropdown
        classSelect.innerHTML =
            '<option value="">Select a class</option>';

        // Build grouped classes
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

        console.log('Classes loaded successfully');

        classSelect.disabled = false;

        // ✅ FIX: avoid duplicate listeners safely
        classSelect.onchange = handleClassChange;

    } catch (error) {

        console.error('Error loading classes:', error);

        classSelect.innerHTML =
            '<option value="">Error loading classes</option>';
    }
}

// -------------------------------
// Handle Class Change
// -------------------------------
async function handleClassChange(event) {

    const classSelect = event.target;
    const className = classSelect.value;

    const studentSelect =
        document.getElementById('fee-student-id');

    if (!studentSelect) {
        console.error('Student select element not found');
        return;
    }

    const messages = window.APP_MESSAGES || {
        selectClass: 'Select a class first',
        loadingStudents: 'Loading students...',
        selectStudent: 'Select a student',
        noStudents: 'No students found'
    };

    if (!className) {

        studentSelect.disabled = true;

        studentSelect.innerHTML =
            `<option value="">${messages.selectClass}</option>`;

        return;
    }

    studentSelect.disabled = true;

    studentSelect.innerHTML =
        `<option value="">${messages.loadingStudents}</option>`;

    try {

        const token = getAuthToken();

        if (!token) {
            throw new Error('Authentication token missing');
        }

        const response = await fetch(
            `${API_BASE_URL}/students/class/${encodeURIComponent(className)}`,
            {
                method: 'GET',
                headers: getFetchHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Students API Response:', data);

        const students = Array.isArray(data)
            ? data
            : (data.data || []);

        if (!Array.isArray(students)) {
            throw new Error('Invalid students data format');
        }

        studentSelect.innerHTML =
            `<option value="">${messages.selectStudent}</option>`;

        if (students.length === 0) {

            studentSelect.innerHTML =
                `<option value="">${messages.noStudents}</option>`;

            return;
        }

        students.forEach(student => {

            try {

                const option =
                    document.createElement('option');

                option.value =
                    student._id || student.id || '';

                const name =
                    student.fullName ||
                    student.name ||
                    'Unknown Student';

                const adm =
                    student.admissionNumber ||
                    student.admNo ||
                    '';

                option.textContent =
                    adm ? `${name} (${adm})` : name;

                studentSelect.appendChild(option);

            } catch (err) {
                console.error('Student parse error:', err);
            }
        });

        studentSelect.disabled = false;

        console.log(`${students.length} students loaded`);

    } catch (error) {

        console.error('Error loading students:', error);

        studentSelect.innerHTML =
            `<option value="">Error loading students</option>`;

        loadMockStudents(studentSelect);
    }
}

// -------------------------------
// Load Mock Students
// -------------------------------
function loadMockStudents(selectElement) {

    if (!selectElement) {
        console.error('Select element missing');
        return;
    }

    try {

        const mock = window.MOCK_STUDENTS || [];

        selectElement.innerHTML =
            '<option value="">Select a student (test data)</option>';

        mock.forEach(student => {

            const option = document.createElement('option');

            option.value = student.id;

            option.textContent =
                `${student.fullName} (${student.admissionNumber})`;

            selectElement.appendChild(option);
        });

        selectElement.disabled = false;

        console.log('Mock students loaded');

    } catch (error) {

        console.error('Mock load error:', error);

        selectElement.innerHTML =
            '<option value="">Error loading test data</option>';
    }
}

// -------------------------------
// Global Exposure
// -------------------------------
window.loadClasses = loadClasses;
window.handleClassChange = handleClassChange;
window.loadMockStudents = loadMockStudents;

console.log('Finance Classes Module Loaded Successfully');
