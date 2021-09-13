-- $ sqlite3 teams.db < teams.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Members;


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
    
    FOREIGN KEY(MTeam_id) REFERENCES Teams(Team_id)
    UNIQUE(MUser_id,MTeam_id)
);
INSERT INTO Members(MUser_id,MTeam_id) VALUES
(1,1),
(2,2),
(3,3);

COMMIT;
