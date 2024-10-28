// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // Xử lý dữ liệu JSON từ các yêu cầu

// MySQL connection setup
const db = mysql.createConnection({
    host: '127.0.0.1',  // hoặc 'localhost'
    port: 3306,          // cổng mặc định của MySQL
    user: 'root',        // tên đăng nhập root của MySQL
    password: '123456789',  // thay thế bằng mật khẩu của bạn
    database: 'category_location'   // thay thế bằng tên database của bạn
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Cấu hình lưu trữ của multer cho upload file
const storage = multer.diskStorage({
    destination: './uploads',  // thư mục lưu ảnh
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Endpoint để lấy danh sách categories
app.get('/category', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint để lấy danh sách locations
app.get('/location', (req, res) => {
    const query = 'SELECT * FROM location';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint xử lý đăng nhập
app.post('/login', (req, res) => {
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

// Endpoint xử lý đăng ký và upload hình ảnh
app.post('/register', upload.single('avatar'), (req, res) => {
    const { username, password } = req.body;
    const avatar = req.file ? req.file.filename : null; // tên file ảnh được lưu

    // Kiểm tra xem username đã tồn tại chưa
    const checkQuery = 'SELECT * FROM Account WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (result.length > 0) {
            // Nếu username đã tồn tại, trả về mã 409 và thông báo lỗi
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Nếu username chưa tồn tại, thực hiện chèn dữ liệu vào bảng Account
        const insertQuery = 'INSERT INTO Account (username, password, avatar) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, avatar], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    });
});

// Thiết lập thư mục 'uploads' là công khai để có thể truy cập ảnh
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Khởi động server tại cổng 3001
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
