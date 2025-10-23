const product = [
  ["Scarpe", 49.99, "https://picsum.photos/200"],
  ["T-shirt", 29.99, "https://picsum.photos/200"],
  ["Giacca", 79.99, "https://picsum.photos/200"],
  ["Pantaloni", 39.99, "https://picsum.photos/200"],
  ["Mattia", 39.99, "https://picsum.photos/200"],
  ["Carlino", 42.99, "https://picsum.photos/200"],
  ["Bogdan", 129.99, "https://picsum.photos/200"],
];

let card = document.getElementById("card");
let carrello = document.getElementById("cart-list");
let totale = document.getElementById("cart-total");

let quantitaPerProdotto = {};
let tot = 0;

function createCard() {
  for (let [nome, prezzo, immagine] of product) {
    let article = document.createElement("article");

    let quantita = document.createElement("input");
    quantita.type = "number";
    quantita.min = 1;
    quantita.value = 1;
    quantita.classList.add("quantita");

    let bottone = document.createElement("button");
    bottone.textContent = "Acquista ora";
    bottone.classList.add("card_button");

    bottone.addEventListener("click", function () {
      const prodotto = new CustomEvent('aggiuntaProdotto', {
        detail: {
          nome1: nome,
          prezzo1: prezzo,
          quantita1: quantita.value
        }
      });
      document.dispatchEvent(prodotto);
    });

    article.innerHTML = `
      <img src="${immagine}" alt="${nome}">
      <h2>${nome}</h2>
      <p>CHF ${prezzo}</p>
    `;

    article.append(quantita);
    article.append(bottone);
    card.append(article);
  }
}
createCard();

function aggiornaCarrello() {
  carrello.innerHTML = "";
  tot = 0;
  totale.textContent = "CHF 0.00";
}

function ricreaCarrello() {
  carrello.innerHTML = "";
  tot = 0;

  for (let prodotto in quantitaPerProdotto) {
    let q = quantitaPerProdotto[prodotto].quantita;
    let p = quantitaPerProdotto[prodotto].prezzo;

    let remove = document.createElement("button");
    remove.textContent = "Rimuovi";
    remove.classList.add("remove_button");

    remove.addEventListener("click", function () {
      delete quantitaPerProdotto[prodotto];
      aggiornaCarrello();
      ricreaCarrello();
    });

    let nuovo_li = document.createElement("li");
    nuovo_li.style.marginBottom = "10px";
    nuovo_li.innerHTML = `
      ${prodotto}: 
      <span style="margin-left: 10px;">x${q}</span>
      <span style="float: right;">CHF ${(p * q).toFixed(2)}</span>
    `;

    nuovo_li.append(remove);
    carrello.append(nuovo_li);
    tot += p * q;
  }

  totale.textContent = `CHF ${tot.toFixed(2)}`;
}

document.addEventListener("aggiuntaProdotto", function (e) {
  let nomeProdotto = e.detail.nome1;
  let quantita = Number(e.detail.quantita1);
  let prezzo = e.detail.prezzo1;

  if (!quantitaPerProdotto[nomeProdotto]) {
    quantitaPerProdotto[nomeProdotto] = { quantita: 0, prezzo: prezzo };
  }

  quantitaPerProdotto[nomeProdotto].quantita += quantita;

  aggiornaCarrello();
  ricreaCarrello();
});


let acquistaButton = document.getElementById("acquista");
acquistaButton.addEventListener("click", function () {
  if (tot === 0) {
    alert("Il carrello è vuoto. Aggiungi dei prodotti prima di procedere all'acquisto.");
    return;
  }else {
    alert(`Grazie per il tuo acquisto di CHF ${tot.toFixed(2)}!`);
    quantitaPerProdotto = {};
    aggiornaCarrello();
    ricreaCarrello();
  }
});