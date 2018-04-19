-- Create a MySQL Database called `bamazon`.
-- Create a Table inside of that database called `products`.
-- Add each of the following columns to the table:

--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)

CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2)NOT NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);



-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
SELECT * FROM bamazon.products;

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Desk Lamp', 'Lighting', 28.49, 42, 28.49);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Blender', 'Kitchen and Dining', 72.99, 84, 72.99);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Kitchen Scale', 'Kitchen and Dining', 16.78, 50, 16.78);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Microwave', 'Kitchen and Dining', 39.99, 40, 39.99);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Electric Whisk', 'Kitchen and Dining', 8.99, 70, 8.99);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Bamboo Cutting Board', 'Kitchen and Dining', 22.78, 25, 22.78);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Set of 4 Placemats', 'Kitchen and Dining', 19.99, 13, 19.99);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('California King Mattress', 'Bedroom', 1348.00, 4, 1348.00);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Bath Towel', 'Bathroom', 16.48, 22, 16.48);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('Bath Towel Rack', 'Bathroom', 28.00, 8, 28.00);