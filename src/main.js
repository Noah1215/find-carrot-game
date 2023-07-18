"use strict";
import { PopUp, ClikedButton } from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

let gameDuration = 155;
let carrotCount = 3;
let bugCount = 2;
let gameLevel = 1;
const MAX_GAME_LEVEL = 10;

const game = new GameBuilder()
  .withGameDuration(gameDuration)
  .withCarrotCount(carrotCount)
  .withBugCount(bugCount)
  .withLevel(gameLevel)
  .build();

const gameFinishBanner = new PopUp();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay?";
      gameFinishBanner.hideNextBtn();
      sound.playAlert();
      break;
    case Reason.win:
      if (gameLevel === MAX_GAME_LEVEL) {
        gameFinishBanner.setIsEnd(true);
      } else {
        message = "YOU WON!";
      }
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST!";
      gameFinishBanner.hideNextBtn();
      sound.playBug();
      break;
    default:
      break;
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListner((clicked) => {
  switch (clicked) {
    case ClikedButton.before:
      carrotCount -= 2;
      bugCount -= 3;
      gameDuration += 15;
      gameLevel--;
      break;
    case ClikedButton.next:
      carrotCount += 2;
      bugCount += 3;
      gameDuration -= 15;
      gameLevel++;
      break;
    case ClikedButton.reset:
      reset();
      break;
    default:
      gameFinishBanner.setIsEnd(false);
      break;
  }

  if (gameLevel === 0) {
    reset();
  }

  game.start(gameLevel, carrotCount, bugCount, gameDuration);
});

function reset() {
  gameDuration = 155;
  carrotCount = 3;
  bugCount = 2;
  gameLevel = 1;
  gameFinishBanner.setIsEnd(false);
}
