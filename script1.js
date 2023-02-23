window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  // const username = prompt("Please enter your name:");

  const username = prompt("Please enter your name:");

  if (username === "") {
    alert("You did not enter your name");
    // Set a default value for username
    username = "Guest";
  }

  // Use the value of username here
  console.log("Hello, " + username);

  // Load tasks from local storage on page load
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to render the task list
  function renderTasks() {
    list_el.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      task_el.appendChild(task_content_el);

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = task.text;
      task_input_el.setAttribute("readonly", "readonly");

      task_content_el.appendChild(task_input_el);

      const task_info_el = document.createElement("div");
      task_info_el.classList.add("info");
      task_info_el.innerText = `Added by ${task.username} on ${task.date}`;

      task_content_el.appendChild(task_info_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerText = "Edit";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerText = "Delete";

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);

      task_el.appendChild(task_actions_el);

      list_el.appendChild(task_el);

      task_edit_el.addEventListener("click", (e) => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_edit_el.innerText = "Save";
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
        } else {
          task_edit_el.innerText = "Edit";
          task_input_el.setAttribute("readonly", "readonly");
          task.text = task_input_el.value;
          saveTasks();
        }
      });

      task_delete_el.addEventListener("click", (e) => {
        tasks.splice(i, 1);
        saveTasks();
        renderTasks();
      });
    }
  }

  // Render initial task list
  renderTasks();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    if (input.value.trim() === "") {
      return alert("please enter a value");
    }

    const now = new Date();
    const task_obj = {
      text: task,
      username: username,
      date: now.toLocaleString(),
    };

    tasks.push(task_obj);

    saveTasks();

    renderTasks();

    input.value = "";
  });
});
