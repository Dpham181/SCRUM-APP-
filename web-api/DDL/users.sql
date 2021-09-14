-- $ sqlite3 users.db < users.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS Users;


CREATE TABLE Users(
    User_id INTEGER primary key NOT NULL,
    UserName VARCHAR NOT NULL,
    PassWord VARCHAR NOT NULL,
    UNIQUE(UserName)

);
INSERT INTO users(UserName,PassWord) VALUES
("DANH","123"),
("CONG","123"),
("PHAM","123");



COMMIT;
