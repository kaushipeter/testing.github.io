document.addEventListener('DOMContentLoaded', function() {
    fetch('medicine.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('medicines-container');
            Object.keys(data).forEach(category => {
                const categoryHeader = document.createElement('h2');
                categoryHeader.innerText = category.charAt(0).toUpperCase() + category.slice(1);
                container.appendChild(categoryHeader);
                
                data[category].forEach(medicine => {
                    const item = document.createElement('div');
                    item.className = 'medicine-item';

                    const img = document.createElement('img');
                    img.src = medicine.image;
                    img.alt = medicine.name;
                    img.className = 'medicine-img';

                    const name = document.createElement('div');
                    name.className = 'medicine-name';
                    name.innerText = medicine.name;

                    const price = document.createElement('div');
                    price.className = 'medicine-price';
                    price.innerText = `$${medicine.price}`;

                    const quantityInput = document.createElement('input');
                    quantityInput.type = 'number';
                    quantityInput.placeholder = 'Qty';
                    quantityInput.min = 0;
                    quantityInput.className = 'quantity-input';
                    quantityInput.dataset.price = medicine.price;

                    item.appendChild(img);
                    item.appendChild(name);
                    item.appendChild(price);
                    item.appendChild(quantityInput);
                    container.appendChild(item);
                });
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    document.getElementById('add-to-table').addEventListener('click', function() {
        const selectedMedicines = [];
        const container = document.getElementById('medicines-container');
        const items = container.getElementsByClassName('medicine-item');
        
        Array.from(items).forEach(item => {
            const name = item.querySelector('.medicine-name').innerText;
            const price = parseFloat(item.querySelector('.medicine-price').innerText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity-input').value) || 0;

            if (quantity > 0) {
                selectedMedicines.push({ name, price, quantity });
                item.querySelector('.quantity-input').value = '';
            }
        });

        appendMedicinesToTable(selectedMedicines);
    });

    function appendMedicinesToTable(medicines) {
        const tableBody = document.getElementById('selected-medicines').getElementsByTagName('tbody')[0];
        let grandTotal = parseFloat(document.getElementById('grand-total').innerText.replace('$', '')) || 0;

        medicines.forEach(medicine => {
            let existingRow = Array.from(tableBody.getElementsByTagName('tr')).find(row => row.cells[0].innerText === medicine.name);
            
            if (existingRow) {
                let quantityCell = existingRow.cells[2];
                let totalCell = existingRow.cells[3];
                
                let newQuantity = parseInt(quantityCell.innerText) + medicine.quantity;
                quantityCell.innerText = newQuantity;
                
                let newTotal = medicine.price * newQuantity;
                grandTotal += medicine.price * medicine.quantity;
                totalCell.innerText = `$${newTotal.toFixed(2)}`;
            } else {
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

                const actionCell = document.createElement('td');
                const clearButton = document.createElement('button');
                clearButton.className = 'clear-button';
                clearButton.innerText = 'Clear';
                clearButton.addEventListener('click', () => {
                    row.remove();
                    updateGrandTotal();
                });

                actionCell.appendChild(clearButton);
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                row.appendChild(quantityCell);
                row.appendChild(totalCell);
                row.appendChild(actionCell);

                tableBody.appendChild(row);
            }
        });

        document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
    }

    function updateGrandTotal() {
        const tableBody = document.getElementById('selected-medicines').getElementsByTagName('tbody')[0];
        let grandTotal = 0;

        Array.from(tableBody.getElementsByTagName('tr')).forEach(row => {
            const totalCell = row.cells[3];
            grandTotal += parseFloat(totalCell.innerText.replace('$', ''));
        });

        document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
    }

    document.getElementById('add-to-favorites').addEventListener('click', function() {
        const tableBody = document.getElementById('selected-medicines').getElementsByTagName('tbody')[0];
        const favoriteMedicines = [];
        
        Array.from(tableBody.getElementsByTagName('tr')).forEach(row => {
            const name = row.cells[0].innerText;
            const price = parseFloat(row.cells[1].innerText.replace('$', ''));
            const quantity = parseInt(row.cells[2].innerText);
            favoriteMedicines.push({ name, price, quantity });
        });

        localStorage.setItem('favoriteMedicines', JSON.stringify(favoriteMedicines));
        alert('Favorites saved!');
    });

    document.getElementById('apply-favorites').addEventListener('click', function() {
        const favoriteMedicines = JSON.parse(localStorage.getItem('favoriteMedicines')) || [];
        appendMedicinesToTable(favoriteMedicines);
    });

    document.getElementById('buy-now').addEventListener('click', function() {
        const tableBody = document.getElementById('selected-medicines').getElementsByTagName('tbody')[0];
        const selectedMedicines = [];
    
        Array.from(tableBody.getElementsByTagName('tr')).forEach(row => {
            const name = row.cells[0].innerText;
            const price = parseFloat(row.cells[1].innerText.replace('$', ''));
            const quantity = parseInt(row.cells[2].innerText);
            selectedMedicines.push({ name, price, quantity });
        });
    
        if (selectedMedicines.length === 0) {
            alert('No items in the table. Please add some medicines before proceeding.');
        } else {
            localStorage.setItem('selectedMedicines', JSON.stringify(selectedMedicines));
            window.location.href = 'payment.html';
        }
    });
    
});
