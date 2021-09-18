-- $ sqlite3 teams.db < teams.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS Members;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Teams;


CREATE TABLE Teams(
    Team_id INTEGER primary key NOT NULL,
    TeamName VARCHAR NOT NULL,
    UNIQUE(TeamName)

);
INSERT INTO Teams(TeamName) VALUES
("DANH_Team"),
("CONG_Team"),
("PHAM_Team");
CREATE TABLE Roles(
    Role_id INTEGER primary key not null,
    Title VARCHAR Not null,
    UNIQUE(Title)
);
INSERT INTO Roles(Title) VALUES
("ADMIN"),
("DEVELOPER"),
("SCRUM MASTER"),
("PRODUCT OWNER");
CREATE TABLE Members(
    Member_id INTEGER primary key NOT NULL,
    MUser_id INTEGER NOT NULL,
    MTeam_id INTEGER NOT NULL,  
    Member_Role INTEGER NOT NULL default 2,
    FOREIGN KEY(Member_Role) REFERENCES Roles(Role_id)
    FOREIGN KEY(MTeam_id) REFERENCES Teams(Team_id)
    UNIQUE(MUser_id,MTeam_id)
);
INSERT INTO Members(MUser_id,MTeam_id,Member_Role) VALUES
(1,1,3),
(2,2,3),
(3,3,3);

COMMIT;
