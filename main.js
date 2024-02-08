/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/icons/free-icon-cross-sign-8212742.png
const free_icon_cross_sign_8212742_namespaceObject = __webpack_require__.p + "71f126ca324c5f02a33e.png";
;// CONCATENATED MODULE: ./src/js/Card/card.js


class Card {
  createCard(text) {
    const card = document.createElement("li");
    card.classList.add("card");
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    const closeTask = document.createElement("img");
    closeTask.classList.add("close-card");
    closeTask.src = free_icon_cross_sign_8212742_namespaceObject;
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
;// CONCATENATED MODULE: ./src/js/localStorageManager.js

function addStorage() {
  const columns = document.querySelectorAll(".column");
  columns.forEach(column => {
    const cards = column.querySelectorAll(".card");
    let storageCards = {};
    for (let i = 0; i < cards.length; i++) {
      storageCards[i + 1] = cards[i].querySelector(".card-text").textContent;
    }
    localStorage.setItem(column.querySelector(".column-title").textContent, JSON.stringify(storageCards));
  });
}
function loadFromStorage() {
  const columns = document.querySelectorAll(".column");
  let cards;
  columns.forEach(column => {
    cards = JSON.parse(localStorage.getItem(column.querySelector(".column-title").textContent));
    if (cards != {}) {
      for (let i in cards) {
        column.querySelector(".cards-list").appendChild(new Card().createCard(cards[i]));
      }
    }
  });
}
;// CONCATENATED MODULE: ./src/js/addingCard.js



class Dialog {
  constructor(column) {
    this.column = column.querySelector('.cards-list');
    this.addLink = column.querySelector('.add-card');
    this.task;
    this.close;
    this.addBtn;
  }
  addBtnClick = () => {
    if (!this.task.value == "") {
      this.column.appendChild(new Card().createCard(this.task.value));
      this.addBtn.remove();
      this.close.remove();
      this.task.remove();
      this.addLink.style.display = "block";
      addStorage();
    }
  };
  closeBtnClick = () => {
    this.task.remove();
    this.addBtn.remove();
    this.close.remove();
    this.addLink.style.display = "block";
  };
  openDiolog() {
    this.task = document.createElement("textarea");
    this.task.placeholder = 'Enter a title for this card...';
    this.task.classList.add("task-text");
    this.addBtn = document.createElement("button");
    this.addBtn.classList.add("add-task-btn");
    this.addBtn.textContent = "Add Card";
    this.close = document.createElement("img");
    this.close.classList.add("close-add-task");
    this.close.src = free_icon_cross_sign_8212742_namespaceObject;
    this.column.appendChild(this.task);
    this.column.appendChild(this.addBtn);
    this.column.appendChild(this.close);
    this.addLink.style.display = "none";
    this.addBtn.addEventListener('click', this.addBtnClick);
    this.close.addEventListener('click', this.closeBtnClick);
  }
}
;// CONCATENATED MODULE: ./src/js/controller.js



class Controller {
  constructor() {
    this.currentCard = undefined;
    this.currentColumn = undefined;
    this.nextElement = undefined;
  }
  init() {
    const columns = document.body.querySelectorAll('.column');
    columns.forEach(column => column.querySelector('.add-card').addEventListener('click', e => {
      e.preventDefault();
      new Dialog(column).openDiolog();
    }));
  }
  createProection(event) {
    const element = event.target;
    const oldStub = document.querySelector('.stub');
    const heightCurrentCard = this.currentCard.getBoundingClientRect().height;
    if (element.classList.contains('stub')) {
      return;
    } else if (oldStub != null) {
      oldStub.remove();
    }
    ;
    const stub = document.createElement("li");
    stub.classList.add('stub');
    stub.style.height = heightCurrentCard + 'px';
    if (element.classList.contains('card')) {
      const cards = element.closest('.cards-list');
      const {
        y,
        height
      } = element.getBoundingClientRect();
      if (event.clientY <= y + height / 2) {
        cards.insertBefore(stub, element);
      } else {
        cards.insertBefore(stub, element.nextSibling);
      }
    } else if (element.classList.contains('column') || element.classList.contains('column-title') || element.classList.contains('add-card')) {
      element.closest('.column').querySelector('.cards-list').appendChild(stub);
    }
  }
  onMouseMove = e => {
    const element = e.target;
    if (element.classList.contains('card') || element.classList.contains('close-card')) {
      const card = element.closest('.card');
      const closeCard = card.querySelector('.close-card');
      closeCard.style.display = 'block';
      closeCard.addEventListener('click', () => {
        new Card().removeCard(card);
      });
    } else {
      if (document.querySelectorAll('.close-card').length != 0) {
        document.querySelectorAll('.close-card').forEach(close => {
          close.style.display = 'none';
        });
      }
      ;
    }
    ;
    if (this.currentCard != undefined) {
      this.currentCard.style.top = e.clientY - this.shiftY + "px";
      this.currentCard.style.left = e.clientX - this.shiftX + "px";
      this.createProection(e);
    }
    ;
  };
  onMouseDown = e => {
    if (e.target.closest('.card') != undefined && !e.target.classList.contains('close-card')) {
      this.currentCard = e.target.closest('.card');
      e.preventDefault();
      this.shiftX = e.offsetX;
      this.shiftY = e.offsetY;
      this.currentCard.classList.add('dragget');
      this.currentColumn = this.currentCard.closest('.column');
      this.nextElement = this.currentCard.nextSibling;
    }
    ;
  };
  onMouseUp = e => {
    const stub = document.querySelector('.stub');
    const close = e.target.classList.contains('close-card');
    if (close) {
      this.currentCard = e.target.closest('.card');
      new Card().removeCard(this.currentCard);
      addStorage();
      this.currentCard = undefined;
      this.currentColumn = undefined;
      this.nextElement = undefined;
      return;
    }
    if (this.currentCard != undefined && stub != null) {
      const cards = stub.closest('.cards-list');
      cards.insertBefore(this.currentCard, stub);
      stub.remove();
      this.currentCard.classList.remove('dragget');
    } else if (this.currentCard != undefined && stub == null) {
      const cards = this.currentColumn.querySelector('.cards-list');
      if (this.nextElement != null) {
        cards.insertBefore(this.currentCard, this.nextElement);
      } else {
        cards.appendChild(this.currentCard);
      }
      ;
      this.currentCard.classList.remove('dragget');
    }
    ;
    this.currentCard = undefined;
    this.currentColumn = undefined;
    this.nextElement = undefined;
    addStorage();
  };
}
;
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  const controller = new Controller();
  controller.init();
  document.addEventListener("mousemove", controller.onMouseMove);
  document.addEventListener("mousedown", controller.onMouseDown);
  document.addEventListener("mouseup", controller.onMouseUp);
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;