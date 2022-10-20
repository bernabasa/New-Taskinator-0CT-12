
var taskInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");

var taskButtonHandler = function(event) {
  console.log(event.target);

  if (event.target.matches(".delete-btn")) {
    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  // get target element from event
  var targetE1 = event.target;

  // edit button was clicked

  if (targetE1.matches(".edit-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
  }

  // delete button was clicked

  else if (targetE1.matches(".delete-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id'" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressE1.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    tasksCompletedE1.appendChild(taskSelected);
  }
};

var editTask = function(taskId) {
  console.log("editing task #" + taskId);
  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
var taskType = taskSelected.querySelector("span.task-type").textContent;
document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";

formEl.setAttribute("data-task-id", taskId);
};

pageContentEl.addEventListener("click", taskButtonHandler);

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};


var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var isEdit = formEl.hasAttribute("data-task-id");
  createTaskEl(taskDataObj);
  
  if(isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completedEditTask(taskNameInput, taskTypeInput, taskId);

  }

  // no data attribute, so create object as normal and pass to createTaskE1 function
  else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
}
};

var completedEditTask = function(taskName, taskType, taskId) {
 // find the matching task list item
 var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

 // set new values
 taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");
formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add tasks id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  console.dir(listItemEl);

  var taskActionsE1 = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsE1);

  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    // create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    // create delete button

    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");

    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element

        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectE1.appendChild(statusOptionE1);

    }
    return actionContainerE1;
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);