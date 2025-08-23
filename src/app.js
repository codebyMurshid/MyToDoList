document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const categorySelect = document.getElementById("categorySelect");
    const tasklist = document.getElementById("tasklist");

    function addTask() {

        if (taskInput.value.trim() === "") {
            return;
        }

        //Create elements
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = taskInput.value;

        const category = document.createElement("span");
        category.classList.add("category", categorySelect.value);
        category.textContent = categorySelect.value.charAt(0).toUpperCase() + categorySelect.value.slice(1);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => li.remove();

        //Append
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(category);
        li.appendChild(deleteBtn);

        tasklist.appendChild(li);

        //Trigger animation
        requestAnimationFrame(() => {
            li.classList.add("show");
        })

        //Clear input after adding
        taskInput.value = "";
        categorySelect.value = "";
    }

    //Adding to list using Enter key
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents accidental form submission/reload
            addTask();
        }
    });

    window.addTask = addTask;

});

