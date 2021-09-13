-- $ sqlite3 backlogs.db < backlogs.sql

PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS productbacklog;
DROP TABLE IF EXISTS sprintbacklog;


CREATE TABLE productbacklog (
    Item_id INTEGER primary key NOT NULL,
    Product_id VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);
INSERT INTO productbacklog(Product_id,description) VALUES
(1,"project 1 requirement 1"),
(1,"project 1 requirement 2"),
(2,"project 2 requirement 1"),
(2,"project 2 requirement 2"),
(3,"project 3 requirement 1"),
(3,"project 3 requirement 2"),
(3,"project 3 requirement 3");

CREATE TABLE sprintbacklog(
    Sprint_id INTEGER primary key NOT NULL,
    PItem_id VARCHAR NOT NULL,
    Use_Stories VARCHAR NOT NULL,
    Status VARCHAR NOT NULL DEFAULT 'I', 
    FOREIGN KEY(PItem_id) REFERENCES productbacklog(Item_id)
);

INSERT INTO sprintbacklog(PItem_id,Use_Stories) VALUES
(1,"AS AN USER I WANT A MAKE PROJECT BUTTON"),
(2,"AS AN USER I WANT A REMOVE MEMBER");


COMMIT;
