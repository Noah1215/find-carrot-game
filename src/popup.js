"use strict";

export const ClikedButton = Object.freeze({
  before: "before",
  refresh: "refresh",
  reset: "reset",
  next: "next",
});

export class PopUp {
  constructor() {
    this.isEnd = false;
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__message");

    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick(ClikedButton.refresh);
      this.popUpNext.style.visibility = "visible";
      this.hide();
    });

    this.popUpBefore = document.querySelector(".pop-up__before");
    this.popUpBefore.addEventListener("click", () => {
      this.onClick && this.onClick(ClikedButton.before);
      this.hide();
    });

    this.popUpNext = document.querySelector(".pop-up__next");
    this.popUpNext.addEventListener("click", () => {
      this.onClick && this.onClick(ClikedButton.next);
      this.hide();
    });

    this.endingPopUp = document.querySelector(".ending-pop-up");
    this.endingReset = document.querySelector(".end-reset");
    this.endingReset.addEventListener("click", () => {
      this.onClick && this.onClick(ClikedButton.reset);
      this.hideEnding();
    });

    this.endingReplay = document.querySelector(".end-replay");
    this.endingReplay.addEventListener("click", () => {
      this.onClick && this.onClick(ClikedButton.refresh);
      this.hideEnding();
    });
  }

  setIsEnd(end) {
    this.isEnd = end;
  }

  setClickListner(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    if (this.isEnd) {
      this.popUp.classList.add("pop-up--hide");
      this.endingPopUp.classList.remove("pop-up--end");
    } else {
      this.popUp.classList.remove("pop-up--hide");
      this.endingPopUp.classList.add("pop-up--end");
    }
  }

  hide() {
    this.popUp.classList.add("pop-up--hide");
  }

  hideEnding() {
    this.endingPopUp.classList.add("pop-up--end");
  }

  hideNextBtn() {
    this.popUpNext.style.visibility = "hidden";
  }

  showNextBtn() {
    this.popUpNext.style.visibility = "visible";
  }
}
