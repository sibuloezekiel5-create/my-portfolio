const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Setup DB
db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-very-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve dashboard static files
app.use('/dashboard', express.static(path.join(__dirname, '/')));

// API: Receive form submissions
app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body;
    db.run('INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.json({ success: true });
});

// Login
const USERNAME = 'yourusername';
const PASSWORD = 'yourpassword';

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.loggedIn = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Dashboard data (protected)
app.get('/api/submissions', (req, res) => {
    if (!req.session.loggedIn) return res.status(401).json({ error: 'Unauthorized' });
    db.all('SELECT * FROM submissions ORDER BY created_at DESC', [], (err, rows) => {
        res.json(rows);
    });
});

// Dashboard page (protected)
app.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/dashboard-login.html');
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Dashboard login page
app.get('/dashboard-login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard-login.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));