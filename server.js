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
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// MySQL connection setup
const db = mysql.createConnection({
    host: '127.0.0.1',  // địa chỉ localhost của mysql
    port: 3306,          // MySQL port
    user: 'root',        // username của mysql
    password: '123456789',  // password của mysql
    database: 'category_location'   // database
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

// Endpoint để đăng nhập
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

// Endpoint để đăng ký tài khoản
app.post('/register', upload.single('avatar'), (req, res) => {
    const { username, password } = req.body;
    const avatar = req.file ? req.file.filename : null; 

    // kiểm tra username có tồn tại hay chưa
    const checkQuery = 'SELECT * FROM Account WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (result.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // thêm user vào database
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


// Endpoint để xóa tài khoản
app.delete('/delete-account', express.json(), (req, res) => {
    const { username } = req.body;

    // Kiểm tra xem username có tồn tại không
    const checkQuery = 'SELECT * FROM Account WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Nếu không tìm thấy tài khoản
        if (result.length === 0) {
            return res.status(404).json({ message: 'Username does not exist' });
        }

        // Xóa tài khoản
        const deleteQuery = 'DELETE FROM Account WHERE username = ?';
        db.query(deleteQuery, [username], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Account deleted successfully' });
        });
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});