const carrotSound = new Audio("sound/carrot_pull.mp3");
const BugSound = new Audio("sound/bug_pull.mp3");
const bgSound = new Audio("sound/bg.mp3");
const winSound = new Audio("sound/game_win.mp3");
const alertSound = new Audio("sound/alert.wav");

export function playCarrot() {
  playSound(carrotSound);
}
export function playBug() {
  playSound(BugSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playBg() {
  playSound(bgSound);
}
export function playWin() {
  playSound(winSound);
}

export function stopCarrot() {
  stopSound(carrotSound);
}
export function stopBug() {
  stopSound(BugSound);
}
export function stopAlert() {
  stopSound(alertSound);
}
export function stopBg() {
  stopSound(bgSound);
}
export function stopWin() {
  stopSound(winSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
