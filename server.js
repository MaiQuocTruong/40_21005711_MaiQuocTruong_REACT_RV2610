// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
    }
});

const upload = multer({ storage });

// MySQL connection setup
const db = mysql.createConnection({
    host: '127.0.0.1',  // or 'localhost'
    port: 3306,          // default MySQL port
    user: 'root',        // your MySQL root username
    password: '123456789',  // replace 'your_password' with your actual root password
    database: 'category_location'   // replace 'your_database' with the name of your database
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Endpoint to fetch categories
app.get('/category', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint to fetch locations
app.get('/location', (req, res) => {
    const query = 'SELECT * FROM location';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint to handle login
app.post('/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM Account WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            res.json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Endpoint to handle user registration with image upload
app.post('/register', upload.single('avatar'), (req, res) => {
    const { username, password } = req.body;
    const avatar = req.file ? req.file.filename : null; // Get the uploaded file's name

    // Check if username already exists
    const checkQuery = 'SELECT * FROM Account WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (result.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Insert user into the database
        const insertQuery = 'INSERT INTO Account (username, password, avatar) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, avatar], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    });
});

// Endpoint để đổi mật khẩu
app.put('/reset-password', express.json(), (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem username có tồn tại trong cơ sở dữ liệu không
    const checkQuery = 'SELECT * FROM Account WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Nếu username không tồn tại
        if (result.length === 0) {
            return res.status(404).json({ message: 'Username does not exist' });
        }

        // Cập nhật mật khẩu mới
        const updateQuery = 'UPDATE Account SET password = ? WHERE username = ?';
        db.query(updateQuery, [password, username], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Password reset successful' });
        });
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
