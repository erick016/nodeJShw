var inquirer = require("inquirer");
var mysql = require("mysql");

var args = process.argv.slice(2); 

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

});

var desiredId = -4;

var desiredQuantity = 0;

// == v UPDATES v ==



function buyProductOfId(newQuantity,productId,oldQuantity)
{
  console.log("Buying product(s) of that name...\n");
  var query = connection.query( " UPDATE products SET ? WHERE item_id = '" + productId + "';",
    [
      {
        stock_quantity: newQuantity
      }
      
    ],
    function(err, res) {
      if (!err) console.log("Buying... costs... ") ;

    }
  );

  // logs the actual query being run
  console.log(query.sql);  
  
  var query2 =  connection.query("SELECT price FROM products WHERE item_id = ? ",  [productId] ,function(err, res) {
    if (err) throw err;

    var resString = JSON.stringify(res);

    var myNumberStr = resString.match(/\d+.?\d+/g);

    var myPrice = parseFloat(myNumberStr);

    console.log ("$" + myPrice * (oldQuantity-newQuantity));
    //console.log(myPrice);

  })

  // logs the actual query being run
  console.log(query2.sql); 

  connection.end(); 
}

// == ^ ^ ==

function readProductQuantityOfId(argProductValue, quantToSubtract) {
    
   

    connection.query("SELECT stock_quantity FROM products WHERE item_id = ? ",  [argProductValue] ,function(err, res) {
      if (err) throw err;

      var resString = JSON.stringify(res);

      var myNumberStr = resString.match(/\d+/g);

      var myQuantity = parseInt(myNumberStr);

      var updateWith = myQuantity - quantToSubtract; 



      if (updateWith >= 0)
      {
        buyProductOfId(updateWith,argProductValue,myQuantity)
      }

      else
      {
          console.log("Insufficient quantity!");
      }

    })
    
   };



   function readProducts() {

    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
      if (err) throw err;

      var resStr = JSON.stringify(res);
      


      var myIdNumberStrs = resStr.match(/\d+,/g);
      var myIdNumbers = [];
      for (i = 0; i<myIdNumberStrs.length; i++)
      {
          myIdNumberStrs[i] = myIdNumberStrs[i].replace(",","");
          myIdNumbers.push(parseInt(myIdNumberStrs[i]));
      }


      var myProductNameStrs = resStr.match(/:"[A-Za-z0-9\s.']*"/g)
      for (i = 0; i<myProductNameStrs.length; i++)
      {
        myProductNameStrs[i] = myProductNameStrs[i].replace(":","");
        myProductNameStrs[i] = myProductNameStrs[i].replace("\"","");
        myProductNameStrs[i] = myProductNameStrs[i].replace("\"","");
      }


      var myPriceStrs = resStr.match(/\d+[.\d+]*}/g);
      var myPriceNumbers = [];
      for (i = 0; i<myPriceStrs.length; i++)
      {
          myPriceStrs[i] = myPriceStrs[i].replace("}","");
          myPriceNumbers.push(parseInt(myPriceStrs[i]));
      }

      for (i = 0; i<myPriceStrs.length; i++)
      {
          console.log((myIdNumbers[i]) + (" | ") + (myProductNameStrs[i]) + (" | $ ") + (myPriceStrs[i]));
      }

      inquirer
  .prompt([
    {
      type: "input",
      message: "What is the ID of the product you wish to purchase?",
      name: "desId"
    },
    {
        type: "input",
        message: "How many units of the product do you wish to purchase?",
        name: "quan"
    }
    ])  .then(function(inquirerResponse) {
        
        desiredId = inquirerResponse.desId;

        desiredQuantity = inquirerResponse.quan;

        if (desiredId >= 1  && desiredQuantity >=1)
        {
            readProductQuantityOfId(desiredId,desiredQuantity);
        }
        else
        {
            console.log("Bad parameters for purchase!");
        }
      });

    })};

readProducts();






