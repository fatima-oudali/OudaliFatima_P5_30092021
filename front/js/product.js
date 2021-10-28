//Récupération de la chaine de requête dans l'url
//méthode pour extraire l'id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//Affichage du produit qui a été sélectionné par l'id

let response = fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.querySelector(".item__img").innerHTML = `
    <img src=${data.imageUrl} alt=${data.altTxt}>`;
    document.getElementById("title").innerHTML = `
    ${data.name}`;
    document.getElementById("price").innerHTML = `
    ${data.price}`;
    document.getElementById("description").innerHTML = `
    ${data.description}`;
    const colors = document.getElementById("colors");
    for (color of data.colors) {
      colors.innerHTML += `
        <option value=${color}>${color}</option>`;
    }
    //Bouton "Ajouter au panier"
    const addToCart = document.getElementById("addToCart");

    // Evenement au clique du bouton "Ajouter au panier"
    addToCart.addEventListener("click", () => {
      addProductToCart(data);
    });
  });

//La fonction qui gère l'ajout au panier
const addProductToCart = (product) => {
  product.selectedColor = colors.value;
  console.log(product);
  console.log(product.selectedColor);
  if (product.selectedColor == "") {
    return alert("Veuillez choisir une couleur");
  }
  let quantity = parseInt(document.getElementById("quantity").value);
  product["quantity"] = quantity;
  if (quantity <= 0) {
    return alert("Veuillez renseigner une quantité supérieure à zéro");
  }
  jsonCart = localStorage.getItem("cart");
  if (jsonCart == null) {
    let cartItems = []; //Panier
    cartItems.push(product); //Ajout du produit sélectionné au tableau (panier)
    jsonCart = JSON.stringify(cartItems); //convertir le tableau en json afin de pouvoir l'insérer dans le localStorage
    localStorage.setItem("cart", jsonCart);
  } else {
    cartItems = JSON.parse(jsonCart); //convertir le tableau en javascript afin de pouvoir lui ajouter le produit sélectionné par l'utilisateur
    const hasColor = cartItems.filter(
        (x) =>
          x._id === product._id && x.selectedColor === product.selectedColor
      )
      console.log(cartItems);
    if (hasColor && hasColor.length) {
      hasColor[0].quantity += quantity;
    } else {
      cartItems.push(product); //Ajout dans le tableau, le produit sélectionné par l'utilisateur
      console.log(cartItems);
    }
    jsonCart = JSON.stringify(cartItems);
    localStorage.setItem("cart", jsonCart);
  }
};
