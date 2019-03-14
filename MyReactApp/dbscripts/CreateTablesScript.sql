CREATE TABLE Patient (      
Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,      
Name varchar(20) NOT NULL ,      
Surname varchar(20) not null,
City varchar(20) NOT NULL ,      
Department varchar(20) NOT NULL ,      
Gender varchar(6) NOT NULL       
)      
GO      
CREATE TABLE City (      
Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,      
CityName varchar(20) NOT NULL       
)      
GO

INSERT INTO City VALUES('New Delhi');      
INSERT INTO City VALUES('Mumbai');      
INSERT INTO City VALUES('Hyderabad');      
INSERT INTO City VALUES('Chennai');      
INSERT INTO City VALUES('Bengaluru');

