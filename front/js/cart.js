let panier = JSON.parse(localStorage.getItem('panier'))


let urlApi = 'http://localhost:3000/api/products'
fetch(urlApi)
    .then(function (response) {
        response.json().then(function (products) {

            //Fonction pour rafraichir le panier à chaque modification de quantité
            function RefreshCart() {
                const cartItems = document.querySelector('#cart__items');
                cartItems.innerHTML = ''
                let panier = JSON.parse(localStorage.getItem('panier'))

                let quantitesPanier = []
                let prixPanier = []

                for (let i = 0; i < panier.length; i++) {
                    let idProduitPanier = panier[i][0]
                    let couleurProduitChoisie = panier[i][1]
                    let quantityProdPanier = panier[i][2]

                    //----------RECHERCHE DU PRODUIT dans le localstorage GRACE à L'ID------------//


                    const ficheProduitRetrouve = products.find((element) => element._id === idProduitPanier);
                    //console.log(ficheProduitRetrouve._id, ficheProduitRetrouve.name, quantityProdPanier, ficheProduitRetrouve.price, ficheProduitRetrouve.price * quantityProdPanier)

                    ///---------Creation du tableau des quantités dans le panier------------//
                    let totalPrixParQuantite = ficheProduitRetrouve.price * quantityProdPanier

                    quantitesPanier.push(quantityProdPanier)
                    prixPanier.push(totalPrixParQuantite)




                    //-----------------Affichage des elements présents dans le local storage------------------//



                    //Creation d'une balise article
                    const produit = document.createElement('article');
                    produit.className = 'cart__item'
                    produit.dataset.id = ficheProduitRetrouve._id
                    produit.dataset.color = couleurProduitChoisie

                    //Création d'une balise image dans la class cart__item__img
                    const divProduit = document.createElement('div')
                    divProduit.className = 'cart__item__img';
                    const imageProduit = document.createElement('img')
                    imageProduit.src = ficheProduitRetrouve.imageUrl

                    //Création d'une balise h2(nom du produit) cart__item__content
                    const divItemContent = document.createElement('div')
                    divItemContent.className = 'cart__item__content'

                    const divItemContentDescription = document.createElement('div')
                    divItemContentDescription.className = 'cart__item__content__description'

                    const nomProduit = document.createElement('h2')
                    nomProduit.innerText = ficheProduitRetrouve.name
                    //Création p(couleur du produit) cart__item__content
                    const couleurProduit = document.createElement('p')
                    couleurProduit.innerText = couleurProduitChoisie

                    //Création p(prix du produit) dans cart__item__content
                    const prixProduit = document.createElement('p')
                    prixProduit.innerText = ficheProduitRetrouve.price + '€'

                    //Création d'une balise p (Qté : ) dans cart__item__content__settings__quantity
                    const settingsProduit = document.createElement('div')
                    settingsProduit.className = 'cart__item__content__settings'
                    const settingsQuantiteProduit = document.createElement('div')
                    settingsQuantiteProduit.className = 'cart__item__content__settings__quantity'
                    const quantityProduit = document.createElement('p')
                    quantityProduit.innerText = 'Qté : '
                    //creation de l'input
                    const inputQuantite = document.createElement('input')
                    inputQuantite.type = 'number'
                    inputQuantite.className = 'itemQuantity'
                    inputQuantite.name = 'itemQuantity'
                    inputQuantite.min = '1'
                    inputQuantite.max = '100'
                    inputQuantite.value = quantityProdPanier



                    //Création d'un bouton supprimer
                    const deleteSettings = document.createElement('div')
                    deleteSettings.className = 'cart__item__content__settings__delete'
                    const boutonDelete = document.createElement('p')
                    boutonDelete.className = 'deleteItem'
                    boutonDelete.innerText = 'Supprimer'

                    //Imbriquer les elements HTML

                    cartItems.appendChild(produit)
                    produit.appendChild(divProduit)
                    divProduit.appendChild(imageProduit)
                    produit.appendChild(divItemContent)
                    divItemContent.appendChild(divItemContentDescription)
                    divItemContentDescription.appendChild(nomProduit)
                    divItemContentDescription.appendChild(couleurProduit)
                    divItemContentDescription.appendChild(prixProduit)
                    divItemContent.appendChild(settingsProduit)
                    settingsProduit.appendChild(settingsQuantiteProduit)
                    settingsQuantiteProduit.appendChild(quantityProduit)
                    settingsQuantiteProduit.appendChild(inputQuantite)
                    settingsProduit.appendChild(deleteSettings)
                    deleteSettings.appendChild(boutonDelete)


                    //--------------------FIN de l'AFFICHAGE DES ELEMENTS présents dans le LOCALSTORAGE-------------------//




                    //----------Changement de quantité-------//
                    inputQuantite.addEventListener('change', () => {

                        // console.log(inputQuantite.value)
                        console.log(panier[i])
                        let nouvelleQ = parseInt(inputQuantite.value)
                        let produitModifier = [idProduitPanier, couleurProduitChoisie, nouvelleQ]


                        if (nouvelleQ <= 100 && nouvelleQ > 0) {
                            let produitTrouve = panier.find(function (produitModifier) {

                                if (idProduitPanier === produitModifier[0] && couleurProduitChoisie === produitModifier[1]) {

                                    return true

                                }


                                return false

                            })

                            if (produitTrouve != undefined || produitTrouve === true) {

                                produitTrouve[2] = produitModifier[2]

                            } else {
                                panier.push(produitModifier)
                            }


                        }




                        let Panier = localStorage.setItem('panier', JSON.stringify(panier))
                        RefreshCart()
                        //location.reload();

                    })

                    ///////---------EVENEMENT clique sur bouton supprimer-------////
                    let suppressionArticle = boutonDelete.addEventListener('click', event => {
                        // localStorage.removeItem(panier[i])
                        let produitASupprimer = panier.filter(function (produit) {
                            if (produit != panier[i]) {

                                return true

                            }


                        })

                        localStorage.setItem('panier', JSON.stringify(produitASupprimer))
                        RefreshCart()
                        // location.reload();
                        console.log(produitASupprimer)



                    })

                    ///////---------FIN evenement clique sur bouton supprimer-------////

                }

                let totalQuantityPanier = quantitesPanier.reduce((a, b) => a + b, 0);
                let totalPrixPanier = prixPanier.reduce((a, b) => a + b, 0);

                //////--------Affichage-totaux-------------//
                const totalQuantitesCommandees = document.querySelector('#totalQuantity')
                totalQuantitesCommandees.innerText = totalQuantityPanier
                const totalPrixCommandees = document.querySelector('#totalPrice')
                totalPrixCommandees.innerText = totalPrixPanier
            }

            RefreshCart()
        })



    })





    .catch(function () {
        console.log("Erreur de connexion");
    })


