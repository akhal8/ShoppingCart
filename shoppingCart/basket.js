var shoppingBasket = {
    // change from cart to shopppingBasket
    // (A) PROPERTIES
    //hPdt
    listHtml : null, // products list access from the HTML.
    //hitems
    showItems : null, // Current cart situation 0, 1 or more.
    //Items
    basketItems : {}, // Items in the shopping cart selected by the user.
    imageURL : "images/", // Product Image address from the folder that is selected by the user or listed to sell.
  
  
  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  // https://www.youtube.com/watch?v=GihQAC1I39Q
  save : function () {
    localStorage.setItem("cart", JSON.stringify(shoppingBasket.basketItems));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load : function () {
    shoppingBasket.basketItems = localStorage.getItem("shoppingBasket");
    if (shoppingBasket.basketItems == null) { shoppingBasket.basketItems = {}; }
    else { shoppingBasket.basketItems = JSON.parse(shoppingBasket.basketItems); }
  },

  // (B3) EMPTY ENTIRE CART
  nuke : function () {
    if (confirm("Empty cart?")) {
      shoppingBasket.basketItems = {};
      localStorage.removeItem("cart");
      shoppingBasket.list();
    }
  },
// (C) INITIALIZE
init : function () {
  // (C1) GET HTML ELEMENTS
  shoppingBasket.listHtml = document.getElementById("cart-products");
  shoppingBasket.showItems = document.getElementById("cart-items");

  // (C2) DRAW PRODUCTS LIST
  shoppingBasket.listHtml.innerHTML = "";
  let p, item, part;
  for (let id in products) {
    // WRAPPER
    p = products[id];
    item = document.createElement("div");
    item.className = "p-item";
    cart.hPdt.appendChild(item);

    // PRODUCT IMAGE
    part = document.createElement("img");
    part.src = shoppingBasket.imageURL + p.img;
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
    part.innerHTML = "Â£" + p.price;
    part.className = "p-price";
    item.appendChild(part);
  
    // ADD TO CART
    part = document.createElement("input");
    part.type = "button";
    part.value = "Add to Cart";
    part.className = "cart p-add";
    part.onclick = cart.add;
    part.dataset.id = id;
    item.appendChild(part);
        }
    
    // (C3) LOAD CART FROM PREVIOUS SESSION
    shoppingBasket.load();
    
    // (C4) LIST CURRENT CART ITEMS
    shoppingBasket.list();
    },
    
      // (D) LIST CURRENT CART ITEMS (IN HTML)
      list : function () {
        // (D1) RESET
        shoppingBasket.showItems.innerHTML = "";
        let item, part, pdt;
        let empty = true;
        for (let key in shoppingBasket.basketItems) {
          if(shoppingBasket.baskeItems.hasOwnProperty(key)) { empty = false; break; }
        }
        // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      shoppingBasket.showItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p, total = 0, subtotal = 0;
      for (let id in shoppingBasket.basketItems) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        shoppingBasket.basketItems.appendChild(item);
    
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
                part.addEventListener("click", cart.remove);
                item.appendChild(part);
        
        // QUANTITY
          part = document.createElement("input");
                part.type = "number";
                part.min = 0;
                part.value = shoppingBasket.basketItems[id];
                part.dataset.id = id;
                part.className = "c-qty";
                part.addEventListener("change", cart.change);
                item.appendChild(part);
        
                // SUBTOTAL
                subtotal = shoppingBasket.basketItems[id] * p.price;
                total += subtotal;
              }
    // TOTAL AMOUNT
    item = document.createElement("div");
    item.className = "c-total";
    item.id = "c-total";
    item.innerHTML ="TOTAL: $" + total;
    shoppingBasket.showItems.appendChild(item);

    // EMPTY BUTTONS
    item = document.createElement("input");
    item.type = "button";
    item.value = "Empty";
    item.addEventListener("click", cart.nuke);
    item.className = "c-empty cart";
    shoppingBasket.showItems.appendChild(item);

    // CHECKOUT BUTTONS
    item = document.createElement("input");
    item.type = "button";
    item.value = "Checkout";
    item.addEventListener("click", cart.checkout);
    item.className = "c-checkout cart";
    shoppingBasket.showItems.appendChild(item);
  }
},

// (E) ADD ITEM INTO CART
add : function () {
  if (shoppingBasket.basketItems[this.dataset.id] == undefined) {
    shoppingBasket.basketItems[this.dataset.id] = 1;
  } else {
    shoppingBasket.basketItems[this.dataset.id]++;
  }
  cart.save();
  cart.list();
},

// (F) CHANGE QUANTITY
change : function () {
  // (F1) REMOVE ITEM
  if (this.value <= 0) {
    delete shoppingBasket.basketItems[this.dataset.id];
    cart.save();
    cart.list();
  }

  // (F2) UPDATE TOTAL ONLY
  else {
    shoppingBasket.basketItems[this.dataset.id] = this.value;
    var total = 0;
    for (let id in cart.items) {
      total += shoppingBasket.basketItems[id] * products[id].price;
      document.getElementById("c-total").innerHTML ="TOTAL: Â£" + total;
    }
  }
},
// (G) REMOVE ITEM FROM CART
remove : function () {
  delete shoppingBasket.basketItems[this.dataset.id];
  cart.save();
  cart.list();
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
window.addEventListener("DOMContentLoaded", shoppingBasket.init);