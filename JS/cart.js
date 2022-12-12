let carts = document.querySelectorAll(".add-cart");
let products = [
  { id: 1, course: "FREE DIVING/ INTRODUCTION", price: 90, inCart: 0 },

  {
    id: 2,
    course: "FREE DIVING/ LEVEL 1",
    price: 325,
    inCart: 0,
    count: 1,
  },

  {
    id: 3,
    course: "FREE DIVING/ LEVEL 2",
    price: 480,
    inCart: 0,
    count: 1,
  },

  {
    id: 4,
    course: "WIND SURFING/ BEGINNERS COURSE",
    price: 60,
    inCart: 0,
    count: 1,
  },

  {
    id: 5,
    course: "WIND SURFING/ INTERMEDIATE COURSE",
    price: 100,
    inCart: 0,
    count: 1,
  },

  {
    id: 6,
    course: "RENT A WIND SURF",
    price: 35,
    inCart: 0,
    count: 1,
  },

  {
    id: 7,
    course: "KAYAKING/ BEGINNERS COURSE",
    price: 200,
    inCart: 0,
    count: 1,
  },

  {
    id: 8,
    course: "KAYAKING/ EXLORE",
    price: 100,
    inCart: 0,
    count: 1,
  },

  {
    id: 9,
    course: "RENT A KAYAK",
    price: 40,
    inCart: 0,
    count: 1,
  },
];
// window.localStorage.removeItem("productsInCarts");
// window.localStorage.setItem("productsInCarts", products);

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.getElementsByClassName(".counter").textContent = productNumbers;
  }
}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".counter").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementsByClassName(".counter").textContent = 1;
  }

  setItems(products);
}

function setItems(products) {
  let cartItems = localStorage.getItem("productsInCarts");
  cartItems = JSON.parse(cartItems);

  if (cartItems !== null) {
    if (cartItems[products.course] == undefined) {
      cartItems = {
        ...cartItems,
        [products.course]: products,
      };
    }
    cartItems[products.course].inCart += 1;
  } else {
    products.inCart = 1;

    cartItems = {
      [products.course]: products,
    };
  }
  localStorage.setItem("productsInCarts", JSON.stringify(cartItems));
}

function totalCost(products) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + products.price);
  } else {
    localStorage.setItem("totalCost", products.price);
  }
}
function DeleteFromCart(item) {
  let cartItem = localStorage.getItem("productsInCarts");
  let AllProducts = JSON.parse(cartItem);
  let FilterProducts = Object.values(AllProducts).filter(
    (ele) => ele.course !== item.course
  );
  //   console.log({ ...cartItem });
  console.log(JSON.stringify({ ...FilterProducts }));
  localStorage.setItem(
    "productsInCarts",
    JSON.stringify({ ...FilterProducts })
  );
}

function displayCart() {
  let cartItem = localStorage.getItem("productsInCarts");
  cartItem = JSON.parse(cartItem);
  let productsContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  //   console.log(cartItem);

  productsContainer.innerHTML = "";
  Object.values(cartItem).map((item) => {
    let product = document.createElement("div");
    product.className = "product";
    let spanCourse = document.createElement("span");
    spanCourse.innerHTML = `COURSE: ${item.course}`;
    let Deletebutton = document.createElement("img");
    Deletebutton.className = "clear-cart-button";
    Deletebutton.src = "./images/close.png";
    Deletebutton.addEventListener("click", () => {
      DeleteFromCart(item);
      product.style.display = "none";
    });
    let price = document.createElement("div");
    price.className = "price";
    price.textContent = `${item.price},00EUR`;
    price.id = item.id;
    let quantity = document.createElement("div");
    quantity.className = "quantity";
    let decrease = document.createElement("img");
    decrease.src = "./images/arrow-left.png";
    decrease.className = "decrease";
    decrease.addEventListener("click", () => {
      let count = parseInt(QUANTITYSpan.textContent);
      if (count > 0) {
        QUANTITYSpan.textContent = count - 1;
      }
      //    else {
      //     QUANTITYSpan.textContent = 1;

      //     console.log(count--);
      //   }
    });
    let QUANTITYSpan = document.createElement("span");
    QUANTITYSpan.textContent = `${item.count}`;
    let increase = document.createElement("img");
    increase.src = "./images/arrow-right.png";
    increase.className = "increase";
    increase.addEventListener("click", () => {
      let count = parseInt(QUANTITYSpan.textContent);
      console.log(count);
      //   let count = item.count++;
      QUANTITYSpan.textContent = count + 1;
    });
    product.appendChild(spanCourse);
    product.appendChild(Deletebutton);
    product.appendChild(price);
    quantity.appendChild(decrease);
    quantity.appendChild(QUANTITYSpan);
    quantity.appendChild(increase);
    product.appendChild(quantity);
    productsContainer.appendChild(product);

    //   Deletebutton.addEventListener("click", () => {
    //     console.log(item);
    //   });
    //    productsContainer.innerHTML += `

    //     <div class="product">
    //        <span>COURSE: ${item.course}</span>
    //        <img class="clear-cart-button id="${
    //          item.id
    //        }" src="./images/close.png" onclick="${DeleteFromCart}" />
    //     </div>

    //     <div class="price">PRICE: ${item.price},00EUR</div>

    //     <div class="quantity">
    //       <img src="./images/arrow-left.png" class="decrease" onclick=""/>
    //       <span> QUANTITY: ${item.inCart}</span>
    //       <img src="./images/arrow-right.png" class="increase"/>
    //     </div>

    //     <div class="total">
    //     TOTAL: ${item.inCart * item.price},00EUR
    //     </div>
    //     <br>
    //     `;
  });

  let basketTotalContainer = document.createElement("div");
  basketTotalContainer.className = "basketTotalContainer";
  let basketTotalTitel = document.createElement("h4");
  basketTotalTitel.className = "basketTotalTitel";
  basketTotalTitel.textContent = ` BASKET TOTAL:${
    Object.values(cartItem).length
  }`;
  let basketTotal = document.createElement("h4");
  basketTotal.className = "basketTotal";
  basketTotal.textContent = ` ${cartCost},00EUR`;
  basketTotalContainer.appendChild(basketTotalTitel);
  basketTotalContainer.appendChild(basketTotal);
  productsContainer.appendChild(basketTotalContainer);
  //   productsContainer.appendChild(basketTotalContainer)
  //   productsContainer.appendChild(basketTotalContainer)
  //   productsContainer.innerHTML += `
  //        <div class = "basketTotalContainer">
  //           <h4 class = "basketTotalTitel">
  //              BASKET TOTAL:${Object.values(cartItem).length}
  //           </h4>
  //           <h4 class = "basketTotal">
  //              ${cartCost},00EUR
  //           </h4>
  //         </div>
  //     `;
}

onLoadCartNumbers();
displayCart();
