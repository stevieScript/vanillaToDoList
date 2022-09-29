const form = document.querySelector("#form");
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener("click", addTodo);
list.addEventListener("click", targetListen);

function addTodo(e) {
	e.preventDefault();

	if (input.value === "") return;

	const newTodo = document.createElement("div");
	newTodo.classList.add("todo");

	const todoLi = document.createElement("li");
	todoLi.innerText = input.value;

	todoLi.classList.add("item");

	newTodo.appendChild(todoLi);

	input.value = "";

	const checkButton = document.createElement("button");
	checkButton.innerHTML =
		'<ion-icon id ="check-btn" name="checkmark-outline"></ion-icon>';
	checkButton.classList.add("check");
	todoLi.append(checkButton);

	const remove = document.createElement("button");
	remove.innerHTML =
		'<ion-icon id = "remove-btn" name="trash-outline"></ion-icon>';
	remove.classList.add("remove");
	todoLi.append(remove);
	list.appendChild(newTodo);

	storedTodos.push({ item: todoLi.innerText, checked: false });
	localStorage.setItem("todos", JSON.stringify(storedTodos));
}

function targetListen(e) {
	const targetClick = e.target;
	console.log(e.target.innerText);
	console.log(targetClick.parentElement.textContent);
	console.log(e.target.parentElement.parentElement);

	if (targetClick.className === "remove") {
		for (let i = 0; i < storedTodos.length; i++) {
			if (storedTodos[i].item === targetClick.parentElement.textContent) {
				storedTodos.splice([i], 1);
				localStorage.setItem("todos", JSON.stringify(storedTodos));
			}
			targetClick.parentElement.parentElement.remove();
		}
	} else if (!targetClick.parentElement.checked) {
		targetClick.parentElement.classList.toggle("line");
		targetClick.checked = true;
	} else {
		targetClick.parentElement.classList.toggle("line");
		targetClick.checked = false;
	}
	for (let i = 0; i < storedTodos.length; i++) {
		if (storedTodos[i].item === targetClick.parentElement.innerText) {
			storedTodos[i].checked = !storedTodos[i].checked;
			localStorage.setItem("todos", JSON.stringify(storedTodos));
		}
	}
}

function getTodos() {
	storedTodos.forEach((todo) => {
		const newTodo = document.createElement("div");
		newTodo.classList.add("todo");

		const todoLi = document.createElement("li");
		todoLi.innerText = todo.item;
		todoLi.classList.add("item");
		todoLi.checked = todo.checked ? true : false;
		if (todoLi.checked) {
			todoLi.classList.toggle("line");
		}

		newTodo.appendChild(todoLi);
		const checkButton = document.createElement("button");
		checkButton.innerHTML =
			'<ion-icon id ="check-btn" name="checkmark-outline"></ion-icon>';
		checkButton.classList.add("check");
		todoLi.append(checkButton);

		const remove = document.createElement("button");
		remove.innerHTML =
			'<ion-icon id = "remove-btn" name="trash-outline"></ion-icon>';
		remove.classList.add("remove");
		todoLi.append(remove);
		list.appendChild(newTodo);
	});
}
