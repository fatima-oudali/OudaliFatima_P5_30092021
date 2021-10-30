//Récupérer les paramètres d'URL
//méthode pour extraire l'id

console.log(window.location.search); //?id=...
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id); //l'id du produit sélectionné

//Insérer un produit et ses détails dans la page produit
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

    // Evenement au click du bouton "Ajouter au panier"
    addToCart.addEventListener("click", () => {
      addProductToCart(data);
    });
  });

//La fonction qui gère l'ajout au panier
const addProductToCart = (product) => {

  //Message alert si la couleur du produit sélectionné n'est pas renseignée
  product.selectedColor = colors.value;
  if (product.selectedColor == "") {
    return alert("Veuillez choisir une couleur");
  }

  //Message alert si la quantité du produit sélectionné n'est pas renseignée
  let quantity = parseInt(document.getElementById("quantity").value);
  product["quantity"] = quantity;
  if (quantity <= 0) {
    return alert("Veuillez renseigner une quantité supérieure à zéro");
  }

  //On vérifie le contenu du localStorage
  let jsonCart = localStorage.getItem("cart");
  console.log(jsonCart);

  //Si le panier est vide (il n y a rien dans le localStorage), on ajoute le produit sélectionné dans le panier
  if (jsonCart == null) {
    let cartItems = [];
    cartItems.push(product); 

    //Ensuite on convertit le tableau en json afin de pouvoir l'insérer dans le localStorage
    jsonCart = JSON.stringify(cartItems); 
    localStorage.setItem("cart", jsonCart);

    //Si le tableau(panier) n'est pas vide, on le convertit alors en objet javascript afin de pouvoir lui ajouter le produit sélectionné par l'utilisateur
  } else {
    cartItems = JSON.parse(jsonCart);
    //Avant d'ajouter le produit dans le tableau(panier), on vérifie si ce produit est déja présent dans le panier ou pas
    const hasColor = cartItems.filter(
      //on parcours le tableau (cartItems), et on vérifie (par l'id et la couleur) s'il contient l'élément sélectionné 
      //le tableau retourné est vide si l'élément sélectionné n'est pas présent dans le tableau(cartItems)
      //sinon le tableau retourné contient l'élément recherché 
        (x) =>
          x._id === product._id && x.selectedColor === product.selectedColor 
      )
    //si le tableau retourné n'est pas vide, on incrémente la quantité du produit correspondant dans le tableau
    if (hasColor && hasColor.length) {
      hasColor[0].quantity += quantity;

      //Sinon on ajoute dans le tableau, ce produit sélectionné par l'utilisateur
    } else {
      cartItems.push(product); 
      console.log(cartItems);
    }

    //Ensuite on convertit le tableau en json afin de pouvoir l'insérer dans le localStorage
    jsonCart = JSON.stringify(cartItems);
    localStorage.setItem("cart", jsonCart);
  }
};
