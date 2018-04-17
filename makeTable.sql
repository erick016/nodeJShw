DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL UNIQUE,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(5,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) 

VALUES ("SEGA Genesis to USB port","Necessities",20.00,20),
	("Sabrent USB 3.0 controller","Necessities",20.00,20),
	("SEGA Genesis Controller", "Necessities", 10.00, 80),
	("A Charlie Brown Christmas", "Necessities", 20.00, 40),
	("Water Bottle", "Accessories", 2.00, 10000),
	("Coffee", "Accessories", 2.25, 2000),
	("Covfefe", "Unknown", 999.99, 50),
	("Junior's Mounted stag head", "Unknown", 999.01, 0 ),
	("BAD album Vinyl von Michael Jackson", "Music", 25.00, 100),
	("Posh Popcorn Kernel", "Movie Theatre (British)", 10.00, 9000000);
