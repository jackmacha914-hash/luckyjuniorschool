// Load Classes
function loadClasses() {
    console.log('Loading classes...');

    const classSelect = document.getElementById('fee-class-name');

    if (!classSelect) {
        console.error('Could not find class select element');
        return;
    }

    try {
        classSelect.innerHTML = '<option value="">Select a class</option>';

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

        console.log('Classes loaded successfully');

        classSelect.disabled = false;
        classSelect.addEventListener('change', handleClassChange);

    } catch (error) {
        console.error('Error loading classes:', error);
        classSelect.innerHTML = '<option value="">Error loading classes</option>';
    }
}

// Handle Class Change
async function handleClassChange(event) {
    const classSelect = event.target;
    const className = classSelect.value;
    const studentSelect = document.getElementById('fee-student-id');

    if (!className) {
        studentSelect.disabled = true;
        studentSelect.innerHTML = '<option value="">Select a class first</option>';
        return;
    }

    studentSelect.disabled = true;
    studentSelect.innerHTML = '<option value="">Loading students...</option>';

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(
            `https://luckyjuniorschool.onrender.com/api/students/class/${encodeURIComponent(className)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data);

        const students = Array.isArray(data)
            ? data
            : (data.data || []);

        if (!Array.isArray(students)) {
            throw new Error('Invalid students data format received from server');
        }

        studentSelect.innerHTML = '<option value="">Select a student</option>';

        if (students.length === 0) {
            studentSelect.innerHTML = '<option value="">No students found in this class</option>';
            return;
        }

        students.forEach(student => {
            try {
                const option = document.createElement('option');
                option.value = student._id || student.id || '';

                const displayName = student.fullName || student.name || 'Unknown Student';
                const admissionNumber = student.admissionNumber || student.admNo || '';

                option.textContent = admissionNumber
                    ? `${displayName} (${admissionNumber})`
                    : displayName;

                studentSelect.appendChild(option);

            } catch (studentError) {
                console.error('Error processing student:', student, studentError);
            }
        });

        studentSelect.disabled = false;

    } catch (error) {
        console.error('Error loading students:', error);

        studentSelect.innerHTML =
            '<option value="">Error loading students. Check console for details.</option>';

        loadMockStudents(studentSelect);
    }
}

// Mock Students
function loadMockStudents(selectElement) {
    try {
        const mockStudents = [
            { id: '1', fullName: 'Test Student 1', admissionNumber: 'ADM001' },
            { id: '2', fullName: 'Test Student 2', admissionNumber: 'ADM002' },
            { id: '3', fullName: 'Test Student 3', admissionNumber: 'ADM003' }
        ];

        selectElement.innerHTML =
            '<option value="">Select a student (using test data)</option>';

        mockStudents.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.fullName} (${student.admissionNumber})`;
            selectElement.appendChild(option);
        });

        selectElement.disabled = false;

        console.log('Loaded mock student data');

    } catch (error) {
        console.error('Error loading mock students:', error);
        selectElement.innerHTML = '<option value="">Error loading test data</option>';
    }
}
