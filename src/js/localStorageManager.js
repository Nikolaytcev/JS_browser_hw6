export default function addStorage() {
    const columns = document.querySelectorAll('.task-column');
    columns.forEach((column) => {
        const cards = column.querySelectorAll('.card');
        let storageCards = {};
        for (let i = 0; i < cards.length; i++) {
            storageCards[i + 1] = cards[i].querySelector('.card-text').textContent;
        }
        localStorage.setItem(column.querySelector('.task-column-title').textContent, JSON.stringify(storageCards));
    });
  };


  export function loadFromStorage(element) {
    const columns = document.querySelectorAll('.task-column');
    let cards;
    let card;
    columns.forEach((column) => {
        cards = JSON.parse(localStorage.getItem(column.querySelector('.task-column-title').textContent));
        if (cards != {}) {
            for (let i in cards) {
                column.querySelector('.cards').appendChild(element.createCard(cards[i]));
            }
        };
  });
  };

  