// ===============================
// CLASS MANAGEMENT (BULK VERSION)
// ===============================

// Load Classes (UNCHANGED LOGIC)
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

        classSelect.disabled = false;

        classSelect.removeEventListener('change', handleClassChange);
        classSelect.addEventListener('change', handleClassChange);

        console.log('Classes loaded successfully');

    } catch (error) {
        console.error('Error loading classes:', error);
        classSelect.innerHTML = '<option value="">Error loading classes</option>';
    }
}
