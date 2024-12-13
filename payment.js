document.addEventListener('DOMContentLoaded', function() {
    const selectedMedicines = JSON.parse(localStorage.getItem('selectedMedicines')) || [];
    const tableBody = document.getElementById('checkout-medicines').getElementsByTagName('tbody')[0];
    let grandTotal = 0;

    selectedMedicines.forEach(medicine => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.innerText = medicine.name;
        
        const priceCell = document.createElement('td');
        priceCell.innerText = `$${medicine.price}`;
        
        const quantityCell = document.createElement('td');
        quantityCell.innerText = medicine.quantity;
        
        const totalCell = document.createElement('td');
        const total = medicine.price * medicine.quantity;
        totalCell.innerText = `$${total.toFixed(2)}`;

        grandTotal += total;
        
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        
        tableBody.appendChild(row);
    });

    document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
});





// Sample array to represent user's favorite medicines
// Replace this with actual data integration if needed
const favoriteMedicines = [
    { name: "Paracetamol", price: 10 },
    { name: "Ibuprofen", price: 15 },
    { name: "Cough Syrup", price: 8 }
];

// Function to update the order summary
function updateOrderSummary() {
    const orderSummaryDiv = document.getElementById("order-summary");
    const totalPriceElement = document.getElementById("total-price");

    // Clear existing content in the order summary
    orderSummaryDiv.innerHTML = "";

    let total = 0;

    // Dynamically add medicines to the order summary
    favoriteMedicines.forEach((medicine) => {
        const medicineElement = document.createElement("div");
        medicineElement.textContent = `${medicine.name} - $${medicine.price}`;
        orderSummaryDiv.appendChild(medicineElement);

        // Calculate the total price
        total += medicine.price;
    });

    // Update the total price
    totalPriceElement.textContent = total.toFixed(2);
}

// Call the function to populate the order summary on page load
document.addEventListener("DOMContentLoaded", updateOrderSummary);

// Submit event for the payment form
const paymentForm = document.getElementById("payment-form");
paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect payment details
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const addressLine1 = document.getElementById("address-line1").value;
    const addressLine2 = document.getElementById("address-line2").value;
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postal-code").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    // Placeholder for processing payment (e.g., send data to server)
    console.log("Processing Payment with the following details:");
    console.log({
        fullName,
        email,
        phone,
        address: `${addressLine1}, ${addressLine2}, ${city}, ${postalCode}`,
        paymentMethod,
        cardDetails: { cardNumber, expiryDate, cvv }
    });

    // Show confirmation or redirect (placeholder logic)
    alert("Payment processed successfully!");
    paymentForm.reset();
});
