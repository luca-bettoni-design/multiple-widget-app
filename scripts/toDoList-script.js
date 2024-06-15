const TaskInput = document.getElementById("TaskInput")
const ListContainer = document.getElementById("ListContainer")

function AddTask(){
    if(TaskInput.value === ''){
        alert("You must write something, asshole...");
    }

    else{
        let GeneratedTask = document.createElement("li");
        GeneratedTask.innerHTML = TaskInput.value;
        ListContainer.appendChild(GeneratedTask);
        let DeleteIcon = document.createElement("span");
        DeleteIcon.classList.add("DeleteIcon");
        DeleteIcon.innerHTML = "\u00d7";
        GeneratedTask.appendChild(DeleteIcon);
    }
    TaskInput.value = "";
    SaveData();

    }

    ListContainer.addEventListener("click", function(e){
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
        localStorage.setItem("SavedElement", ListContainer.innerHTML);
    }
    
    function ShowData(){
        ListContainer.innerHTML = localStorage.getItem("SavedElement")
    }
    ShowData()