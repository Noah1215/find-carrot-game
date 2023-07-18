"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withLevel(num) {
    this.gameLevel = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount,
      this.gameLevel
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount, level) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.level = level;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListner((item) => this.onItemClick(item));

    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameLevel = document.querySelector(".game__level");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
        sound.playAlert();
      } else {
        this.start(
          this.level,
          this.carrotCount,
          this.bugCount,
          this.gameDuration
        );
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start(level, carrotCount, bugCount, gameDuration) {
    this.started = true;
    this.updateLevel(level);
    this.initGame(carrotCount, bugCount, gameDuration);
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBg();
  }

  updateLevel(level) {
    this.level = level;
    this.gameLevel.innerText = this.level;
  }

  stop(reason) {
    this.started = false;
    this.gameField.setStarted(this.started);
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard(this.score);
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  showStopBtn() {
    const icon = this.gameBtn.querySelector("i");

    if (this.started) {
      icon.classList.replace("fa-play", "fa-stop");
    } else {
      icon.classList.replace("fa-stop", "fa-play");
    }

    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }

      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    this.gameTimer.innerText = `${min}:${sec}`;
  }

  initGame(carrotCount, bugCount, duration) {
    this.score = 0;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDuration = duration;
    this.gameScore.innerText = carrotCount;
    this.gameField.init(carrotCount, bugCount);
  }

  updateScoreBoard(score) {
    this.gameScore.innerText = this.carrotCount - score;
  }
}
