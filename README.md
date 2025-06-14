# 📝 ToDo List App (Fullstack)

A full-featured task manager built with **HTML/CSS/JavaScript (frontend)** and **Node.js + MySQL (backend)**.  
This project is a personal training practice to connect front-end logic with real database operations.

一個使用原生 JS 開發的任務管理系統，整合登入、分類、排序、後端儲存與資料庫操作，為前後端實作作品。

---

## 🚀 Features 功能介紹

| 功能項目 Feature | 說明 |
|------------------|------|
| 🔐 Login/Register 登入註冊 | 使用 email + password 建立帳號，登入後記錄至 localStorage |
| ✅ CRUD 任務操作 | 新增、完成、刪除任務 |
| 🎯 任務分類篩選 | 全部 / 已完成 / 未完成 |
| 🔁 拖曳排序 | 可上下移動任務順序 |
| ⚠️ 截止日期 + 過期提示 | 任務可設定 due date，過期任務顯示紅字 |
| 🟥 後端資料儲存 | 所有任務儲存在 MySQL，支援多使用者任務獨立化 |
| 📱 響應式設計 | 手機版排版與功能正常顯示 |

---

## 🧱 技術堆疊 Tech Stack

- Frontend: HTML5 + CSS3 + JavaScript (Vanilla JS)
- Backend: Node.js + Express
- Database: MySQL 8+
- API: RESTful API (GET / POST / DELETE / PATCH)
- Others: localStorage、CORS、環境變數 `.env`

---

## 📂 專案結構 Project Structure

```
todo-fullstack/
├── client/
│   ├── login.html
│   ├── todo.html
│   ├── style.css
│   └── ...
├── server/
│   ├── server.js
│   ├── db.sql
│   ├── .env (not uploaded)
│   └── package.json
├── README.md
```

---

## ⚙️ 如何使用 How to Run

### 🔧 後端伺服器
```bash
cd server
npm install
node server.js
```

### 🌐 前端
直接打開 `client/login.html` 開始使用（建議透過 VSCode Live Server 或部署至 GitHub Pages）

---

## 📸 Demo Screenshot 預留區（你可以補上畫面）

> ![todo-page](./client/img/todo-preview.png)

---

## 🙋‍♂️ Author

Yu Lang Chou  
📧 cyl.0121haha@gmail.com  
🔗 [Resume Website](https://cyl121.github.io/resume-website/)  
🔗 [GitHub](https://github.com/cyl121)

---

## ✅ 備註

本作品為學習前後端整合的練習作品，功能從零手刻，無使用框架，日後將嘗試轉為 Vue.js 版本。

This is a practice project for fullstack training, and all logic is implemented manually to build practical experience.