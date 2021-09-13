-- $ sqlite3 users.db < users.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Members;

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

CREATE TABLE Teams(
    Team_id INTEGER primary key NOT NULL,
    TeamName VARCHAR NOT NULL,
    UNIQUE(TeamName)

);
INSERT INTO Teams(TeamName) VALUES
("DANH_Team"),
("CONG_Team"),
("PHAM_Team");

CREATE TABLE Members(
    Member_id INTEGER primary key NOT NULL,
    MUser_id INTEGER NOT NULL,
    MTeam_id INTEGER NOT NULL,
    
    FOREIGN KEY(MUser_id) REFERENCES Users(User_id)
    FOREIGN KEY(MTeam_id) REFERENCES Teams(Team_id)
    UNIQUE(MUser_id,MTeam_id)
);
INSERT INTO Members(MUser_id,MTeam_id) VALUES
(1,1),
(2,2),
(3,3);

COMMIT;
