//Affichage des objets récupérés

let products;
const items= document.getElementById("items");

const getProducts = () => {
  return fetch("http://localhost:3000/api/products")
    .then((res) =>  res.json())
    .catch((err) => console.log(err));
};

const displayProducts = async () => {
const data = await getProducts();

  items.innerHTML = data.map((product) => `
  <a href="./product.html?id=${product._id}">
    <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
    </article>
  </a>`
  ).join("");
};
displayProducts();
