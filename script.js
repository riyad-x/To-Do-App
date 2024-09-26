const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close button
        span.className = "close";  // Add a class for styling if needed
        li.appendChild(span);

        inputBox.value = ""; // Clear the input box
        saveData();          // Save data to localStorage
    }
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage when page is loaded
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    addCloseButtonListeners(); // Reattach event listeners to remove tasks

    // Check for existing tasks and re-add the event listener for checking/unchecking
    if (listContainer.innerHTML !== "") {
        listContainer.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                saveData();  // Save checked status to localStorage
            } else if (e.target.tagName === "SPAN") {
                e.target.parentNode.remove();
                saveData();  // Save updated list to localStorage
            }
        });
    }
}

// Function to re-add close button functionality for items loaded from localStorage
function addCloseButtonListeners() {
    let closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(button => {
        button.onclick = function() {
            this.parentNode.remove();
            saveData(); // Save after deleting a task
        };
    });
}

// Initialize the list on page load
showTask();
