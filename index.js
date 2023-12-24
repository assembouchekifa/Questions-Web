let data;
fetch("questions.json")
  .then((q) => {
    return q.json();
  })
  .then((q) => {
    data = Array.from(q);
    dsp(data[0], data[1].length);
    addq(data[1]);
    qMainQ();
  });
let test = document.querySelector(".test");
let legal = document.querySelector(".leg");
let startButton = document.querySelector(".start");
let result = document.querySelector(".result");
let resat = document.querySelector(".reload");
let submit = document.querySelector(".button");
let qdiv = document.querySelector(".questions");
let opdiv = document.querySelector(".op ");
let h1Result = document.querySelector(".result h1");
let pResult = document.querySelector(".result p");
let qCont = 0;
let qoractq = 0;
let qmain = 0;
let tim, timar;
startButton.addEventListener("click", () => {
  legal.classList.add("disno");
  test.classList.remove("disno");
  qMainTm();
});
resat.addEventListener("click", () => {
  window.location.reload();
});
submit.addEventListener("click", () => {
  let chekdin = document.querySelector(".op div input:checked + label");
  qMainQ();
  if (chekdin != null && chekdin.innerText == data[1][qCont]["correct"]) {
    qoractq++;
  }
  if (chekdin != null && qCont + 1 < data[1].length) {
    qCont++;
    opdiv.innerHTML = "";
    addq(data[1]);
  } else if (chekdin != null && qCont + 1 >= data[1].length) {
    done();
  }
});
function dsp(obt, nq) {
  let time = document.querySelectorAll(".leg p span")[0];
  let qwat = document.querySelectorAll(".leg p span")[1];
  if (Math.floor(obt["time"] / 60) != 0 && obt["time"] % 60 != 0) {
    time.innerHTML = ` ${Math.floor(obt["time"] / 60)} <span> minutes </span> ${
      obt["time"] % 60
    } <span>second</span>`;
  } else if (Math.floor(obt["time"] / 60) == 0) {
    time.innerHTML = ` ${obt["time"] % 60} <span>second</span>`;
  } else if (obt["time"] % 60 == 0) {
    time.innerHTML = ` ${Math.floor(obt["time"] / 60)} <span> minutes </span>`;
  }
  qwat.innerHTML = `${nq} <span> questions </span>`;
}
function addq(data) {
  let a = [];
  let t;
  qdiv.innerText = data[qCont]["questions"];
  for (let i = 0; i < Object.keys(data[qCont]).length - 2; i++) {
    a.push(i);
  }
  for (let i = 0; i < Object.keys(data[qCont]).length - 2; i++) {
    t = a[Math.floor(Math.random() * a.length)];
    a.splice(a.indexOf(t), 1);
    let div = document.createElement("div");
    let inpq = document.createElement("input");
    let lableq = document.createElement("label");
    inpq.setAttribute("type", "radio");
    inpq.setAttribute("id", i);
    inpq.setAttribute("name", "Questions");
    lableq.setAttribute("for", i);
    lableq.innerText = data[qCont][`option${t + 1}`];
    div.appendChild(inpq);
    div.appendChild(lableq);
    opdiv.appendChild(div);
  }
}
function qMainTm() {
  tim = data[0]["time"];
  document.querySelector(".time span").innerHTML = `${
    Math.floor(tim / 60) < 10
      ? "0" + Math.floor(tim / 60)
      : Math.floor(tim / 60)
  }:${tim % 60 < 10 ? "0" + (tim % 60) : tim % 60}`;
  timar = setInterval(() => {
    if (tim == 0) {
      done();
    }
    tim--;
    document.querySelector(".time span").innerHTML = `${
      Math.floor(tim / 60) < 10
        ? "0" + Math.floor(tim / 60)
        : Math.floor(tim / 60)
    }:${tim % 60 < 10 ? "0" + (tim % 60) : tim % 60}`;
  }, 1000);
}
function qMainQ() {
  qmain++;
  document.querySelectorAll(".numofq span")[0].innerHTML = `${qmain}`;
  document.querySelectorAll(".numofq span")[1].innerHTML = `${data[1].length}`;
}
function done() {
  clearInterval(timar);
  test.classList.add("disno");
  result.classList.remove("disno");
  if (qoractq == qCont + 1) {
    win();
  } else {
    loas();
  }
}
function win() {
  tim = data[0]["time"] - tim;
  h1Result.innerHTML = "WIN";
  h1Result.classList.add("win");
  pResult.innerHTML =
    "Congratulations, you have completed all the questions and your answer was correct.The time taken was <span></span> ";
  if (Math.floor(tim / 60) != 0 && tim % 60 != 0) {
    document.querySelector(".win + p > span").innerHTML = `${Math.floor(
      tim / 60
    )} <span>minutes</span> ${tim % 60} <span>second</span>`;
  } else if (Math.floor(tim / 60) != 0) {
    document.querySelector(".win + p > span").innerHTML = `${Math.floor(
      tim / 60
    )} <span>minutes</span>`;
  } else if (tim % 60 != 0) {
    document.querySelector(".win + p > span").innerHTML = `${
      tim % 60
    } <span>second</span>`;
  }
}
function loas() {
  h1Result.innerHTML = "Loss";
  h1Result.classList.add("loas");
  pResult.innerHTML =
    "Unfortunately, you did not answer correctly in all the questions. The number of your answers was <span></span> incorrect";
  document.querySelector(".loas + p > span").innerHTML =
    data[1].length - qoractq;
}
