-- $ sqlite3 projects.db < projects.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
DROP TABLE IF EXISTS TeamProjects;

DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects(
 Project_id INTEGER primary key NOT NULL,
 Title VARCHAR NOT NULL, 
 description NOT NULL
);

INSERT INTO Projects(Title,description) VALUES 
('Scrum App', 'web api' ),
('SORTING APP', 'android app' ),
('Coffee Shop App', 'web base app' );

CREATE TABLE TeamProjects(
 TeamProjects_id INTEGER primary key NOT NULL,
 TPProject_id INTEGER NOT NULL, 
 TPTeam_id INTEGER NOT NULL,

 FOREIGN KEY(TPTeam_id) REFERENCES Projects(Project_id)
 UNIQUE(TPProject_id,TPTeam_id)
);

INSERT INTO TeamProjects(TPProject_id,TPTeam_id) VALUES 
(1,1),
(1,3),
(1,2),
(2,2),
(3,3);
COMMIT;
