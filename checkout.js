let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
            <img src="${getProductImg(item.name)}" alt="${item.name}" style="width: 50px; height: 50px;">
            <span>${item.name}</span>
            <span>Qty: ${item.qty}</span>
            <span>Price: Ksh${item.price.toFixed(2)}</span>
            <span>Total: Ksh${itemTotal.toFixed(2)}</span>
        `;
        checkoutItems.appendChild(itemDiv);
    });
    document.getElementById('checkout-total-price').textContent = total.toFixed(2);
}

function getProductImg(name) {
    const product = products.find(p => p.name === name);
    return product ? product.img : '';
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'Online Grocery Store.html';
});

// Load products and display
document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutItems();
});