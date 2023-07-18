"use strict";

import * as sound from "./sound.js";

const IMG_SIZE = 80;
const FIELD_TOP_PADDING = 50;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this);
    this.field.addEventListener("click", (event) => {
      this.onFieldClickListener(event);
    });
    this.started = true;
  }

  setStarted(isStart) {
    this.started = isStart;
  }

  init(carrotCount, bugCount) {
    this.field.innerHTML = "";
    this.started = true;
    this.addItem("carrot", carrotCount, "img/carrot.png");
    this.addItem("bug", bugCount, "img/bug.png");
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = this.field.offsetTop + FIELD_TOP_PADDING;
    const x2 = this.fieldRect.width - IMG_SIZE;
    const y2 = this.field.offsetTop + this.fieldRect.height - IMG_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.setAttribute("alt", className);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.userDrag = "none";
      this.field.appendChild(item);
    }
  }

  //   onClick = (event) => {}
  onFieldClickListener(event) {
    if (!this.started) {
      return;
    }

    const target = event.target;
    if (target.matches(".carrot")) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
