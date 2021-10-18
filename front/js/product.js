//Récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

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
    const colorSelect = document.getElementById("colors");
    for (color of data.colors) {
      colorSelect.innerHTML += `
        <option value=${color}>${color}</option>`;
    }
    //Bouton "Ajouter au panier"
    const addToCart = document.getElementById("addToCart");

    // Evenement au clique du bouton "Ajouter au panier"
    addToCart.addEventListener("click", (data) => {
      addProductToCart(data);
    });
  });

//La fonction qui gère l'ajout au panier
const addProductToCart = (product) => {
  jsonCart = localStorage.getItem("cart");
  if (jsonCart == null) {
    let cartItems = []; //Panier
    cartItems.push(product); //Ajout du produit sélectionné au tableau (panier)
    jsonCart = JSON.stringify(cartItems); //convertir le tableau en json afin de pouvoir l'insérer dans le localStorage
    localStorage.setItem("cart", jsonCart);
  } else {
    cartItems = JSON.parse(jsonCart);//convertir le tableau en javascript afin de pouvoir lui ajouter le produit sélectionné par l'utilisateur
    cartItems.push(product); //Ajout dans le tableau, le produit sélectionné par l'utilisateur
    jsonCart = JSON.stringify(cartItems);
    localStorage.setItem("cart", jsonCart);
  }
};
