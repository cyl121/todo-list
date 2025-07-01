CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);
/*查看 todo_app 資料庫*/
SHOW DATABASES;

/*切換進去資料庫並查看 users 資料表內容*/
USE todo_app;
SELECT * FROM users;

/*刪除某一個帳號*/
DELETE FROM users WHERE email = 'What account you want to delete';

/*用 CLI 一次檢查所有表*/
SHOW TABLES;

/*新增欄位*/
ALTER TABLE tasks ADD COLUMN order_num INT DEFAULT 0;

USE todo_app;
-- 新增欄位：拖曳排序用
ALTER TABLE tasks ADD COLUMN order_num INT DEFAULT 0;

-- 依照 ID 初始化順序值
SET @row_num := 0;
UPDATE tasks SET order_num = (@row_num := @row_num + 1) ORDER BY id;

/*加上安全條件 WHERE 避免觸發 safe mode*/
SET @row_num := 0;
UPDATE tasks 
SET order_num = (@row_num := @row_num + 1)
WHERE id > 0
ORDER BY id;

/*檢查 MySQL 的 tasks 表*/
DESC tasks;

/*查詢時區*/
SELECT @@global.time_zone, @@session.time_zone;
/*設定時區*/
SET GLOBAL time_zone = '+08:00';

SELECT id, text, due FROM tasks ORDER BY id DESC LIMIT 5;





