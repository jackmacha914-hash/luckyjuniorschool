// Format Currency
function formatCurrency(amount) {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0.00';

    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Parse Currency
function parseCurrency(value) {
    if (!value) return 0;
    if (typeof value === 'number') return value;

    const numericValue = String(value).replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(numericValue);

    return isNaN(parsed) ? 0 : parsed;
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return new Date(dateString).toLocaleDateString('en-US', options);
}
