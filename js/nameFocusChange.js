//DOM Element
const name = document.getElementById("name"),
  focus = document.getElementById("focus"),

// Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
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
  if (localStorage.getItem("focus") === null) {
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

name.addEventListener("keypress", setName);
name.addEventListener("focus", clearName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("focus", clearFocus);
focus.addEventListener("blur", setFocus);

// Run
getName();
getFocus();