async function main() {
    const baliseSection= document.getElementById("items");
    const products= await getProducts();
    for (product of products) {
        baliseSection.insertAdjacentHTML("beforeend", `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `);
    }
}

function getProducts() {
    return fetch("http://localhost:3000/api/products")
    .then(function(httpResponseBody) {
        return httpResponseBody.json();
    })
    .then(function(products) {
        console.log(products);
        return products;
    })
    .catch( function(error) {
        alert(Error);
        return [];
    })
}

main();