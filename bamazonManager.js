// Running this application will:
//   * List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory
//     * Add to Inventory
//     * Add New Product

var inquirer = require('inquirer');
var colors = require('colors');
var Table = require('cli-table');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root', // Usually would keep this in .env file
    database: 'bamazon'
})

conn.connect(function(err) {
    if(err) {
        throw err;
    }
    // console.log("Connected as id = " + conn.threadId + '\n');
})



// Running this application will first display all of the items available for sale.
function menuOptions() {
    console.log('\n');

    inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: 'Menu Options:'.cyan,
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
    ]).then(function(response) {
        if (response.option === 'View Products for Sale') {
            viewProductsForSale();
        }
        else if (response.option === 'View Low Inventory') {
            viewLowInventory();
        }
        else if (response.option === 'Add to Inventory') {
            restockInventory();
        }
        else if (response.option === 'Add New Product') {
            addNewProduct();
        }
        else if (response.option === 'Exit') {
            conn.end();
        }
    })
    console.log('\n');
}
menuOptions();



//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
// Function to display available items in table
function viewProductsForSale() {

    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // Welcome message
        console.log('Products for Sale:\n'.cyan);

        // Display products in styled table with id, name, and price
        var productsTable = new Table({
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
            , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
            , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
            , 'right': '' , 'right-mid': '' , 'middle': ' ' },
            style: { 'padding-left': 0, 'padding-right': 0 },
            head: ['Id', 'Product', 'Department','Price', 'Qty']
        });
        res.forEach(function(row) {
            var newRow = [row.item_id, row.product_name, + row.department_name, + row.price, + row.stock_quantity];
            productsTable.push(newRow);
        }) 
        console.log(productsTable.toString());

        menuOptions();

    });
}



//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewLowInventory() {

    conn.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;

        // Welcome message
        console.log('Less than 5 Remaining:\n'.cyan);

        // Display products in styled table with id, name, and price
        var productsTable = new Table({
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
            , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
            , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
            , 'right': '' , 'right-mid': '' , 'middle': ' ' },
            style: { 'padding-left': 0, 'padding-right': 0 },
            head: ['Id', 'Product', 'Department','Price', 'Qty']
        });
        res.forEach(function(row) {
            var newRow = [row.item_id, row.product_name, + row.department_name, + row.price, + row.stock_quantity];
            productsTable.push(newRow);
        }) 
        console.log(productsTable.toString());

        // Call function to check if customer wants to make a purchase
        menuOptions();
    });
}



//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function restockInventory() {
    console.log('\n');

    // Get input for item id and qty
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the product you would like to restock.".cyan
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter restocking quantity.".cyan
        }
    ]).then(function(input) {

        var id = parseInt(input.id);
        var RestockingQty = parseInt(input.quantity);
        var newQty;

            conn.query(
                "SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {

                    // Retrieve stock quantity from database, add to existing
                    var currentStock = res[0].stock_quantity;
                    newQty = RestockingQty + currentStock;

                    var productName = res[0].product_name;

                    conn.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQty
                            },
                            {
                                item_id: input.id
                            }
                        ],
                        function(err, res) {
                            console.log("\nAdded " + RestockingQty + " units of " + productName + ".\n");
                            // Call deleteProduct AFTER the UPDATE completes
                            menuOptions();
                        }
                    )
                }
            );
    });
}



//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addNewProduct() {
    console.log('\n');

    // Get input for item name, department, price and qty
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the name of the product you would like to add.".cyan
        },
        {
            name: "department",
            type: "input",
            message: "Enter the department for the product.".cyan
        },
        {
            name: "price",
            type: "input",
            message: "Enter the unit price for the product.".cyan
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the quantity added.".cyan
        }
    ]).then(function(input) {

        var name = input.name;
        var department = input.department;
        var price = input.price;
        price = price;
        var quantity = parseInt(input.quantity);

        conn.query(
            "INSERT INTO products SET ?",
            {
                product_name: name,
                department_name: department,
                price: price,
                stock_quantity: quantity
            },
            function(err, res) {
                console.log("\n" + quantity + " units of " + name + " added to " + department + " department at $" + price + " per unit.\n");
                menuOptions();
            }
        );
    });
}
