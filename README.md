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

---
## 📖 專案心得 & 反思

## 🏆 開發心得 & 技術血淚筆記：MySQL/JS 日期掉一天的終極解法

### 遇到的困難

開發過程遇到「截止日自動提前一天」的經典大坑：

- 前端 `<input type="date">` 選 2025-07-01，資料庫確實存進 2025-07-01
- 但只要重整網頁，畫面就自動顯示 2025-06-30

### 問題來源

- MySQL 的 DATE 欄位理論上無時區，但 MySQL 驅動查詢會自動轉成 JS Date 物件（預設 UTC）
- 用 `toISOString().split("T")[0]` 取日期時，會自動轉成 UTC 字串，台灣時區就提前一天
- 只要 anywhere 用 `new Date(t.due)` 或 `t.due.toISOString()`，就會掉日

### 解決方法

1. 前端/後端/資料庫全程用 `yyyy-mm-dd` 純字串
2. 後端 API 查出資料後，若是 Date 物件，不要用 `toISOString()`，而是用下列方式：

    ```js
    if (t.due instanceof Date) {
      const yyyy = t.due.getFullYear();
      const mm = String(t.due.getMonth() + 1).padStart(2, '0');
      const dd = String(t.due.getDate()).padStart(2, '0');
      t.due = `${yyyy}-${mm}-${dd}`;
    } else if (typeof t.due === "string" && t.due.includes("T")) {
      t.due = t.due.split("T")[0];
    }
    ```

3. 前端 render 只要直接顯示 `task.due`，不用再 `new Date()`、不用任何型別轉換

---

### 經驗反思

- JS 的 `toISOString()` 會自動轉 UTC、強制扣時區，一不小心就讓台灣的日期提前一天
- 面對日期型別，絕不能依賴自動轉換，一律手動組年月日
- 每一個欄位都應該 `console.log(typeof ...)`，確認資料流全程沒型別走樣
- 解這種 bug，超有成就感，也真的會救到團隊/未來的自己！

---

### 學到什麼

- 簡單的功能，有時候會卡在隱形的型別／時區陷阱
- 不要只抄網路範例，要多嘗試自己排查，才會真的懂背後的原理
- 面對任何 bug，系統化、一層層驗證數據來源（payload、資料庫、API 回傳、前端渲染），絕對抓得出來！

---

本作品為學習前後端整合的練習作品，功能從零手刻，無使用框架，日後將嘗試轉為 Vue.js 版本。

This is a practice project for fullstack training, and all logic is implemented manually to build practical experience.