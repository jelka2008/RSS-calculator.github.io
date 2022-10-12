// import { getName, setName, clearName } from "./nameFunction.js";

//DOM Element
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  nextBgimgButton = document.getElementById("next_bgimg_button"),
  quoteWrapper = document.getElementById("quote_wrapper"),
  blockquote = document.getElementById("quote_text"),
  figcaption = document.getElementById("quote_author"),
  closeQuote = document.getElementById("close_quote"),
  nextQuote = document.getElementById("next_quote"),
  tempBg = document.getElementById("temp_bg"),
  languageItem = document.querySelectorAll(".language_item"),
  focusQuestion = document.getElementById("focus_question"),
  waiting = document.getElementById("waiting"),
  timeFormatItem = document.querySelectorAll(".timeFormatItem"),
  settingsButton = document.getElementById("settings_enter"),
  settingsList = document.getElementById("settings_list"),
  city = document.getElementById("city"),
  temperature = document.getElementById("temperature"),
  humidity = document.getElementById("humidity"),
  wind = document.getElementById("wind");
const weatherIcon = document.querySelector(".weather-icon");

// Options
let showAmPm = true;
let showSettings = false;
let changeBg = false;
let weatherKey = "4a76c66089435e1477d7a09b4cabd4e5";

// bgImages
const bgImages = [
  "autumn-night-0.jpg",
  "autumn-night-1.jpg",
  "autumn-nigth-2.jpg",
  "autumn-night-3.jpg",
  "autumn-night-4.jpg",
  "autumn-night-5.jpg",
  "autumn-morning-6.jpg",
  "autumn-morning-7.jpg",
  "autumn-morning-8.jpg",
  "autumn-morning-9.jpg",
  "autumn-morning-10.jpg",
  "autumn-morning-11.jpg",
  "autumn-afternoon-12.jpg",
  "autumn-afternoon-13.jpg",
  "autumn-afternoon-14.jpg",
  "autumn-afternoon-15.jpg",
  "autumn-afternoon-16.jpg",
  "autumn-afternoon-17.jpg",
  "autumn_evening-18.jpg",
  "autumn_evening-19.jpg",
  "autumn_evening-20.jpg",
  "autumn_evening-21.jpg",
  "autumn_evening-22.jpg",
  "autumn_evening-23.jpg",
];

// Show time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  changeBg = min == "00" && sec == "00";

  changeBg && setBgGreet();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr format
  hour = showAmPm ? hour % 12 || 12 : hour;

  // Output time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}<span> </span>${showAmPm ? amPm : ""}`;
  setTimeout(showTime, 1000);
}

// Show date
function showDate() {
  const showRuEn = localStorage.getItem("language") || "ru";

  let today = new Date(),
    weekDay = today.getDay();
  dateCount = today.getDate();
  monthCount = today.getMonth();

  // weekDays
  const daysRu = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const daysEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // months
  const monthsRu = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  const monthsEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Output date
  if (showRuEn === "ru") {
    date.innerHTML = `${daysRu[weekDay]}<span>, </span>${addZero(
      dateCount
    )}<span> </span>${monthsRu[monthCount]}`;
  }
  if (showRuEn === "en") {
    date.innerHTML = `${daysEn[weekDay]}<span>, </span>${addZero(
      dateCount
    )}<span> </span>${monthsEn[monthCount]}`;
  }
}

// Add Zerosnext_bg
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setBgGreet() {
  const greetingRu = [
    "Доброе утро, ",
    "Добрый день, ",
    "Добрый вечер, ",
    "Доброй ночи, ",
  ];
  const greetingEn = [
    "Good Morning, ",
    "Good Afternoon, ",
    "Good Evening, ",
    "Good Nigth, ",
  ];
  const showRuEn = localStorage.getItem("language") || "ru";

  let today = new Date(),
    hour = today.getHours(),
    currentBgCount = hour;

  document.body.style.backgroundImage = `url('img/${bgImages[currentBgCount]}')`;
  localStorage.setItem("bgCount", currentBgCount);

  if (hour < 6) {
    // Nigth
    greeting.textContent = showRuEn === "ru" ? greetingRu[3] : greetingEn[3];
    document.body.style.color = "white";
  } else if (hour < 12) {
    // Morning
    greeting.textContent = showRuEn === "ru" ? greetingRu[0] : greetingEn[0];
    document.body.style.color = "white";
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = showRuEn === "ru" ? greetingRu[1] : greetingEn[1];
    document.body.style.color = "white";
  } else {
    // Evening
    greeting.textContent = showRuEn === "ru" ? greetingRu[2] : greetingEn[2];
    document.body.style.color = "white";
  }
}

// Next Background Img
function setBgimg() {
  let nextBgCount = (parseInt(localStorage.getItem("bgCount")) + 1) % 24;
  tempBg.style.backgroundImage = `url('img/${bgImages[nextBgCount]}')`;
  localStorage.setItem("bgCount", nextBgCount);
  tempBg.style.opacity = "1";
  next_bgimg_button.setAttribute("disabled", "true");
  setTimeout(() => {
    document.body.style.backgroundImage = `url('img/${bgImages[nextBgCount]}')`;
    tempBg.style.opacity = "0";
    next_bgimg_button.removeAttribute("disabled");
  }, 500);
}

