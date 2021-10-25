// console.log(JSON.parse(localStorage.cart));
let cart = JSON.parse(localStorage.cart);
// console.log(cart);
const cartItems = document.getElementById("cart__items");
// console.log(cartItems);
const totalQuantity = document.getElementById("totalQuantity");
console.log(totalQuantity);
const totalPrice = document.getElementById("totalPrice");
console.log(totalPrice);

cartItems.innerHTML = cart
  .map(
    (product) => `
    <article class="cart__item" data-id="${product._id}">
    <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
    <h2>${product.name}</h2>
    <p>${product.price * product.quantity} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="item__content__settings__color">
    <p>Color : ${product.selectedColor}</p>  
    </div>
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
      product.quantity
    } onchange="changeQuantity(event,'${product._id}')">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onClick="deletProduct('${product._id}','${
      product.selectedColor
    }');">Supprimer</p>
    </div>
    </div>
    </div>
    </article>  `
  )
  .join("");

const deletProduct = (productId, productColor) => {
  //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
  cart = cart.filter(
    (item) => item._id != productId && item.selectedColor != productColor
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  location.reload()
};

// for (i of cart) {
//     console.log(i.price);
//     console.log(i.quantity);
//     i.price = i.price*i.quantity;
//     console.log(i.price*i.quantity);
//     console.log(cart);
//   }
const changeQuantity = (e, productId) => {
  console.log(e.target.value);
  for (i of cart) {
    // console.log(i._id);
    // console.log(productId);
    if (i._id === productId) {
      i.quantity = e.target.value;
    }
    // totalPrice += i.price * i.quantity;
    // console.log(i.price * i.quantity);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload()
};


