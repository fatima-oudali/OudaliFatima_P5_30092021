//Page panier

//Récupération du panier(tableau) via le localStorage
const cart = JSON.parse(localStorage.cart);

const cartItems = document.getElementById("cart__items");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let articles = 0;
let total = 0;

//Parcourir le tableau 
cartItems.innerHTML = cart
  .map((product) => {
    //Créer et insérer le nombre d'articles dans la page panier
    articles += parseInt(product.quantity);
    totalQuantity.innerHTML = articles;
    console.log(articles);

    //Créer et insérer le prix total dans la page panier
    total += product.price * product.quantity;
    console.log(total);
    totalPrice.innerHTML = total;

    // Affichage d'un tableau récapitulatif des achats dans la page panier
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
  //Cibler l'id et la couleur du produit à suuprimer
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


//Observer le changement de quantité des produits dans le panier
const changeQuantity = (e, productId, productColor) => {
  e.preventDefault();
  console.log(e.target.value);
  //Cibler l'id et la couleur du produit à modifier
  for (i of cart) {
    if (i._id === productId && i.selectedColor === productColor) {
      i.quantity = e.target.value;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

//LE FORMULAIRE
//Récupérer et analyser les données saisies par l'utilisateur dans le formulaire
//Afficher un message d'erreur si besoin
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

const form = document.querySelector(".cart__order__form");

form.addEventListener("submit", (e) => {
  validateOnSend(e);
});

const validateOnSend = (event) => {
  event.preventDefault();
  //Constitution d'un objet contact à partir des données du formulaire
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
  //Constitution d'un tableau de produits
  const products = cart.map((x) => x._id);

  const data = {
    contact,
    products,
  };
  console.log(data);

  //requête POST sur l'API et récupération de l'id de commande dans la réponse de celle-ci
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      //rediriger l'utilisateur sur la page de confirmation, en passant l'id de commande dans l'URL afin d'afficher le numéro de commande
      window.location.replace(`./confirmation.html?id=${res.orderId}`); 
    })
    .catch((error) => console.log(error));
};
