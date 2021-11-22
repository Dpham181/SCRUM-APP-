-- $ sqlite3 projects.db < projects.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
DROP TABLE IF EXISTS TeamProjects;

DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects(
 Project_id INTEGER primary key NOT NULL,
 Title VARCHAR NOT NULL, 
 description NOT NULL, 
 Deathline  DATE

);

INSERT INTO Projects(Title,description, DeathLine) VALUES 
('Scrum App', 'web api' , '2022-20-01'),
('SORTING APP', 'android app' , '2022-10-01'),
('Coffee Shop App', 'web base app' , '2022-30-01');

CREATE TABLE TeamProjects(
 TeamProjects_id INTEGER primary key NOT NULL,
 TPProject_id INTEGER NOT NULL, 
 TPTeam_id INTEGER NOT NULL,
 Contribution_Role VARCHAR NOT NULL, 
 FOREIGN KEY(TPProject_id) REFERENCES Projects(Project_id)
 UNIQUE(TPProject_id,TPTeam_id)
);

INSERT INTO TeamProjects(TPProject_id,TPTeam_id, Contribution_Role) VALUES 
(1,1,'BACK-END'),
(1,3,'FRONT-END'),
(1,2,'DOCUMENTATION'),
(2,2,'FRONT-END'),
(3,3,'DOCUMENTATION');
COMMIT;
