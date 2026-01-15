let cart = JSON.parse(localStorage.getItem('cart')) || [];

const imageBase = 'Images/';

const categories = [
    { img: imageBase + 'Banner Fruits & Vegetables.jpg', text: 'Fruits & Vegetables' },
    { img: imageBase + 'Banner Dairy & Eggs.jpg', text: 'Dairy & Eggs' },
    { img: imageBase + 'Banner Meat & Poultry.jpg', text: 'Meat & Poultry' },
    { img: imageBase + 'Banner Bakery.jpg', text: 'Bakery' },
    { img: imageBase + 'Banner Pantry Staples.jpg', text: 'Pantry Staples' },
    { img: imageBase + 'Banner Beverages.jpg', text: 'Beverages' }
];

let currentCategoryIndex = 0;

function cycleCategories() {
    const category = categories[currentCategoryIndex];
    document.getElementById('category-image').src = category.img;
    document.getElementById('category-text').textContent = category.text;
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = totalQty;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.qty})</span>
            <span>Ksh${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });
    document.getElementById('total-price').textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function changeQty(btn, delta) {
    const qtySpan = btn.parentElement.querySelector('.qty');
    let qty = parseInt(qtySpan.textContent);
    qty += delta;
    if (qty < 1) qty = 1;
    qtySpan.textContent = qty;
}

function addToCart(productName, priceText, btn) {
    const qty = parseInt(btn.previousElementSibling.querySelector('.qty').textContent);
    const price = parseFloat(priceText.replace('Ksh', '').replace(/\/.*/, ''));
    const existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name: productName, price: price, qty: qty });
    }
    updateCartCount();
    updateCartDisplay();
    alert(`${qty} ${productName}(s) added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = 'checkout.html';
    }
}

function generateProducts() {
    const grid = document.querySelector('#products .grid');
    grid.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="quantity-controls">
                <button onclick="changeQty(this, -1)">-</button>
                <span class="qty">1</span>
                <button onclick="changeQty(this, 1)">+</button>
            </div>
            <button onclick="addToCart('${product.name}', '${product.price}', this)">Add to Cart</button>
        `;
        grid.appendChild(productDiv);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    updateCartCount();
    updateCartDisplay();
    generateProducts();

    // Start category cycling
    setInterval(cycleCategories, 3000); // Change every 3 seconds

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});