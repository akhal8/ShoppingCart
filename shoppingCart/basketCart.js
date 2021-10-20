//main variable with the name shoppingCart.
// Using camelCase in the code.
var shoppingCart = {
  listHtml : null, // products list access from the HTML.
  showItems : null, // Current cart situation 0, 1 or more.
  basketItems : {}, // Items in the shopping cart selected by the user.
  imageURL : "images/", // Product Image address from the folder that is selected by the user or listed to sell.

//save function which is use to save the shoppingCart in local storage variable with the method set item.
//it saves shoppingCart variable with the property current basketItem.
  save : function () {
    localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart.basketItems));
  },

// this function is used to get the item from local storage with the property load.
//using method get item = variable shoppingCart and property current basketItem.
// it uses if statement to check if there's any item in the basket to load.
//if not it sets the basket to zero otherwise it loads the basketItems.
  load : function () {
    shoppingCart.basketItems = localStorage.getItem("shoppingcart");
    if (shoppingCart.basketItems == null) { shoppingCart.basketItems = {}; }
    else { shoppingCart.basketItems = JSON.parse(shoppingCart.basketItems); }
  },

//property delete, function are used to empty the basket by checking the if statment.
//if statemnt is true remove the items from the var shoppingCart and property basketItems.
  delete : function () {
    if (confirm("Empty cart?")) {
      shoppingCart.basketItems = {};
      localStorage.removeItem("shoppingcart");
      shoppingCart.list();
    }
  },

