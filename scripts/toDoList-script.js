const taskInput = document.getElementById("id-task-input")
const listWrapper = document.getElementById("id-list-wrapper")

function AddTask(){
    if(taskInput.value === ''){
        alert("You must write something, asshole...");
    }

    else{
        let GeneratedTask = document.createElement("li");
        GeneratedTask.innerHTML = taskInput.value;
        listWrapper.appendChild(GeneratedTask);
        let DeleteIcon = document.createElement("span");
        DeleteIcon.classList.add("DeleteIcon");
        DeleteIcon.innerHTML = "\u00d7";
        GeneratedTask.appendChild(DeleteIcon);
    }
    taskInput.value = "";
    SaveData();

    }

    listWrapper.addEventListener("click", function(e){
        if(e.target.tagName === "LI"){
            e.target.classList.toggle("Checked");
            SaveData();
        }
        else if(e.target.classList.contains("DeleteIcon")){
            e.target.parentElement.remove();
            SaveData();
        } 
    }, false);

    function SaveData(){
        localStorage.setItem("SavedElement", listWrapper.innerHTML);
    }
    
    function ShowData(){
        listWrapper.innerHTML = localStorage.getItem("SavedElement")
    }
    ShowData()