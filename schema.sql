-- 1. Create a MySQL Database called `bamazon`.
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:

--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

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

SELECT * FROM bamazon.products;


INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Desk Lamp', 'Lighting', 28.49, 42);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Blender', 'Kitchen and Dining', 72.99, 84);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Kitchen Scale', 'Kitchen and Dining', 16.78, 50);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Microwave', 'Kitchen and Dining', 39.99, 40);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Electric Whisk', 'Kitchen and Dining', 8.99, 70);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Bamboo Cutting Board', 'Kitchen and Dining', 22.78, 25);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Set of 4 Placemats', 'Kitchen and Dining', 19.99, 13);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('California King Mattress', 'Bedroom', 1348.00, 4);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Bath Towel', 'Bathroom', 16.48, 22);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ('Bath Towel Rack', 'Bathroom', 28.00, 8);