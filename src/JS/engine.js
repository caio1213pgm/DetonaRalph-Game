const state = {
  view: {
    windows: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.getElementById("timeLeft"),
    score: document.getElementById("score"),
    lifes: document.getElementById("lifes"),
  },
  value: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    time: 30,
  },
  actions: {
    timerId: setInterval(randomWindow, 1000),
    countTimeId: setInterval(countTime, 1000),
  },
};
const btnAddTime = document.getElementById("resume");
let life = 3;

function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function countTime() {
  state.value.time--;
  state.view.timeLeft.textContent = state.value.time;
  if (state.value.time <= 0) {
    clearInterval(state.actions.countTimeId);
    clearInterval(state.actions.timerId);
    playSound("over");
    btnAddTime.style.display = "none";
    alert(`Game over!! Pontuação final: ${state.value.result}`);
  }
}

function randomWindow() {
  state.view.windows.forEach((window) => {
    window.classList.remove("enemy");
  });

  let random = Math.floor(Math.random() * 9);
  let randomWindow = state.view.windows[random];
  randomWindow.classList.add("enemy");
  state.value.hitPosition = randomWindow.id;
}

function addHitBox() {
  state.view.windows.forEach((window) => {
    window.addEventListener("mousedown", () => {
      if (window.id === state.value.hitPosition) {
        state.value.result++;
        state.view.score.textContent = state.value.result;
        state.value.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function addTime() {
  state.value.time += 10;
  life--;
  state.view.lifes.innerHTML = `x${life}`;
  playSound("time");

  if (life === 0) {
    btnAddTime.style.display = "none";
  }
}

function restart() {
  window.location.reload();
}
function start() {
  addHitBox();
}

start();
