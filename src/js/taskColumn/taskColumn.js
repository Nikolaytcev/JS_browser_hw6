import "./taskColumn.css";
import image from "../../../icons/free-icon-cross-sign-8212742.png";

export default class TaskColumn {
  constructor(title, element) {
    this.title = title;
    this.element = element;
  }

  drowCard() {
    const card = document.createElement("article");
    card.classList.add("task-column");
    const title = document.createElement("h3");
    title.classList.add("task-column-title");
    title.textContent = this.title;
    title.style.textTransform = "uppercase";
    const addTaskLink = document.createElement("a");
    addTaskLink.classList.add("add-task");
    addTaskLink.textContent = "+ Add another card";
    const cards = document.createElement("ul");
    cards.classList.add("cards");

    card.appendChild(title);
    card.appendChild(cards);
    card.appendChild(addTaskLink);

    this.element.appendChild(card);
  }

  addTask(column, target) {
    const task = document.createElement("textarea");
    task.classList.add("task-text");

    const addBtn = document.createElement("button");
    addBtn.classList.add("add-task-btn");
    addBtn.textContent = "Add Card";
    const close = document.createElement("img");
    close.classList.add("close-add-task");
    close.src = image;

    column.insertBefore(task, target);
    column.appendChild(addBtn);
    column.appendChild(close);
    target.style.display = "none";

    addBtn.addEventListener("click", () => {
      if (!task.value == "") {
        const card = document.createElement("li");
        card.classList.add("card");
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        const closeTask = document.createElement("img");
        closeTask.classList.add("close-task");
        closeTask.src = image;
        closeTask.style.display = "none";
        cardText.textContent = task.value;
        card.appendChild(cardText);
        card.appendChild(closeTask);
        column.querySelector(".cards").appendChild(card);

        addBtn.remove();
        close.remove();
        task.remove();
        target.style.display = "block";
      }
    });

    close.addEventListener("click", () => {
      task.remove();
      addBtn.remove();
      close.remove();
      target.style.display = "block";
    });
  }

  closeCard(card) {
    const closeSign = card.querySelector(".close-task");
    closeSign.addEventListener("click", () => {
      card.remove();
    });
  }
}
