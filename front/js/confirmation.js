//Confirmation de la commande

const orderDiv = document.getElementById("orderId");

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");


if (orderId) {
  orderDiv.innerHTML = orderId;
  const storage = window.localStorage;
  storage.clear();
}