//starting the shopping cart with start property, function by getting the elements by id from the html document.
  start : function () {
    shoppingCart.listHtml = document.getElementById("basketCart-products");
    shoppingCart.showItems = document.getElementById("basketCart-items");

    //putting the variable shoopingCart and property listHtml empty with innerhtml which allows you to modify listHtml.
    // creating three variables i, drawItems, partItem and id which will only be used in this section of the code.
    //using for loop to get the product information from the basketproduct page in whichi there's a variable named
    //productsPets whichs has all the information stored for each product or animal which is on sale.
    shoppingCart.listHtml.innerHTML = "";
    let i, drawItem, partItem;
    for (let id in productsPets) {
      // saving all the products into variable i.
      //creating the sections for all items in productsPets page.
      //putting the details of productsPets inside the variable and property shoppingCart and listHtml.
      i = productsPets[id];
      drawItem = document.createElement("div");
      drawItem.className = "pets-item";
      shoppingCart.listHtml.appendChild(drawItem);

      // assigning variable partItem to  create an image.
      //using partItem variable to create an image by combining the variable and property shoppingCart and 
      //imageURL with the variable i and img which we created before.
      partItem = document.createElement("img");
      partItem.src = shoppingCart.imageURL + i.img;
      partItem.className = "pets-img";
      drawItem.appendChild(partItem);

      //using partItem variable to create a div for the product name and adding the product name to the variable part item using method append child.
      partItem = document.createElement("div");
      partItem.innerHTML = i.name;
      partItem.className = "pets-name";
      drawItem.appendChild(partItem);

      //partItem variable to save the element div which will contain the product description throught the use of innerhtml and 
      //variable i which contains the list of products and their details. Using appendchild to add the description to the list.
      partItem = document.createElement("div");
      partItem.innerHTML = i.desc;
      partItem.className = "pets-desc";
      drawItem.appendChild(partItem);

      //Using partItem variable to save the new element div, which will contain the price from the variable i and price section from
      //productsPets which is seved in i variable with other products price and using appendchild to save the price in the list.
      partItem = document.createElement("div");
      partItem.innerHTML = "" + i.price;
      partItem.className = "pets-price";
      drawItem.appendChild(partItem);

      //using partItem to create element input, which is used by creating a button.
      //button is used to add element to the basket by the property onclick to shoppingCart add.
      partItem = document.createElement("input");
      partItem.type = "button";
      partItem.value = "Add to Cart";
      partItem.className = "shoppingcart pets-add";
      partItem.onclick = shoppingCart.add;
      partItem.dataset.id = id;
      drawItem.appendChild(partItem);
    }
    //loading the shopingCart from previous sessions. 
    shoppingCart.load();
    //listing the current items in the shoppingCart variable.
    shoppingCart.list();
  },

  //LIST CURRENT CART ITEMS IN HTML
  list : function () {
 
    //this code is used to check and reset the basket by using property hasOwnProperty which checks if the shoppingCart
    // property basketItems is empty or not using for loop with the variable keynum.
    shoppingCart.showItems.innerHTML = "";
    let drawitem, partItem;
    let empty = true;
    for (let keynum in shoppingCart.basketItems) {
      if(shoppingCart.basketItems.hasOwnProperty(keynum)) { empty = false; break; }
    }

    //If the cart is empty than it will show text "shoppingCart is empty" with the use of drawitem.innerhtml and append child.
    if (empty) {
      drawitem = document.createElement("div");
      drawitem.innerHTML = "Shopping Basket is empty";
      shoppingCart.showItems.appendChild(drawitem);
    }

    //in case there's a product in shopppingCart than list the item using for loop with the variable id.
    else {
      let i, total = 0, subtotal = 0;
      for (let id in shoppingCart.basketItems) {
      //creating the element div for all the items that was in the shoppingCart.
      //getting the details from the productsPets page and saving it in to I variable.
      //appendchild to put the element div inside the shoppingCart variable and property showItems.
        i = productsPets[id];
        drawitem = document.createElement("div");
        drawitem.className = "cart-item";
        shoppingCart.showItems.appendChild(drawitem);

        // NAME
      //creating the element div for all the names that was in the shoppingCart.
      //using innerhtml to get the name from i variable where all the productsPets are saved,
      //appendchild to put the element div inside the shoppingCart variable and property showItems.
        partItem = document.createElement("div");
        partItem.innerHTML = i.name;
        partItem.className = "cart-name";
        drawitem.appendChild(partItem);

        //creating a new element input as a button to allow user to remove products from the shopping list.
        partItem = document.createElement("input");
        partItem.type = "button";
        partItem.value = "X";
        partItem.dataset.id = id;
        partItem.className = "cart-del cart";
        partItem.addEventListener("click", shoppingCart.remove);
        drawitem.appendChild(partItem);

        //Creating a new input element input as a number which will allow users to add one item multiple times in the basket.
        partItem = document.createElement("input");
        partItem.type = "number";
        partItem.min = 0;
        partItem.value = shoppingCart.basketItems[id];
        partItem.dataset.id = id;
        partItem.className = "cart-cqy";
        partItem.addEventListener("change", shoppingCart.change);
        drawitem.appendChild(partItem);

        //creating a subtotal by multiplying price by the amount of the same items in the basket.
        subtotal = shoppingCart.basketItems[id] * i.price;
        //adding the subtotal to the total amount
        total += subtotal;
      }

      //creating a new element div to show the total at the end with the use of property innerHtml TOTAL: £" + total.
      drawitem = document.createElement("div");
      drawitem.className = "cart-total";
      drawitem.id = "cart-total";
      drawitem.innerHTML ="TOTAL: £" + total;
      shoppingCart.showItems.appendChild(drawitem);

      
      //creating a new input as a button which will allow the user to empty the basket.
      drawitem = document.createElement("input");
      drawitem.type = "button";
      drawitem.value = "Empty";
      drawitem.addEventListener("click", shoppingCart.delete);
      drawitem.className = "cart-empty cart";
      shoppingCart.showItems.appendChild(drawitem);

      // creating a new input as a button for the checkout, which will be used by the userd to buy the product in the end.
      drawitem = document.createElement("input");
      drawitem.type = "button";
      drawitem.value = "Checkout";
      drawitem.addEventListener("click", shoppingCart.checkout);
      drawitem.className = "cart-checkout cart";
      shoppingCart.showItems.appendChild(drawitem);
    }
  },

  //using add property and if statement to add items to the basket. If there's no element add one to the basket otherwise add one more 
  //if there's already a product.
  add : function () {
    if (shoppingCart.basketItems[this.dataset.id] == undefined) {
      shoppingCart.basketItems[this.dataset.id] = 1;
    } else {
      shoppingCart.basketItems[this.dataset.id]++;
    }
    //save and list the shoppingCart when adding the item to the basket.
    shoppingCart.save();
    shoppingCart.list();
  },

  //change property function allows to change the quantity.
  change : function () {
    //if statment checks to see if the number is equal to or smaller than 0 than delete the item from the basket.
    if (this.value <= 0) {
      delete shoppingCart.basketItems[this.dataset.id];
      //save and list the shoppingCart when adding the item to the basket.
      shoppingCart.save();
      shoppingCart.list();
    }

      //else updates the total depending on the items in the basket.
      //by adding the total with products quantity and multiplying it with product price.
    else {
      shoppingCart.basketItems[this.dataset.id] = this.value;
      var total = 0;
      for (let id in shoppingCart.basketItems) {
        total += shoppingCart.basketItems[id] * productsPets[id].price;
        document.getElementById("cart-total").innerHTML ="TOTAL: £" + total;
      }
    }
  },

  // remove property function allows user to remove item from the basket.
  remove : function () {
    delete shoppingCart.basketItems[this.dataset.id];
    //save and list the shoppingCart when adding the item to the basket.
    shoppingCart.save();
    shoppingCart.list();
  },

  //checkout function will pop up a thank you message for shopping.
  checkout : function () {

    alert("Thank you for shopping at my pet shop.");

  }
};
window.addEventListener("DOMContentLoaded", shoppingCart.start);

