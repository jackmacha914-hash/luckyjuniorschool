// Global Elements
window.feeForm = document.getElementById('fee-form');
window.feeList = document.getElementById('fee-list');
window.feeSearch = document.getElementById('fees-search');

// Global Functions
window.loadClasses = loadClasses;
window.handleClassChange = handleClassChange;
window.calculateBalance = calculateBalance;

// Class Structure
const CLASS_GROUPS = [
    {
        label: 'Pre-Primary',
        classes: [
            { value: 'Baby Class', text: 'Baby Class' },
            { value: 'Pre-primary 1 (pp1)', text: 'PP1 (Pre-Primary 1)' },
            { value: 'Pre-primary 2 (pp2)', text: 'PP2 (Pre-Primary 2)' }
        ]
    },
    {
        label: 'Lower Primary (Grade 1-3)',
        classes: [
            { value: 'Grade 1', text: 'Grade 1' },
            { value: 'Grade 2', text: 'Grade 2' },
            { value: 'Grade 3', text: 'Grade 3' }
        ]
    },
    {
        label: 'Upper Primary (Grade 4-6)',
        classes: [
            { value: 'Grade 4', text: 'Grade 4' },
            { value: 'Grade 5', text: 'Grade 5' },
            { value: 'Grade 6', text: 'Grade 6' }
        ]
    },
    {
        label: 'Junior Secondary (Grade 7-9)',
        classes: [
            { value: 'Grade 7', text: 'Grade 7' },
            { value: 'Grade 8', text: 'Grade 8' },
            { value: 'Grade 9', text: 'Grade 9' }
        ]
    },
    {
        label: 'Senior School (Grade 10-12)',
        classes: [
            { value: 'Grade 10', text: 'Grade 10' },
            { value: 'Grade 11', text: 'Grade 11' },
            { value: 'Grade 12', text: 'Grade 12' }
        ]
    }
];
