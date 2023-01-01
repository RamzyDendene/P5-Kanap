// Récuperation de l'id produit au niveau de l'url

let urlEnCours = window.location.search
let params = new URLSearchParams(urlEnCours)
let idKanap = params.get('id')


//Appel API pour le produit correspondant à l'id

let urlApi = 'http://localhost:3000/api/products/' + idKanap

fetch(urlApi)
    .then(function (response) {
        response.json().then(function (products) {
            //console.log(products);
            let nomArticle = document.querySelector('head title')
            nomArticle.innerText = products.name

            const tableauCol = products.colors

            //Affichage du nom du produit
            let nomProduit = document.querySelector('#title')
            nomProduit.textContent = products.name
            //Affichage de l'image
            let imgProduit = document.querySelector('.item__img img')
            imgProduit.src = products.imageUrl
            imgProduit.alt = products.altTxt
            //Affichage description
            let desProduit = document.querySelector('#description')
            desProduit.textContent = products.description
            //Affichage Prix
            let prixProduit = document.querySelector('#price')
            prixProduit.textContent = products.price

            let elColors = document.querySelector('#colors')
            let elQuantity = document.querySelector('#quantity')

            //Affichage liste des couleurs

            for (let i = 0; i < tableauCol.length; i++) {
                let couleurProduit = document.createElement('option')
                couleurProduit.value = tableauCol[i];
                couleurProduit.innerText = tableauCol[i];
                elColors.appendChild(couleurProduit)

            }




            //Ajout id du produit au panier
            let produitsCommandes = JSON.parse(localStorage.getItem('panier'))
            if (produitsCommandes === null) {
                produitsCommandes = []

            }


            const ajoutProduit = document.querySelector('#addToCart')
            ajoutProduit.addEventListener('click', event => {


                //Récupérer la couleur selectionnée par le client

                let couleurChoisie = elColors.value

                // Récuperer la quantité selectionnée 
                let quantity = parseInt(elQuantity.value)

                // Création d'un tableau de produits et Ajout des informations au tableau
                let produit = [idKanap, couleurChoisie, quantity]


                // Ajout du produit si la couleur et la quantité sont definies 




                //Conditions dans les erreurs couleur et quantité 
                if (couleurChoisie != '' && (quantity > 100 || quantity <= 0)) {
                    alert('La quantité doit être comprise entre 1 et 100 pièces')

                } else if (couleurChoisie == '' && (quantity > 100 || quantity <= 0)) {
                    alert('Veuillez choisir une couleur et indiquer une quantité entre 1 et 100 pièces')


                } else if (couleurChoisie == '' && (quantity < 100 || quantity > 0)) {
                    alert('Veuillez choisir une couleur')
                }




                //au CLIQUE si le produit (id et couleur) sont déjà présents dans le panier alors j'ajoute la quantité au produit existant,
                //SINON j'ajoute un nouveau produit 

                console.log(idKanap, couleurChoisie)
                if (couleurChoisie != '' && (quantity <= 100 && quantity > 0)) {
                    let produitTrouve = produitsCommandes.find(function (produit) {

                        if (idKanap === produit[0] && couleurChoisie === produit[1]) {

                            return true

                        }

                        console.log(42, produit)
                        return false

                    })

                    if (produitTrouve != undefined || produitTrouve === true) {
                        console.log(46, 'trouvé')
                        produitTrouve[2] = produit[2] + produitTrouve[2]

                    } else {
                        produitsCommandes.push(produit)
                    }





                    // console.log(45, produitTrouve)




                }





                let ajoutPanier = localStorage.setItem('panier', JSON.stringify(produitsCommandes))

                const popUp = function () {
                    if (window.confirm("L'article a bien été ajouté au panier, \nvoir votre panier cliquez sur OK \npoursuivre vos achats cliquez sur ANNULER")) {
                        window.location.href = 'cart.html'
                    } else {
                        window.location.href = 'index.html'
                    }
                }
                popUp()
            })





        })
    })
    .catch(function () {
        console.log("Erreur de connexion");
    })


