const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images, etc.)
app.use('/images', express.static(path.join(__dirname, 'Images')));

// In-memory data storage (in production, use a database)
let products = [
    { id: 1, name: 'Organic Apples', price: 30, unit: 'each', image: 'images/organic-apples.jpg', category: 'Fruits & Vegetables' },
    { id: 2, name: 'Fresh Milk', price: 280, unit: 'gallon', image: 'images/Fresh-Milk.jpg', category: 'Dairy & Eggs' },
    { id: 3, name: 'Loaf of Bread', price: 120, unit: 'loaf', image: 'images/Loaf.jpg', category: 'Bakery' },
    { id: 4, name: 'Red Tomatoes', price: 10, unit: 'each', image: 'images/Tomatoes.jpg', category: 'Fruits & Vegetables' },
    { id: 5, name: 'Beef', price: 600, unit: 'kg', image: 'images/Beef.jpg', category: 'Meat & Poultry' },
    { id: 6, name: 'Organic Spinach', price: 30, unit: 'bunch', image: 'images/Organic-Spinach.jpg', category: 'Fruits & Vegetables' },
    { id: 7, name: 'Oranges', price: 20, unit: 'each', image: 'images/Oranges.jpg', category: 'Fruits & Vegetables' },
    { id: 8, name: 'Watermelon', price: 65, unit: 'kg', image: 'images/Watermelon.jpg', category: 'Fruits & Vegetables' },
    { id: 9, name: 'Onions', price: 100, unit: 'kg', image: 'images/Onions.jpg', category: 'Fruits & Vegetables' },
    { id: 10, name: 'Whipping Cream', price: 700, unit: 'litre', image: 'images/Whipping Cream.jpg', category: 'Dairy & Eggs' },
    { id: 11, name: 'Beetroot Vegetable', price: 200, unit: 'kg', image: 'images/Beetroot Vegetable.jpg', category: 'Fruits & Vegetables' },
    { id: 12, name: 'Green Peas', price: 250, unit: 'kg', image: 'images/Green Peas.jpg', category: 'Fruits & Vegetables' },
    { id: 13, name: 'Cassava', price: 120, unit: 'kg', image: 'images/Cassava.jpg', category: 'Fruits & Vegetables' },
    { id: 14, name: 'Bell Pepper', price: 200, unit: 'kg', image: 'images/Bell Pepper.jpg', category: 'Fruits & Vegetables' },
    { id: 15, name: 'Wheat grains', price: 55, unit: 'kg', image: 'images/Wheat grains.jpg', category: 'Pantry Staples' },
    { id: 16, name: 'Pinapples', price: 150, unit: 'each', image: 'images/Pinapples.jpg', category: 'Fruits & Vegetables' },
    { id: 17, name: 'Cheese', price: 1500, unit: 'kg', image: 'images/Cheese.jpg', category: 'Dairy & Eggs' },
    { id: 18, name: 'Bananas', price: 120, unit: 'bunch', image: 'images/Bananas.jpg', category: 'Fruits & Vegetables' },
    { id: 19, name: 'African nightshade', price: 40, unit: 'bunch', image: 'images/African nightshade.jpg', category: 'Fruits & Vegetables' },
    { id: 20, name: 'Oats', price: 500, unit: 'kg', image: 'images/Oats.jpg', category: 'Pantry Staples' },
    { id: 21, name: 'Eggs', price: 180, unit: 'dozen', image: 'images/Dozen-Eggs.jpg', category: 'Dairy & Eggs' },
    { id: 22, name: 'Grapes', price: 0.86, unit: 'grams', image: 'images/Grapes.jpg', category: 'Fruits & Vegetables' },
    { id: 23, name: 'Chicken', price: 500, unit: 'kg', image: 'images/Chicken.jpg', category: 'Meat & Poultry' },
    { id: 24, name: 'Mangoes', price: 1.8, unit: 'g', image: 'images/Mangoes.jpg', category: 'Fruits & Vegetables' },
    { id: 25, name: 'Chili Pepper', price: 80, unit: 'kg', image: 'images/Chilli Pepper.jpg', category: 'Fruits & Vegetables' },
    { id: 26, name: 'Okra', price: 420, unit: 'kg', image: 'images/Okra.jpg', category: 'Fruits & Vegetables' },
    { id: 27, name: 'Pawpaw', price: 60, unit: 'each', image: 'images/Pawpaw.jpg', category: 'Fruits & Vegetables' },
    { id: 28, name: 'Rice', price: 150, unit: 'kg', image: 'images/Rice grains.jpg', category: 'Pantry Staples' },
    { id: 29, name: 'Pork', price: 750, unit: 'kg', image: 'images/Pork.jpg', category: 'Meat & Poultry' },
    { id: 30, name: 'Kale', price: 30, unit: 'bunch', image: 'images/Kale.jpg', category: 'Fruits & Vegetables' },
    { id: 31, name: 'Butter', price: 1500, unit: 'kg', image: 'images/Butter.jpg', category: 'Dairy & Eggs' },
    { id: 32, name: 'Sweet Potatoes', price: 150, unit: 'kg', image: 'images/Sweet Potatoes.jpg', category: 'Fruits & Vegetables' },
    { id: 33, name: 'Jute Mallow', price: 40, unit: 'bunch', image: 'images/Jute Mallow.jpg', category: 'Fruits & Vegetables' },
    { id: 34, name: 'Lamb', price: 1000, unit: 'kg', image: 'images/Lamb.jpg', category: 'Meat & Poultry' },
    { id: 35, name: 'Green Beans', price: 250, unit: 'kg', image: 'images/Green Beans.jpg', category: 'Fruits & Vegetables' }
];

let orders = [];
let users = []; // Simple user storage

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
    const categoryProducts = products.filter(p => p.category.toLowerCase() === req.params.category.toLowerCase());
    res.json(categoryProducts);
});

// User registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = { id: users.length + 1, username, email, password };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
});

// User login (simple, no JWT for this example)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', userId: user.id, username: user.username });
});

// Create order
app.post('/api/orders', (req, res) => {
    const { userId, items, total } = req.body;
    const order = {
        id: orders.length + 1,
        userId,
        items,
        total,
        status: 'pending',
        date: new Date()
    };
    orders.push(order);
    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
});

// Get orders for a user
app.get('/api/orders/:userId', (req, res) => {
    const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
    res.json(userOrders);
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    // In a real app, you'd save this to a database or send an email
    console.log('Contact form submission:', { name, email, message });
    res.json({ message: 'Message sent successfully' });
});

// Admin routes (simple, no auth for this example)

// Add product
app.post('/api/admin/products', (req, res) => {
    const { name, price, unit, image, category } = req.body;
    const product = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        unit,
        image,
        category
    };
    products.push(product);
    res.status(201).json({ message: 'Product added successfully', product });
});

// Update product
app.put('/api/admin/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, price, unit, image, category } = req.body;
    if (name) product.name = name;
    if (price) product.price = parseFloat(price);
    if (unit) product.unit = unit;
    if (image) product.image = image;
    if (category) product.category = category;

    res.json({ message: 'Product updated successfully', product });
});

// Delete product
app.delete('/api/admin/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
});

// Get all orders
app.get('/api/admin/orders', (req, res) => {
    res.json(orders);
});

// Update order status
app.put('/api/admin/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const { status } = req.body;
    order.status = status;
    res.json({ message: 'Order status updated', order });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});