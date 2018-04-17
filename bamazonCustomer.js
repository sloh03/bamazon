// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

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
        console.log('Welcome to Bamazon! Happy browsing.\n'.cyan);

        // instantiate 
        var table = new Table({
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
            , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
            , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
            , 'right': '' , 'right-mid': '' , 'middle': ' ' },
            style: { 'padding-left': 0, 'padding-right': 0 },
            head: ['Id', 'Product', 'Price']
        });
        
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        res.forEach(function(row) {
            var newRow = [row.item_id, row.product_name, + row.price];
            table.push(newRow);
        }) 
        console.log(table.toString());
        console.log('\n');

        optionToPurchase();
    });
}
displayItemsInStock()

function optionToPurchase() {
    inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: 'Would you like to make a purchase?'.cyan,
            choices: ['Yes', 'No']
        }
    ]).then(function(response) {
        if (response.option === 'Yes') {
            addToCart();
        }
        else if (response.option === 'No') {
            console.log('\nThanks for visiting. Come back soon!\n'.cyan);
            conn.end();
        }
    })
}



// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

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

        checkStock(id, quantityRequested);
    });
  }

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

function checkStock(id, quantityRequested) {

    conn.query(
        "SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {

            var currentStock = res[0].stock_quantity;

            if (quantityRequested > currentStock) {
                console.log("\nSorry, we are unable to fulfill your order at this time. Currently, there are ".red + currentStock + " left in stock.\n".red);
                conn.end();
            }
            else {
                fulfillOrder(id, currentStock, quantityRequested);
            }
        }
    );
}

function fulfillOrder(id, currentStock, quantityRequested) {

    conn.query(
        "SELECT * FROM products WHERE ?", {item_id: id}, function(err, res) {
            var unitPrice = res[0].price;
        }
    );

    var updatedStock = currentStock - quantityRequested;
    var totalCost = 

    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStock}, {item_id: id}], 
    function(err, res) {
        console.log("Your total cost for " + requested.quantity + " " + productName + " is $" + purchaseCost + "\nThank you for shopping with WHAMazon!\n--------------------------------------------------\n");
    }
);
}



