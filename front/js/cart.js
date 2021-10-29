// console.log(JSON.parse(localStorage.cart));
let cart = JSON.parse(localStorage.cart);
// console.log(cart);
const cartItems = document.getElementById("cart__items");
// console.log(cartItems);
let totalQuantity = document.getElementById("totalQuantity");
console.log(totalQuantity);
let totalPrice = document.getElementById("totalPrice");
let articles = 0;
let total = 0;

cartItems.innerHTML = cart
  .map((product) => {
    articles += product.quantity;
    totalQuantity.innerHTML = articles;
    total += product.price * product.quantity;
    console.log(total);
    totalPrice.innerHTML = total;

    return `
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
    } onchange="changeQuantity(event,'${product._id}', '${
      product.selectedColor
    }' )">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onClick="deletProduct('${product._id}','${
      product.selectedColor
    }');">Supprimer</p>
    </div>
    </div>
    </div>
    </article>  `;
  })
  .join("");

// Supprimer un produit du panier
const deletProduct = (productId, productColor) => {
  //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
  // cart = cart.filter(
  //   (item) => item._id != productId && item.selectedColor != productColor
  // );
  // localStorage.setItem("cart", JSON.stringify(cart));

  cart.splice(
    cart.findIndex(
      (item) => item._id === productId && item.selectedColor === productColor
    ),
    1
  );
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

//Changer la quantité des produits dans le panier
const changeQuantity = (e, productId, productColor) => {
  console.log(e.target.value);
  for (i of cart) {
    if (i._id === productId && i.selectedColor === productColor) {
      i.quantity = e.target.value;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

//LE FORMULAIRE
//Vérification de la validation des valeurs des inputs--- La valeur de l'input doit correspondre à son type

const validateForm = () => {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  firstName.addEventListener("change", (e) => {
    if (validateFirstName(e.target.value)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Le prénom ne doit contenir que des lettres";
    }
  });
  lastName.addEventListener("change", (e) => {
    if (validateLastName(e.target.value)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Le nom ne doit contenir que des lettres";
    }
  });
  address.addEventListener("change", (e) => {
    if (validateAddress(e.target.value)) {
      document.getElementById("addressErrorMsg").innerHTML = "";
    } else {
      document.getElementById("addressErrorMsg").innerHTML =
        "L'adresse doit être renseignée";
    }
  });
  city.addEventListener("change", (e) => {
    if (validateCity(e.target.value)) {
      document.getElementById("cityErrorMsg").innerHTML = "";
    } else {
      document.getElementById("cityErrorMsg").innerHTML =
        "La ville ne doit contenir que des lettres";
    }
  });
  email.addEventListener("change", (e) => {
    if (validateEmail(e.target.value)) {
      document.getElementById("emailErrorMsg").innerHTML = "";
    } else {
      document.getElementById("emailErrorMsg").innerHTML =
        "L'adresse email n'est pas valide";
    }
  });
};
validateForm();

const validateFirstName = (value) => {
  if (value.match(/^([^0-9]*)$/)) {
    return true;
  } else {
    return false;
  }
};
const validateLastName = (value) => {
  if (value.match(/^([^0-9]*)$/)) {
    return true;
  } else {
    return false;
  }
};
const validateAddress = (value) => {
  if (value) {
    return true;
  } else {
    return false;
  }
};
const validateCity = (value) => {
  if (value.match(/^([^0-9]*)$/)) {
    return true;
  } else {
    return false;
  }
};
const validateEmail = (value) => {
  if (value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
    return true;
  } else {
    return false;
  }
};

const order = document.getElementById("order");
console.log(order);

order.addEventListener("submit", (e) => {
  validateOnSend(e);
});

const validateOnSend = (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  if (
    validateFirstName(firstName) &&
    validateLastName(lastName) &&
    validateAddress(address) &&
    validateCity(city) &&
    validateEmail(email)
  ) {
    sendOrder({ firstName, lastName, address, city, email });
  } else {
    return;
  }
};

const sendOrder = (contact) => {
  const storage = window.localStorage;
  console.log(storage);
  const products = cart.map((x) => x._id);

  const data = {
    contact,
    products,
  };
  console.log(data);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      window.location.replace(`./confirmation.html?id=${res.orderId}`);
    })
    .catch((error) => console.log(error));
};