//////-------FORMULAIRE-------/////


///----ENVOI DES ELEMENTS DU FORMULAIRE AU LOCALSTORAGE-----////
let btnFormulaire = document.querySelector('.cart__order__form__submit')

btnFormulaire.addEventListener('click', event => {

    event.preventDefault()

    let contact = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,


    }

    let controlePrenom = contact.firstName
    let controleNom = contact.lastName
    // let controleAdresse = contact.address
    //let controleVille = contact.city
    let controleEmail = contact.email







    ////--CONTROLES des informations renseignés par le client---///

    function ControleValiditePrenom() {

        if (/^[a-zA-Z\-]+$/.test(controlePrenom)) {
            console.log('Yes prenom')
            return true

        } else {
            document.querySelector('#firstNameErrorMsg').textContent = 'Veuillez corriger le prenom'

            return false
        }

    }

    function ControleValiditeNom() {

        if (/^[a-zA-Z\ '-]+$/.test(controleNom)) {

            console.log('C\'est ok')
            return true

        } else {
            document.querySelector('#lastNameErrorMsg').textContent = 'Veuillez corriger le nom'
            console.log('Veuillez corriger le nom')
            return false
        }

    }





    function ControleValiditeEmail() {

        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(controleEmail)) {

            console.log('C\'est ok')
            return true

        } else {
            document.querySelector('#emailErrorMsg').textContent = 'Veuillez indiquer un email valide'
            console.log('Veuillez indiquer un email valide')
            return false
        }

    }

    if (ControleValiditePrenom() && ControleValiditeNom() && ControleValiditeEmail()) {
        localStorage.setItem('contact', JSON.stringify(contact))


    } else {
        return 
        //event.preventDefault()
    }

    //localStorage.setItem('contact', JSON.stringify(contact))


    //----Récuperation des id des produits du panier----///
    let product_ids = []
    for (let i = 0; i < panier.length; i++) {
        product_ids.push(panier[i][0])

    }
    let payload = { contact, products: product_ids }

    //---Envoi des informations contact et ids des produits à l'API----//

    let urlApiCommande = 'http://localhost:3000/api/products/order'
    fetch(urlApiCommande, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        }
    
    }).then(res => {
        console.log(res)
        return res.json()
    }).then(res => {
        console.log(res.orderId)
        localStorage.clear()
        window.location.href = 'confirmation.html?orderId=' + res.orderId
    })


})
