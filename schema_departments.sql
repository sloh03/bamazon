-- 1. Create a new MySQL table called `departments`. Your table should include the following columns:
--    * department_id
--    * department_name
--    * overhead_costs (A dummy number you set for each department)
CREATE database bamazon;
USE bamazon;

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DECIMAL(10,2)NOT NULL,
  PRIMARY KEY (item_id)
);

-- 2. Modify the products table so that there's a product_sales column and modify the `bamazonCustomer.js` app so that this value is updated with each individual products total revenue from each sale.

-- 3. Modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

--    * Make sure your app still updates the inventory listed in the `products` column.

-- 4. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

--    * View Product Sales by Department
   
--    * Create New Department

-- 5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

-- | department_id | department_name | over_head_costs | product_sales | total_profit |
-- | ------------- | --------------- | --------------- | ------------- | ------------ |
-- | 01            | Electronics     | 10000           | 20000         | 10000        |
-- | 02            | Clothing        | 60000           | 100000        | 40000        |

-- 6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

-- 7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

--    * Hint: You may need to look into aliases in MySQL.

--    * Hint: You may need to look into GROUP BYs.

--    * Hint: You may need to look into JOINS.

--    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)
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