import TaskColumn from "./taskColumn/taskColumn";

function isCard(event) {
  let currentCard = undefined;
  if (event.target.classList.contains("card")) {
    currentCard = event.target;
  } else if (event.target.classList.contains("card-text")) {
    currentCard = event.target.closest("card");
  }
  return currentCard;
}

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".trello");

  const todo = new TaskColumn("todo", element);
  todo.drowCard();
  new TaskColumn("in progress", element).drowCard();
  new TaskColumn("done", element).drowCard();

  const addTaskLinks = document.querySelectorAll(".add-task");

  addTaskLinks.forEach((task) =>
    task.addEventListener("click", (event) => {
      event.preventDefault();
      todo.addTask(task.closest(".task-column"), task);
    })
  );

  document.addEventListener("mousemove", (event) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const closeSign = card.querySelector(".close-task");
      if (
        card == event.target ||
        event.target == card.querySelector(".close-task") ||
        event.target == card.querySelector(".card-text")
      ) {
        closeSign.style.display = "block";
        todo.closeCard(card);
      } else {
        closeSign.style.display = "none";
      }
    });
  });

  document.addEventListener("mousedown", () => {
    const cardsContainer = document.querySelectorAll(".cards");

    let currentCard;
    let currentColumn;
    let currentPlace;

    const mouseUp = (e) => {
      const stubRemove = document.querySelector(".stub");
      if (stubRemove != null) {
        stubRemove.remove();
      }
      currentCard.classList.remove("dragget");
      const mouseUpCard = isCard(e);
      if (mouseUpCard != undefined) {
        const container = mouseUpCard.closest(".cards");
        if (
          e.clientY <=
          mouseUpCard.getBoundingClientRect().top +
            mouseUpCard.getBoundingClientRect().height / 2
        ) {
          container.insertBefore(currentCard, mouseUpCard);
        } else {
          const nextEl = mouseUpCard.nextSibling;
          if (nextEl != null) {
            container.insertBefore(currentCard, nextEl);
          } else {
            container.appendChild(currentCard);
          }
        }
      } else if (e.target.closest(".task-column") != null) {
        e.target
          .closest(".task-column")
          .querySelector(".cards")
          .appendChild(currentCard);
      } else {
        if (currentPlace != null) {
          currentColumn.insertBefore(currentCard, currentPlace);
        } else {
          currentColumn.appendChild(currentCard);
        }
      }
      currentCard = undefined;
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mouseover", mouseOver);
    };
    const mouseOver = (e) => {
      currentCard.style.top = e.clientY + "px";
      currentCard.style.left = e.clientX - 370 + "px";

      const stubRemove = document.querySelector(".stub");
      if (stubRemove != null) {
        stubRemove.remove();
      }
      const indCard = isCard(e);
      const stub = document.createElement("li");
      stub.classList.add("stub");
      if (indCard != undefined) {
        const container = indCard.closest(".cards");
        if (
          e.clientY <=
          indCard.getBoundingClientRect().top +
            indCard.getBoundingClientRect().height / 2
        ) {
          container.insertBefore(stub, indCard);
        } else {
          const next = indCard.nextSibling;
          if (next != null) {
            container.insertBefore(stub, next);
          } else {
            container.appendChild(stub);
          }
        }
      } else if (e.target.closest(".task-column") != null) {
        e.target
          .closest(".task-column")
          .querySelector(".cards")
          .appendChild(stub);
      }
    };

    cardsContainer.forEach((container) =>
      container.addEventListener("mousedown", (e) => {
        e.preventDefault();
        currentColumn = e.target.closest(".cards");
        currentCard = isCard(e);
        if (currentCard != undefined) {
          currentPlace = currentCard.nextSibling;
          currentCard.classList.add("dragget");

          document.addEventListener("mouseup", mouseUp);
          document.addEventListener("mouseover", mouseOver);
        }
      })
    );
  });
});
