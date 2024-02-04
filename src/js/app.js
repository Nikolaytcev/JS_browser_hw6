import Controller from "./controller";
import { loadFromStorage } from "./localStorageManager";

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  const controller = new Controller();
  controller.init();

  document.addEventListener("mousemove", controller.onMouseMove);
  document.addEventListener("mousedown", controller.onMouseDown);
  document.addEventListener("mouseup", controller.onMouseUp);
});

