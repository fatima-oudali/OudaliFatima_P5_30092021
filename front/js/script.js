
//Afficher tous les objets de la page
// async function main() {
//     const items= document.getElementById("items");
//     const products= await getProducts();
//     for (let product of products) {
//         items.insertAdjacentHTML("beforeend", `
//             <a href="./product.html?id=${product._id}">
//                 <article>
//                     <img src="${product.imageUrl}" alt="${product.altTxt}">
//                     <h3 class="productName">${product.name}</h3>
//                     <p class="productDescription">${product.description}</p>
//                 </article>
//             </a>
//         `);
//     }
//     console.log(product.imageUrl);
//     console.log(product.altTxt);
//     console.log(product.name);
//     console.log(product.description);
// }

// //Récupérer tous les objets de la page
// function getProducts() {
//     return fetch("http://localhost:3000/api/products")
//     .then(function(httpResponseBody) {
//         return httpResponseBody.json();
//     })
//     .then (function(products){
//         console.log(products);
//         return products;
//     })
//     .catch(function(error){
//         alert(error);
//         return [];
//     })
// }
// main();



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
  );
};
displayProducts();