// Get Name
function getName() {
  if (!!localStorage.getItem("name") === false) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else if (name.textContent === "") {
    name.textContent = localStorage.getItem("name") || "[Enter Name]";
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

// clearName
function clearName() {
  name.textContent = "";
}

// Get Focus
function getFocus() {
  if (!!localStorage.getItem("focus") === false) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else if (focus.textContent === "") {
    focus.textContent = localStorage.getItem("focus") || "[Enter Focus]";
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

// clearFocus
function clearFocus() {
  focus.textContent = "";
}

// Get Quote
async function getQuote() {
  let lg = localStorage.getItem("language") || "ru";
  waiting.style.display = "block";
  blockquote.textContent = lg === "ru" ? "Загрузка цитаты" : "Download Quote";
  figcaption.textContent = "";
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=${lg}`;
  const rez = await fetch(url);
  const data = await rez.json();
  waiting.style.display = "none";
  quoteWrapper.style.opacity = "0";
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
  quoteWrapper.style.opacity = "0.9";
}

// Close Quote Modal
function closeQuoteModal() {
  quoteWrapper.style.opacity = "0";
  setTimeout(() => (quoteWrapper.style.display = "none"), 1000);
}

// Initial Language
function initialLanguage() {
  const focusQuestionRu = "Какая Ваша цель на сегодня?";
  const focusQuestionEn = "What Is Your Focus For Today?";
  const lgDefault = "ru";
  const lg = localStorage.getItem("language") || lgDefault;
  // isNone(lg) && localStorage.setItem("language", lgDefault);

  languageItem.forEach((item) => {
    item.classList.remove("active");
  });
  lg === "ru" && languageItem[0].classList.add("active");
  lg === "en" && languageItem[1].classList.add("active");

  focusQuestion.textContent = lg === "ru" ? focusQuestionRu : focusQuestionEn;
  showDate();
  setBgGreet();
}

// Set Language
function setLanguage(e) {
  localStorage.setItem("language", e.target.id);
  initialLanguage();
}
// Initial Time Format
function initialTimeFormat() {
  const timeFormatDefault = "24";
  const timeFormat = localStorage.getItem("timeFormat") || timeFormatDefault;

  timeFormatItem.forEach((item) => {
    item.classList.remove("active");
  });

  timeFormat === "24" && timeFormatItem[0].classList.add("active");
  timeFormat === "AmPm" && timeFormatItem[1].classList.add("active");

  showAmPm = timeFormat === "AmPm";
  showTime();
}

// Set Time Format
function setTimeFormat(e) {
  localStorage.setItem("timeFormat", e.target.id);
  initialTimeFormat();
}

// Initial Settings
function initialSettings() {
  initialLanguage();
  initialTimeFormat();
}

// Reopen Settings List
function reopenSettingsList() {
  showSettings = !showSettings;
  if (showSettings) {
    settingsButton.style.transform = "rotate(90deg)";
    settingsList.style.display = "flex";
    settingsList.style.left = "-40vw";
    // transition: left 0.8s ease-in-out;
  } else {
    settingsButton.style.transform = "rotate(-90deg)";
    settingsList.style.display = "none";
    settingsList.style.left = "0";
  }
  // showSettings && (settingsButton.style.transform = "rotate(120deg)");
  // !showSettings && (settingsButton.style.transform = "rotate(-120deg)");

  // showSettings && settingsList.classList.add("settings_open");
  // !showSettings && settingsList.classList.remove("settings_open");
}
// Get City
function getCity() {
  if (!!localStorage.getItem("city") === false) {
    city.textContent = "[Enter City]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}
// Set Weather City
function setCity(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("city", e.target.innerText);
      focus.blur();
      getWeather();
    }
  } else if (city.textContent === "") {
    city.textContent = localStorage.getItem("city") || "[Enter City]";
  } else {
    localStorage.setItem("city", e.target.innerText);
    getWeather();
  }
}
// clearCity
function clearCity() {
  city.textContent = "";
}

// Get Weahter
async function getWeather() {
  const windDirectionTrans = ["СВ", "ЮВ", "ЮЗ", "СЗ"];
  const windDirectionPure = ["С", "В", "Ю", "З"];
  let windDirection = "";
  let currCity = localStorage.getItem("city");
  weatherIcon.className = "weather-icon owf";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&lang=ru&appid=${weatherKey}&units=metric`;
  try {
    const rez = currCity && (await fetch(url));
    const data = rez && (await rez.json());
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    const worldSite = data.wind.deg / 90;
    if (data.wind.deg % 90 === 0) {
      windDirection = windDirectionPure[Math.floor(worldSite)];
    } else {
      windDirection = windDirectionTrans[Math.floor(worldSite)];
    }
    temperature.innerHTML = `${data.main.temp > 0 && "+"}${
      data.main.temp
    }<span>C</span>`;
    humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
    wind.innerHTML = `${data.wind.speed}<span>м/с </span>${windDirection}`;
  } catch (e) {
    city.textContent = "Город не найден";
    temperature.innerText = "-";
    humidity.innerText = "-";
    wind.innerText = "-";
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("focus", clearName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("focus", clearFocus);
focus.addEventListener("blur", setFocus);
nextBgimgButton.addEventListener("click", setBgimg);
closeQuote.addEventListener("click", closeQuoteModal);
nextQuote.addEventListener("click", getQuote);
languageItem.forEach((item) => {
  item.addEventListener("click", setLanguage);
});
timeFormatItem.forEach((item) => {
  item.addEventListener("click", setTimeFormat);
});
settingsButton.addEventListener("click", reopenSettingsList);
city.addEventListener("focus", clearCity);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);

// Run
showTime();
getName();
getFocus();
getQuote();
initialSettings();
getCity();
