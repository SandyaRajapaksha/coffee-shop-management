document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    function renderOrders() {
        ordersTable.innerHTML = '';
        orders.forEach((order, index) => {
            const row = ordersTable.insertRow();
            row.innerHTML = `
                <td>${order.customerName}</td>
                <td>${order.orderDetails}</td>
                <td>${order.orderStatus}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
        });
    }

    function saveOrders() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newOrder = {
            customerName: document.getElementById('customerName').value,
            orderDetails: document.getElementById('orderDetails').value,
            orderStatus: document.getElementById('orderStatus').value
        };

        orders.push(newOrder);
        saveOrders();
        renderOrders();
        orderForm.reset();
    });

    ordersTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            orders.splice(index, 1);
            saveOrders();
            renderOrders();
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const order = orders[index];

            document.getElementById('customerName').value = order.customerName;
            document.getElementById('orderDetails').value = order.orderDetails;
            document.getElementById('orderStatus').value = order.orderStatus;

            orders.splice(index, 1);
            saveOrders();
            renderOrders();
        }
    });

    renderOrders();
});
