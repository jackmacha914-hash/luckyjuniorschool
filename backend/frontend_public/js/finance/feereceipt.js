function generateReceipt(paymentData) {
    const receiptWindow = window.open('', '_blank');

    const receiptDate = new Date().toLocaleDateString();
    const receiptTime = new Date().toLocaleTimeString();

    const totalPaid =
        (paymentData.firstInstallment || 0) +
        (paymentData.secondInstallment || 0) +
        (paymentData.thirdInstallment || 0);

    const receiptContent = `YOUR FULL RECEIPT HTML HERE`;

    receiptWindow.document.open();
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
}

function printReceipt(feeId, event) {
    // KEEP YOUR FULL printReceipt FUNCTION HERE EXACTLY AS IT IS
}
