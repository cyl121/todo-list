require("dotenv").config(); // 環境變數設定
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 資料庫連線設定（請依你本地 MySQL 修改）
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 測試連線
db.connect(err => {
  if (err) {
    console.error("❌ 資料庫連線錯誤：", err);
  } else {
    console.log("✅ 成功連線 MySQL 資料庫");
  }
});

// 🟩 使用者註冊
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err) => {
    if (err) {
      return res.json({ success: false, message: "帳號已存在或錯誤" });
    }
    res.json({ success: true, message: "註冊成功" });
  });
});

// 🟦 使用者登入
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err || result.length === 0) {
      return res.json({ success: false, message: "登入失敗，帳密錯誤" });
    }
    res.json({ success: true });
  });
});

// 🔲 任務儲存在這張表（可放入 SQL 檔）
const createTaskTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_email VARCHAR(100) NOT NULL,
  text TEXT,
  done BOOLEAN,
  priority VARCHAR(10),
  due DATE
);`;
db.query(createTaskTable);

// 🟨 取得任務
app.get("/tasks", (req, res) => {
  const { user } = req.query;
  db.query("SELECT * FROM tasks WHERE user_email = ?", [user], (err, rows) => {
    res.json(rows);
  });
});

// 🟧 新增任務
app.post("/tasks", (req, res) => {
  const { user, text, done, priority, due } = req.body;
  const sql = "INSERT INTO tasks (user_email, text, done, priority, due) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [user, text, done, priority, due], (err, result) => {
    if (err) return res.sendStatus(500);
    res.json({ success: true, id: result.insertId });
  });
});

// 🟥 刪除任務
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

// 🟪 更新任務完成狀態
app.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const { done } = req.body;
  const sql = "UPDATE tasks SET done = ? WHERE id = ?";
  db.query(sql, [done, id], (err) => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

//後端伺服器
app.listen(port, () => {
  console.log(`🚀 伺服器已啟動 http://localhost:${port}`);
});
//進 localhost:3000 可以看到歡迎畫面
app.get("/", (req, res) => {
  res.send("✅ ToDo 後端伺服器運作中");
});
