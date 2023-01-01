//recuperation de orderId dans l'url

let urlConfirmation = window.location.search
let params = new URLSearchParams(urlConfirmation)
let idOrder = params.get('orderId')


//Affichage du numero de commande 

let urlApi = 'http://localhost:3000/api/products/order/orderId' + idOrder
let confirmation = document.querySelector('#orderId')
confirmation.innerText = idOrder
