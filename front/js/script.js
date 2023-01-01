
let urlApi = 'http://localhost:3000/api/products/'
let nomArticle = document.querySelector('.items h3')
let descriptionArticle = document.querySelector('.productDescription')
let imgArticle = document.querySelector('.items img')

fetch(urlApi)
    .then(function (response) {
        response.json().then(function (products) {
            console.log(products);


            for (let i = 0; i < products.length; i++) {

                let idKanap = products[i]._id



                const newFiche = document.querySelector('#items');

                //Creation de la balise a
                const newKanapLink = document.createElement('a');
                newKanapLink.href = "./product.html?id=" + idKanap

                //Creation de la balise article 
                const newKanap = document.createElement('article');

                //Creation de la balise image
                const imgKanap = document.createElement('img');
                imgKanap.src = products[i].imageUrl;
                imgKanap.alt = products[i].altTxt;
                // Creation de la balise h3 pour le nom

                const nomKanap = document.createElement('h3');
                nomKanap.innerText = products[i].name;

                //Creation de la balise p pour la description
                const desKanap = document.createElement('p');
                desKanap.innerText = products[i].description;


                newKanapLink.appendChild(newKanap)
                newFiche.appendChild(newKanapLink)
                newKanap.appendChild(imgKanap)
                newKanap.appendChild(nomKanap)
                newKanap.appendChild(desKanap)

            }






        })
    })

    .catch(function () {
        console.log("Erreur de connexion");
    })
 // injecter les produits dans le html
         //POUR CHAQUE element de i je veux CREER une nouvelle fiche et afficher l'image, le nom et la description
         // créer une fonction qui va ajouter une fiche produit
         //