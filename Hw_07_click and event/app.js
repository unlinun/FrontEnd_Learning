"use strict";

/* get element from html */
//text content
const welcomeNote = document.querySelector(".welcome");
const loginUser = document.querySelector(".login__input--user");
const loginPin = document.querySelector(".login__input--pin");
const balanceValue = document.querySelector(".balance__value");
const movements = document.querySelector(".movements");
const summaryIn = document.querySelector(".summary__value--in");
const summaryOut = document.querySelector(".summary__value--out");
const summaryInterest = document.querySelector(".summary__value--interest");
const transferTo = document.querySelector(".form__input--to");
const transferAmount = document.querySelector(".form__input--amount");
const loanAmount = document.querySelector(".form__input--loan-amount");
const closeUser = document.querySelector(".form__input--user");
const closePin = document.querySelector(".form__input--pin");
const movementContainer = document.querySelector(".movements");
const appContainer = document.querySelector(".app");
const dateLabel = document.querySelector(".date");
const timerContainer = document.querySelector(".timer");

//btn select
const btnLogin = document.querySelector(".login__btn");
const btnSort = document.querySelector(".btn--sort");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");

/* set user data */
const createUser = function (name, mov, int, pin, movDate) {
  this.user = name;
  this.movements = mov;
  this.interest = int;
  this.pin = pin;
  this.movementDate = movDate;
};

const user1 = new createUser(
  "Alice Huang",
  [100, 2000, -10000, 9000, 300, 5000, -199],
  0.05,
  1111,
  [
    "2022-06-22T13:15:33.035Z",
    "2022-06-20T09:48:16.867Z",
    "2022-06-18T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
  ]
);

const user2 = new createUser(
  "Ben Smith",
  [30, 2200, -3404, -1299, -203, 20, -1002, 2304],
  0.02,
  2222,
  [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ]
);

const user3 = new createUser(
  "Camille Dan",
  [12000, 200, 404, -1520, 203, 1230, -299, -3066, 2004, 5093],
  0.03,
  2222,
  [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
  ]
);

const users = [user1, user2, user3];
console.log(users);

/* ------------ Set current user and userId ---------- */
const createUserId = function (u) {
  u.forEach((acc) => {
    acc.ID = acc.user
      .toUpperCase()
      .split(" ")
      .map((u) => u[0])
      .join("");
  });
};
createUserId(users);
console.log(users);

/* ---------- SET TIME ------------ */
const displayDate = function (day1, day2) {
  const currDate = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const pastDay = Math.trunc((day1 - day2) / (1000 * 60 * 60 * 24));
  // console.log(pastDay);
  if (pastDay > -7) {
    return currDate.format(pastDay, "day");
  } else {
    return new Intl.DateTimeFormat("en-US").format(day1);
  }
};
// Intl 時間格式設定
const options = {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
//設定你視窗的語言
const locale = "en-US";
const now = new Date();
//取得現在時間
const displayNow = function () {
  setInterval(() => {
    const now = new Date();
    const displayDateNow = new Intl.DateTimeFormat(locale, options).format(now);
    dateLabel.textContent = displayDateNow;
  }, 1000);
};

/*---------- SET TIMER ---------- */

//設定倒數時間
const countTime = function () {
  const tick = function () {
    //設定 分,秒
    let min = String(Math.trunc(timer / 60)).padStart(2, 0);
    // console.log(min);
    let sec = String(Math.trunc(timer % 60)).padStart(2, 0);
    // console.log(sec);
    timerContainer.textContent = `${min} : ${sec}`;
    //如果時間 = 0，則登出
    if (timer === 0) {
      clearInterval(showTimer);
      welcomeNote.textContent = `Log in to get started`;
      appContainer.style.opacity = 0;
    }
    //將時間減 1
    timer--;
  };
  //設定時間長度
  let timer = 10;
  //設定倒數函式
  tick();
  const showTimer = setInterval(tick, 1000);
  return showTimer;
};
//是否重啟倒數計時器？
const resetTimer = function () {
  if (showTimer) clearInterval(showTimer);
  showTimer = countTime();
};

/* ---------- SET NUMBER ----------*/
const formattedNum = function (num, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale,
  }).format(num);
};

