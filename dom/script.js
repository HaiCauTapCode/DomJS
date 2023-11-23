let taskList = [];
let editingTask = -1;

let form = document.getElementById("form");
let input = document.getElementById("task-input");
let table = document.getElementById("task-table");

form.addEventListener('submit', function(e) {
    e.preventDefault(); // không cho load lại trang khi submit
    if (!input.value.trim()) {
        alert("Không được để trống");
    } else {
        let existTask = taskList.some((item) => {
            return item === input.value;
        })
        if (existTask) {
            alert("Nhiệm vụ đã có trong bảng");
        } else {
            taskList.unshift(input.value);
            displayTask();
            input.value = "";
        }
    }
    input.focus();  // tự động focus vào ô input
})


function editTask(index) {
    editingTask = index;
    displayTask();
    document.getElementById("task-edit").focus();
}

function saveTask(index) {
    let inputEdit = document.getElementById("task-edit");
    if (inputEdit.value.trim()) {
        let existTask = taskList.some((item, index1) => {
            if (index !== index1) {
                return item === inputEdit.value.trim();  // trả về true or false nếu có 1 cái trùng
            } 
        })
        if (existTask) {
            alert("Nhiệm vụ đã có trong bảng");
        } else {
            editingTask = -1;
            taskList[index] = inputEdit.value.trim();
            displayTask();
        }
    } else {
        alert("Không được để trống");
    }
}

function cancelTask() {
    editingTask = -1;
    displayTask();
}

function deleteTask(index) {
    let confirmDelete = confirm("Bạn có chắc muốn xóa task này ?");
    if(confirmDelete) {
        taskList.splice(index, 1);
        displayTask();
    }
    input.focus();
}

function displayTask() {
    let tableContent = `<tr><th>STT</th><th>Nhiệm vụ</th><th>Edit</th><th>Delete</th></tr>`;
    taskList.forEach((val, index) => {
        if (editingTask === index) {
            tableContent += `<tr>
            <td>${index + 1}</td>
            <td><input type="text" id="task-edit" value="${val}"></td>
            <td><button data-index="${index}" id="btn-saveTask">Save</button></td>
            <td><button id="btn-cancelTask">Cancel</button></td>
            </tr>`;
        } else {
            tableContent += `<tr>
            <td>${index + 1}</td>
            <td>${val}</td>
            <td><button data-index="${index}" id="btn-editTask">Edit</button></td>
            <td><button data-index="${index}" id="btn-deleteTask">Delete</button></td>
            </tr>`;
        }
    });
    table.innerHTML = tableContent;
}

table.addEventListener('click', function(e) {
    let targetBtn = e.target;
    console.log(targetBtn);
    console.log(editingTask);
    if (targetBtn.id === "btn-editTask" && editingTask === -1) {
        editTask(Number(targetBtn.getAttribute("data-index")));
    }

    if (targetBtn.id === "btn-deleteTask" && editingTask === -1) {
        deleteTask(Number(targetBtn.getAttribute("data-index")));
    }

    if (targetBtn.id === "btn-saveTask" && Number(editingTask) !== -1) {
        saveTask(Number(targetBtn.getAttribute("data-index")));
    }

    if (targetBtn.id === "btn-cancelTask" && Number(editingTask) !== -1) {
        cancelTask();
    }
})