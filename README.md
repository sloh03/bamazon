# bamazon

This is a command-line store similar to Amazon built with MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

## Function
Running the Node application `bamazonCustomer.js` will display all available items for sale. The customer will then be given the option to purchase products.

If the customer chooses to make a purchase, they will be prompted to enter the ID and quantity of the desired product.

Once the order is placed, the application checks if the store's stock is sufficient to meet the customer's request. The customer is then notified if there is not enough of the product in stock.

If the stock is sufficient, the order summary and total cost is displayed for the customer.

![Alt text](images/Bamazon8.jpg?raw=true "Bamazon")

## Bonus Features
The `colors` npm package is used to style text and the `CLI-table` npm package is used to style tables in the command window.

## Languages and Libraries Used
* Node.js
* MySQL

## Materials Sources
* [Inquirer npm package](https://www.npmjs.com/package/inquirer)
* [Colors npm package](https://www.npmjs.com/package/colors)
* [CLI-table npm package](https://www.npmjs.com/package/cli-table)
