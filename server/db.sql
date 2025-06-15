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

/*更新現有資料的排序*/
SET @row_num := 0;
UPDATE tasks SET order_num = (@row_num := @row_num + 1) ORDER BY id;





