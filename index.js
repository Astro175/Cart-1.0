const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const settings = {
  databaseURL: "https://mobile-app-v2-60304-default-rtdb.firebaseio.com/",
};

const app = initializeApp(settings);
const db = getDatabase(app);
const shoppingListInDB = ref(db, "shoppingList");

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());
  // Add below this line
  shoppingListEl.innerHTML = "";
  for (let index = 0; index < itemsArray.length; index++) {
    const item = itemsArray[index];
    appendToShoppingList(item);
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);
  clearInputField();
});

function appendToShoppingList(item) {
  shoppingListEl.innerHTML += `<li>${item}</li>`;
}

function clearInputField() {
  inputFieldEl.value = "";
}
