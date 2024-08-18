
function goBack() {
    location.href = "./index.html"
    window.close()
}

let preData = localStorage.getItem("stdDetails");
studentDtails = [...JSON.parse(preData)];

let ViewDetails = document.getElementById("ViewDetails");
let table = document.createElement("table");

table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Cource</th>
                <th>Year</th>
                <th>College</th>
                <th colspan=""></th>
                <th colspan=""></th>
            </tr>
        </thead>
`
let tbody = document.createElement("tbody");

// console.log(studentDtails.length)
function checkDetails() {
    if (studentDtails.length > 0) {
        for (let i = 0; i < studentDtails.length; i++) {
            tbody.innerHTML += `<tr id="bodyRow" name="tableRow">
                <td><input type="text" name="stdName" id="name" value="${studentDtails[i].stdname.toUpperCase()}" maxlength="30" readonly></td>
                <td><input type="text" name="stdCource" id="cource" value="${studentDtails[i].cource.toUpperCase()}" maxlength="30" readonly></td>
                <td><input type="text" name="stdYear" id="year" value="${studentDtails[i].year.toUpperCase()}" maxlength="30" readonly></td>
                <td><input type="text" name="stdCollege" id="college" value="${studentDtails[i].college.toUpperCase()}" maxlength="30" readonly></td>
                <td class="operationBtn"><button id="deleteBtn" onclick="deleteData(this)">Delete</button></td> 
                <td class="operationBtn"><button id="updateData" onclick="updateData(this)">Update</button></td>
            </tr>`
        }
        table.appendChild(tbody);
        ViewDetails.appendChild(table);
    }
    else {
        ViewDetails.innerHTML = `<h2>No Data Available!</h2>`
    }
}
function saveData() {
    let name = document.getElementsByName("stdName");
    let cource = document.getElementsByName("stdCource");
    let year = document.getElementsByName("stdYear");
    let college = document.getElementsByName("stdCollege");

    let newLocalStorate = []
    for (let i = 0; i < name.length; i++) {
        let std = name[i].value;
        let stdCource = cource[i].value;
        let stdYear = year[i].value;
        let stdClg = college[i].value;
        if (std.trim() !== "" && stdCource.trim() !== "" && stdYear.trim() !== "" && stdClg.trim() !== "") {
            let newStd = {
                stdname: std,
                cource: stdCource,
                year: stdYear,
                college: stdClg
            }
            newLocalStorate.push(newStd);
        }
        else {
            console.log("Error")
        }
    }
    localStorage.setItem("stdDetails", JSON.stringify(newLocalStorate))
}
function deleteData(event) {
    let conform = confirm("Do you realy want to delete data ?")
    if (conform) {
        let node = event.parentNode.parentNode;
        node.remove();
        saveData();
    }
    --studentDtails.length;
    console.log(studentDtails.length)
    if (studentDtails.length <= 0) {
        ViewDetails.innerHTML = `<h2>No Data Available!</h2>`
    }
}
function updateData(button) {
    var row = button.closest('tr');
    var inputs = row.querySelectorAll('input');
    let checkBox = true;
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            checkBox = false;
        }
    });
    if (!checkBox) {
        alert("Enter a value in all fields");
        button.innerHTML = "Save";
        return;
    }
    let isUpdating = button.innerHTML === "Update";
    button.innerHTML = isUpdating ? "Save" : "Update";
    inputs.forEach(input => {
        if (isUpdating) {
            input.removeAttribute("readonly");
        } else {
            input.setAttribute("readonly", "");
        }
    });

    saveData();
}
function validation(elementId, elementName) {
    var element = document.getElementById(elementId);
    if (element.value === "") {
        alert(elementName + " Can't Empty!Please fill the details..");
        element.focus();
        return false;
    }
    return true;
}