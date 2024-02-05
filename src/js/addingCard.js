import image from "../icons/free-icon-cross-sign-8212742.png"
import Card from "./Card/card";
import addStorage from "./localStorageManager";

export default class Dialog {
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
        this.close.src = image;
        this.column.appendChild(this.task);
        this.column.appendChild(this.addBtn);
        this.column.appendChild(this.close);
        this.addLink.style.display = "none";

        this.addBtn.addEventListener('click', this.addBtnClick);
        this.close.addEventListener('click', this.closeBtnClick)
    }
}