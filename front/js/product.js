//Récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//Affichage du produit qui a été sélectionné par l'id

let response = fetch (`http://localhost:3000/api/products/${id}`).then((res) => {
    return res.json();
}).then((data)=> {
    console.log(data);
    document.querySelector(".item__img").innerHTML = `
    <img src=${data.imageUrl} alt=${data.altTxt}>`
    document.getElementById("title").innerHTML = `
    ${data.name}`
    document.getElementById("price").innerHTML = `
    ${data.price}`
    document.getElementById("description").innerHTML = `
    ${data.description}`
    const colorSelect = document.getElementById("colors");
    for( color of data.colors ) {
        colorSelect.innerHTML += `
        <option value=${color}>${color}</option>`
    }
});

// --------La gestion du panier ------------------
// La récupération des données sélectionnées par l'utilisateur et envoie du panier

//Sélection de l'id du formulaire







