-- $ sqlite3 backlogs.db < backlogs.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
DROP TABLE IF EXISTS sprintbacklog;

DROP TABLE IF EXISTS productbacklog;


CREATE TABLE productbacklog (
    Item_id INTEGER primary key NOT NULL,
    Product_id INTEGER NOT NULL,
    description VARCHAR NOT NULL
);
INSERT INTO productbacklog(Product_id,description) VALUES
(1,"MAKING NEW PROJECT"),
(1,"REMOVING MEMBERS"),
(1,"CREATING NEW TEAM"),
(2,"project 2 requirement 1"),
(2,"project 2 requirement 2"),
(3,"project 3 requirement 1"),
(3,"project 3 requirement 2"),
(3,"project 3 requirement 3");

CREATE TABLE sprintbacklog(
    Sprint_id INTEGER primary key NOT NULL,
    PItem_id INTEGER NOT NULL,
    Iteration_Number INTEGER NOT NULL,
    Use_Stories VARCHAR NOT NULL,
    Status VARCHAR NOT NULL DEFAULT 'I', 
    FOREIGN KEY(PItem_id) REFERENCES productbacklog(Item_id)
);

INSERT INTO sprintbacklog(PItem_id,Iteration_Number,Use_Stories,Status) VALUES
(1,1,"As a user I request to have a making project button.",'I'),
(2,1,"As a user, I request to have a button that can use to remove members",'I'),
(3,1,"As a user, I request to have a button that can use to create a new Team",'C');


COMMIT;
