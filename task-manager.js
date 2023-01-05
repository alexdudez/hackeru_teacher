const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const ElementClasses = {
  TaskText: "task-text",
  TaskCheckbox: "task-checkbox",
  DeleteButton: "delete-button",
  EditButton: "edit-button",
  Status: "status",
};

const ElementTags = {
  Input: "INPUT",
  Li: "LI",
  Span: "SPAN",
};
// Add a new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the task text from the input field
  const taskText = taskInput.value;
  if (taskText == "") {
    return;
  }
  // Create a new list item
  const li = document.createElement(ElementTags.Li);

  li.innerHTML = `
  <span class="${ElementClasses.TaskText}">${taskText}</span>
  <input type="checkbox" class="${ElementClasses.TaskCheckbox}">
  <button class="${ElementClasses.DeleteButton}">Delete</button>
  <button class="${ElementClasses.EditButton}">Edit</button>
  <label style="margin-left:1em;" class="${ElementClasses.Status}">Uncompleted</label>
`;

  // Add the new list item to the task list
  taskList.appendChild(li);

  // Clear the input field
  taskInput.value = "";
});

// Delete a task
taskList.addEventListener("click", (e) => {
  if (e.target.className === ElementClasses.DeleteButton) {
    const li = e.target.parentElement;
    taskList.removeChild(li);
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.className === ElementClasses.EditButton) {
    const li = e.target.parentElement;
    const text = li.querySelector(`.${ElementClasses.TaskText}`);
    const input = document.createElement(ElementTags.Input);
    input.type = "text";
    input.value = text.innerText;

    // Replace the task text span with the input field
    li.replaceChild(input, text);
    input.focus();
    input.select();
  }

  if (e.target.className === ElementClasses.TaskCheckbox) {
    const li = e.target.parentElement;
    const status = li.querySelector(`.${ElementClasses.Status}`);

    const text = li.querySelector(`.${ElementClasses.TaskText}`);

    text.style.textDecoration = e.target.checked ? "line-through" : "none";
    status.innerText = e.target.checked ? "Completed" : "Uncompleted";
  }
});

// Save the edited task
taskList.addEventListener("focusout", (e) => {
  if (e.target.tagName === ElementTags.Input && e.target.type === "text") {
    const li = e.target.parentElement;
    const taskText = e.target.value;

    // Create a new span element
    const span = document.createElement(ElementTags.Span);
    span.className = ElementClasses.TaskText;
    span.innerText = taskText;

    // Replace the input field with the task text span
    li.replaceChild(span, e.target);
  }
});