/* ---------- Set movement and add Html ----------- */
let sort = false;
const setMovement = function (acc) {
  movementContainer.innerHTML = "";
  const isSort = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  isSort.forEach((value, i) => {
    // loop movement date in the forEach loop
    const showDay = displayDate(new Date(acc.movementDate[i]), now);
    const type = value > 0 ? `deposit` : `withdrawal`;
    const formatNum = formattedNum(value, "USD");
    // inset a new Html
    const html = ` <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${showDay}</div>
        <div class="movements__value">${formatNum}</div>`;
    movementContainer.insertAdjacentHTML("afterbegin", html);
  });
};
/* ---------- Set total number --------- */
// total balance
const totalBalance = function (acc) {
  const total = acc.movements.reduce((acc, curr) => acc + curr, 0);
  const formatNum = formattedNum(total, "USD");
  balanceValue.textContent = ` ${formatNum} `;
  acc.totalSum = total;
};

//total in
const totalIn = function (acc) {
  const total = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const formatNum = formattedNum(total, "USD");
  summaryIn.textContent = `${formatNum}`;
};

//total out
const totalOut = function (acc) {
  const total = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  const formatNum = formattedNum(total, "USD");
  summaryOut.textContent = `${formatNum}`;
};

// total interest
const totalInterest = function (acc) {
  const total =
    acc.movements.reduce((acc, curr) => acc + curr, 0) * acc.interest;
  summaryInterest.textContent = `${total.toFixed(2)} $`;
};

/* ----------- Set current Account and change UI ----------- */
//change UI
const changeUI = function (acc) {
  // 1. 將使用者的 movement 設定為目前的使用者 movement
  setMovement(acc);
  // 2. 將使用者的 total 設定為目前使用者的 total
  totalBalance(acc);
  totalIn(acc);
  totalOut(acc);
  totalInterest(acc);
};
// First setting default currentAccount
let currentAccount, showTimer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = users.find((acc) => acc.ID === loginUser.value);
  //注意此區需要將使用者輸入密碼改為"數字"
  if (currentAccount?.pin === Number(loginPin.value)) {
    loginUser.value = loginPin.value = "";
    appContainer.style.opacity = 100;
    welcomeNote.textContent = `Welcome back ${
      currentAccount.user.split(" ")[0]
    }`;
    movementContainer.textContent = "";
    changeUI(currentAccount);
    //set date logging
    displayNow();
    resetTimer();
  }
});

/* ---------- set sort ---------- */
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sort = !sort;
  setMovement(currentAccount);
  resetTimer();
});

/* ---------- transfer money --------- */
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const transferUser = users.find((acc) => acc.ID === transferTo.value);
  console.log(transferUser);
  if (
    amount > 0 &&
    currentAccount.totalSum > amount &&
    transferUser?.ID !== currentAccount.ID
  ) {
    transferAmount.value = transferTo.value = "";
    currentAccount.movements.push(-amount);
    currentAccount.movementDate.push(Date.now());
    transferUser.movements.push(amount);
    transferUser.movementDate.push(Date.now());

    changeUI(currentAccount);
    resetTimer();
  }
});

/* ---------- loan money ---------- */
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(loanAmount.value);
  if (amount > 0 && currentAccount.totalSum > amount * 0.1) {
    //create a set timeout function
    setTimeout(() => {
      currentAccount.movementDate.push(Date.now());
      currentAccount.movements.push(amount);
      loanAmount.value = "";
      changeUI(currentAccount);
    }, 1000);
    resetTimer();
  }
});

/* --------- close account ---------- */
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const user = users.find((acc) => acc.ID === closeUser.value);
  if (user?.pin === Number(closePin.value) && user?.ID === currentAccount.ID) {
    const index = users.findIndex((acc) => acc.ID === closeUser.value);
    users.splice(index, 1);
    closePin.value = closeUser.value = "";
    appContainer.style.opacity = 0;
  }
});

// /* set FAKE logging */
// currentAccount = user1;
// changeUI(currentAccount);

console.log(Intl);
