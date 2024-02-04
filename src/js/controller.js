import Dialog from "./addingCard";
import Card from "./Card/card";
import addStorage from "./localStorageManager";


export default class Controller {
    constructor() {
        this.currentCard = undefined;
        this.currentColumn = undefined;
        this.nextElement = undefined;

    }

    init() {
        const columns = document.body.querySelectorAll('.column');
        columns.forEach(column => column.querySelector('.add-card').addEventListener('click', (e) => {
            e.preventDefault();
            new Dialog(column).openDiolog();
        }));
    };

    createProection(event) {
        const element = event.target;
        const oldStub = document.querySelector('.stub');
        const heightCurrentCard = this.currentCard.getBoundingClientRect().height;

        if (element.classList.contains('stub')) {
            return;
        }
        else if (oldStub != null) {
            oldStub.remove();
        };
        const stub = document.createElement("li");
        stub.classList.add('stub');
        stub.style.height = heightCurrentCard + 'px';

        if (element.classList.contains('card')) {
            const cards = element.closest('.cards-list');
            const { y, height } = element.getBoundingClientRect();
            if (event.clientY <= y + height / 2) {
                cards.insertBefore(stub, element);
            }
            else {
                cards.insertBefore(stub, element.nextSibling);
            }

        }
        else if (element.classList.contains('column') || 
        element.classList.contains('column-title') || 
        element.classList.contains('add-card')) {
            element.closest('.column').querySelector('.cards-list').appendChild(stub);
        }
    };

    onMouseMove = (e) => {
        const element = e.target;
        if (element.classList.contains('card') || element.classList.contains('close-card')) {
            const card = element.closest('.card');
            const closeCard = card.querySelector('.close-card');
            closeCard.style.display = 'block';
            closeCard.addEventListener('click', () => {
                new Card().removeCard(card);
            });
        }
        else {
            if (document.querySelectorAll('.close-card').length != 0) {
                document.querySelectorAll('.close-card').forEach((close) => {
                    close.style.display = 'none';
                });
            };
        };

        if (this.currentCard != undefined) {
            this.currentCard.style.top = e.clientY - this.shiftY + "px";
            this.currentCard.style.left = e.clientX - this.shiftX + "px";
            this.createProection(e);
        };
    };

    onMouseDown = (e) => {
        if (e.target.closest('.card') != undefined && !e.target.classList.contains('close-card')) {
            this.currentCard = e.target.closest('.card');
            e.preventDefault();
            this.shiftX = e.offsetX;
			this.shiftY = e.offsetY;
            this.currentCard.classList.add('dragget');
            this.currentColumn = this.currentCard.closest('.column');
            this.nextElement = this.currentCard.nextSibling;
        };
    };

    onMouseUp = (e) => {
        const stub = document.querySelector('.stub');
        const close = e.target.classList.contains('close-card');
        if (close) {
            this.currentCard = e.target.closest('.card')
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
        }
        else if (this.currentCard != undefined && stub == null) {
            const cards = this.currentColumn.querySelector('.cards-list');
            if (this.nextElement != null) {
                cards.insertBefore(this.currentCard, this.nextElement)
            }
            else {
                cards.appendChild(this.currentCard);
            };
            this.currentCard.classList.remove('dragget');
        };
        this.currentCard = undefined;
        this.currentColumn = undefined;
        this.nextElement = undefined;

        addStorage();
    };
};