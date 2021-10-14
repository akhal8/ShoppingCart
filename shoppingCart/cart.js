var shoppingCart = {
  // (A) PROPERTIES
  // hPdt : null, // HTML products list
  listHtml : null, // products list access from the HTML.
  //hItems : null, // HTML current cart
  showItems : null, // Current cart situation 0, 1 or more.
  //items : {}, // Current items in cart
  basketItems : {}, // Items in the shopping cart selected by the user.
  //iURL : "images/", // Product image URL folder
  imageURL : "images/", // Product Image address from the folder that is selected by the user or listed to sell.


  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save : function () {
    localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart.basketItems));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load : function () {
    shoppingCart.basketItems = localStorage.getItem("shoppingcart");
    if (shoppingCart.basketItems == null) { shoppingCart.basketItems = {}; }
    else { shoppingCart.basketItems = JSON.parse(shoppingCart.basketItems); }
  },

  // (B3) EMPTY ENTIRE CART
  nuke : function () {
    if (confirm("Empty cart?")) {
      shoppingCart.basketItems = {};
      localStorage.removeItem("shoppingcart");
      shoppingCart.list();
    }
  },

  // (C) INITIALIZE
  init : function () {
    // (C1) GET HTML ELEMENTS
    shoppingCart.listHtml = document.getElementById("cart-products");
    shoppingCart.showItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    shoppingCart.listHtml.innerHTML = "";
    let p, item, part;
    for (let id in productsPets) {
      // WRAPPER
      p = productsPets[id];
      item = document.createElement("div");
      item.className = "p-item";
      shoppingCart.listHtml.appendChild(item);

      // PRODUCT IMAGE
      part = document.createElement("img");
      part.src = shoppingCart.imageURL + p.img;
      part.className = "p-img";
      item.appendChild(part);

      // PRODUCT NAME
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);

      // PRODUCT DESCRIPTION
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);

      // PRODUCT PRICE
      part = document.createElement("div");
      part.innerHTML = "$" + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // ADD TO CART
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.className = "shoppingcart p-add";
      part.onclick = shoppingCart.add;
      part.dataset.id = id;
      item.appendChild(part);
    }

    // (C3) LOAD CART FROM PREVIOUS SESSION
    shoppingCart.load();

    // (C4) LIST CURRENT CART ITEMS
    shoppingCart.list();
  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
  list : function () {
    // (D1) RESET
    shoppingCart.showItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in shoppingCart.basketItems) {
      if(shoppingCart.basketItems.hasOwnProperty(key)) { empty = false; break; }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "shoppingCart is empty";
      shoppingCart.showItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p, total = 0, subtotal = 0;
      for (let id in shoppingCart.basketItems) {
        // ITEM
        p = productsPets[id];
        item = document.createElement("div");
        item.className = "c-item";
        shoppingCart.showItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        part.addEventListener("click", shoppingCart.remove);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = shoppingCart.basketItems[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", shoppingCart.change);
        item.appendChild(part);

        // SUBTOTAL
        subtotal = shoppingCart.basketItems[id] * p.price;
        total += subtotal;
      }

      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: $" + total;
      shoppingCart.showItems.appendChild(item);

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", shoppingCart.nuke);
      item.className = "c-empty cart";
      shoppingCart.showItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", shoppingCart.checkout);
      item.className = "c-checkout cart";
      shoppingCart.showItems.appendChild(item);
    }
  },

  // (E) ADD ITEM INTO CART
  add : function () {
    if (shoppingCart.basketItems[this.dataset.id] == undefined) {
      shoppingCart.basketItems[this.dataset.id] = 1;
    } else {
      shoppingCart.basketItems[this.dataset.id]++;
    }
    shoppingCart.save();
    shoppingCart.list();
  },

  // (F) CHANGE QUANTITY
  change : function () {
    // (F1) REMOVE ITEM
    if (this.value <= 0) {
      delete shoppingCart.basketItems[this.dataset.id];
      shoppingCart.save();
      shoppingCart.list();
    }

    // (F2) UPDATE TOTAL ONLY
    else {
      shoppingCart.basketItems[this.dataset.id] = this.value;
      var total = 0;
      for (let id in shoppingCart.basketItems) {
        total += shoppingCart.basketItems[id] * productsPets[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: $" + total;
      }
    }
  },

  // (G) REMOVE ITEM FROM CART
  remove : function () {
    delete shoppingCart.basketItems[this.dataset.id];
    shoppingCart.save();
    shoppingCart.list();
  },

  // (H) CHECKOUT
  checkout : function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("TO DO");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  }
};
window.addEventListener("DOMContentLoaded", shoppingCart.init);

