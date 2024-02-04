import Card from "./Card/card";

export default function addStorage() {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    const cards = column.querySelectorAll(".card");
    let storageCards = {};
    for (let i = 0; i < cards.length; i++) {
      storageCards[i + 1] = cards[i].querySelector(".card-text").textContent;
    }
    localStorage.setItem(
      column.querySelector(".column-title").textContent,
      JSON.stringify(storageCards)
    );
  });
}

export function loadFromStorage() {
  const columns = document.querySelectorAll(".column");
  let cards;
  columns.forEach((column) => {
    cards = JSON.parse(
      localStorage.getItem(column.querySelector(".column-title").textContent)
    );
    if (cards != {}) {
      for (let i in cards) {
        column
          .querySelector(".cards-list")
          .appendChild(new Card().createCard(cards[i]));
      }
    }
  });
}
