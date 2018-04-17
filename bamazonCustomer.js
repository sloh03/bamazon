// Running this application will first display all of the items available for sale.

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
    console.log("Connected as id = " + conn.threadId + '\n');
})


// Function to display available items in table
function displayItemsInStock() {

    conn.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
        if (err) throw err;

        // Welcome message
        console.log('Welcome to Bamazon! Happy browsing.\n'.cyan);

        // Display products in styled table with id, name, and price
        var productsTable = new Table({
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
            , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
            , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
            , 'right': '' , 'right-mid': '' , 'middle': ' ' },
            style: { 'padding-left': 0, 'padding-right': 0 },
            head: ['Id', 'Product', 'Price']
        });
        res.forEach(function(row) {
            var newRow = [row.item_id, row.product_name, + row.price];
            productsTable.push(newRow);
        }) 
        console.log(productsTable.toString());
        console.log('\n');

        // Call function to check if customer wants to make a purchase
        optionToPurchase();
    });
}
displayItemsInStock()


// Function to check if customer if they want to make a purchase
function optionToPurchase() {
    inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: 'Would you like to make a purchase?'.cyan,
            choices: ['Yes', 'No']
        }
    ]).then(function(response) {
        // If yes, call function to select product to purchase
        if (response.option === 'Yes') {
            addToCart();
        }
        // Otherwise, exit store
        else if (response.option === 'No') {
            console.log('\nThank you for visiting. Come back soon!\n'.cyan);
            conn.end();
        }
    })
}


// Function allows customer to select item and quantity to purchase
function addToCart() {

    console.log('\n');
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the ID of the product you would like to purchase.".cyan
        },
        {
            name: "quantity",
            type: "input",
            message: "Please specify a quantity.".cyan
        }
    ]).then(function(input) {

        var id = parseInt(input.id);
        var quantityRequested = parseInt(input.quantity);

        // Call function to check stock of item requested
        checkStock(id, quantityRequested);
    });
  }


// Function to check stock of item requested
function checkStock(id, quantityRequested) {

    conn.query(
        "SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {

            // Retrieve stock quantity from database
            var currentStock = res[0].stock_quantity;

            // Inform customer if stock is insufficient
            if (quantityRequested > currentStock) {
                console.log("\nSorry, we are unable to fulfill your order at this time. Currently only ".red + currentStock + " left in stock.\n".red);
                conn.end();
            }
            // Otherwise, call function to fulfill customer's order
            else {
                fulfillOrder(id, currentStock, quantityRequested);
            }
        }
    );
}

// Function to fulfill customer's order
function fulfillOrder(id, currentStock, quantityRequested) {

    var updatedStock;
    var totalCost;

    conn.query(
        "SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {

            // Retrieve from database
            var unitPrice = res[0].price;
            var product = res[0].product_name;

            // Calculate stock left after purchase
            updatedStock = currentStock - quantityRequested;

            // Calculate total cost for customer
            totalCost = unitPrice * quantityRequested;
            totalCost = totalCost.toFixed(2);

            // Display order summary in styled table
            console.log("\nOrder Summary: \n");
            var summaryTable = new Table({
                chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
                , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
                , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
                , 'right': '' , 'right-mid': '' , 'middle': ' ' },
                style: { 'padding-left': 0, 'padding-right': 0 },
                head: ['Qty', 'Product', 'Price']
            });
            var newRow = [quantityRequested, product, unitPrice];
            summaryTable.push(newRow);
            console.log(summaryTable.toString());

            // Update stock remaining in database, display total and thank customer
            conn.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStock}, {item_id: id}], 
                function(err, res) {
                    console.log("\nTotal: $" + totalCost);
                    console.log("\nThank you for shopping at Bamazon!\n".cyan);
                    conn.end();
                }
            );
        }
    );
}



