import "./card.css";
import image from "../../../icons/free-icon-cross-sign-8212742.png";

export default class Card {
  
  createCard(text) {
    const card = document.createElement("li");
    card.classList.add("card");
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    const closeTask = document.createElement("img");
    closeTask.classList.add("close-card");
    closeTask.src = image;
    closeTask.style.display = "none";
    cardText.textContent = text;
    card.appendChild(cardText);
    card.appendChild(closeTask);
    return card;
  }

  removeCard(card) {
    card.remove();
  }
}
