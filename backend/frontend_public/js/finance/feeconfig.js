```javascript
// ===============================
// CONFIGURATION FILE
// js/finance/config.js
// ===============================

// -------------------------------
// Global DOM Elements
// -------------------------------
window.feeForm = document.getElementById('fee-form');
window.feeList = document.getElementById('fee-list');
window.feeSearch = document.getElementById('fees-search');

// -------------------------------
// API Configuration
// -------------------------------
const API_BASE_URL = 'https://luckyjuniorschool.onrender.com/api';

// -------------------------------
// Authentication
// -------------------------------
function getAuthToken() {
    return localStorage.getItem('token');
}

// -------------------------------
// Global Helper Functions
// These are assigned later after
// functions are declared in other files
// -------------------------------
window.loadClasses = null;
window.handleClassChange = null;
window.calculateBalance = null;
window.loadFeeRecords = null;
window.printReceipt = null;
window.viewFeeDetails = null;

// -------------------------------
// Currency Configuration
// -------------------------------
const CURRENCY = 'KES';
const LOCALE = 'en-US';

// -------------------------------
// Default Messages
// -------------------------------
const APP_MESSAGES = {
    loadingStudents: 'Loading students...',
    noStudents: 'No students found in this class',
    selectClass: 'Select a class first',
    selectStudent: 'Select a student',
    loadingRecords: 'Loading fee records...',
    noRecords: 'No fee records found',
    saveSuccess: 'Fee record saved successfully',
    saveError: 'Failed to save fee record',
    networkError: 'Unable to connect to the server'
};

// -------------------------------
// Fee Status
// -------------------------------
const FEE_STATUS = {
    PAID: 'Paid',
    PENDING: 'Pending'
};

// -------------------------------
// Receipt Configuration
// -------------------------------
const RECEIPT_CONFIG = {
    schoolName: 'Lucky Junior School',
    footerMessage: 'Thank you for your payment!',
    supportMessage: 'For any inquiries, please contact the school office.'
};

// -------------------------------
// Default Date Values
// -------------------------------
const TODAY = new Date().toISOString().split('T')[0];

// -------------------------------
// Academic Terms
// -------------------------------
const ACADEMIC_TERMS = [
    'Term 1',
    'Term 2',
    'Term 3'
];

// -------------------------------
// Class Structure
// -------------------------------
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

// -------------------------------
// Mock Students (Fallback)
// -------------------------------
const MOCK_STUDENTS = [
    {
        id: '1',
        fullName: 'Test Student 1',
        admissionNumber: 'ADM001'
    },
    {
        id: '2',
        fullName: 'Test Student 2',
        admissionNumber: 'ADM002'
    },
    {
        id: '3',
        fullName: 'Test Student 3',
        admissionNumber: 'ADM003'
    }
];

// -------------------------------
// Default Fetch Headers
// -------------------------------
function getFetchHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    };
}

// -------------------------------
// Console Startup Log
// -------------------------------
console.log('Finance Config Loaded Successfully');
```
