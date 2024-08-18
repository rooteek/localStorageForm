
let selecter = document.getElementById("numberSelecter");
let inputNumber = document.getElementById("number");
let studentDtails = []; // this array store local storage
inputNumber.addEventListener("blur", () => {
    selecter.innerHTML = `<option value="">Select the number</option>`;
    let optionsHTML = '';
    if (inputNumber.value >= 1) {
        for (let i = 1; i <= inputNumber.value; i++) {
            optionsHTML += `<option value="${i}">${i}</option>`;
        }
        selecter.innerHTML += optionsHTML;
    }
    else {
        alert("Please Enter 1 or More then 1");
    }
})
let form = document.getElementById("form");
let saveButnDiv = document.createElement('div');
let tbody = document.getElementById("tableBody");
selecter.addEventListener("change", createElement);
function createElement() {
    let tr;
    if (selecter.value > tbody.rows.length) {
        let rowNumber = (selecter.value - tbody.rows.length);
        for (let i = 0; i < rowNumber; i++) {
            tr = document.createElement("tr");
            tr.innerHTML = `<tr id="dtr">
                                <td>${tbody.rows.length + 1}</td>
                                <td><input type="text" id="name" name="stdName" placeholder="Enter name" maxlength="30"></td>
                                <td>
                                    <select id="cource" name="selectCource">
                                        <option value="">SELECT THE COURCE</option>
                                        <option value="bca">BCA</option>
                                        <option value="bba">BBA</option>
                                        <option value="bscit">BSCIT</option>
                                        <option value="b.com">B.COM</option>
                                        <option value="mca">MCA</option>
                                        <option value="mba">MBA</option>
                                        <option value="mscit">MSCIT</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="selectYear" id="year" >
                                        <option value="">SELECT SEMESTER</option>
                                        <option value="first">FIRST</option>
                                        <option value="second">SECOND</option>
                                        <option value="third">THIRD</option>
                                        <option value="forth">FORTH</option>
                                        <option value="fifth">FIFTH</option>
                                        <option value="sixth">SIXTH</option>
                                        <option value="seventh">SEVENTH</option>
                                        <option value="eighth">EIGHTH</option>
                                    </select>
                                </td>
                               <td><input type="text" id="college" placeholder="Enter name" name="collegeName" maxlength="30"></td>
                                <td><button id="deleteBtn" onclick="deleteRow(this)">Delete</button></td>
                            </tr>`
            tbody.appendChild(tr)
        }
    }
    var rows = tbody.getElementsByTagName('tr');
    if (selecter.value < tbody.rows.length) {
        let rowNumber = (tbody.rows.length - selecter.value); {
            for (let i = 0; i < rowNumber; i++) {
                tbody.removeChild(rows[rows.length - 1]);
            }
        }
    }

    saveButnDiv.id = "savebtnDiv";
    saveButnDiv.innerHTML = `<button id="savebtn">Save</button> <button id="cleanBtn" onclick="clearFormData()">Clear Form Data</button> <button id="showBtn">Show</button>`;
    form.appendChild(saveButnDiv);
    checkInputForm();

    // This is save button to save data
    let saveBtn = document.getElementById("savebtn");
    saveBtn.addEventListener(("click"), saveUserData);

    // This is show Button to show the details of the students
    document.getElementById("showBtn").addEventListener("click", () => {
        window.open("showData.html", "_blank");
    })
    updateRow()
}
function saveUserData() {
    let name = document.getElementsByName("stdName");
    let cource = document.getElementsByName("selectCource");
    let year = document.getElementsByName("selectYear");
    let college = document.getElementsByName("collegeName");
    // let saveBtn = document.getElementById("savebtn");
    let emptyBox = false;
    for (let i = 0; i < selecter.value; i++) {
        let std = name[i].value;
        let stdCource = cource[i].value;
        let stdYear = year[i].value;
        let stdClg = college[i].value;
        if (std.trim() === "" || stdClg.trim() === "" || stdCource.trim() === "" || stdYear.trim() === "") {
            emptyBox = true;
        }
    }
    // console.log(emptyBox)

    if (emptyBox) {
        console.log("Empty Sring");
        highLightInput();
        highLightFSelecter();
    }
    else {
        for (let i = 0; i < selecter.value; i++) {
            let std = name[i].value;
            let stdCource = cource[i].value;
            let stdYear = year[i].value;
            let stdClg = college[i].value;
            const stdDetails = {
                stdname: std,
                cource: stdCource,
                year: stdYear,
                college: stdClg
            }
            studentDtails.push(stdDetails);
        }
        console.log(studentDtails)
        highLightInput();
        highLightFSelecter()

        // localStorage.setItem("stdDetails", JSON.stringify(studentDtails));
        alert("Data inserted Successfully.....");
        clearFormData()
    }
    console.log(studentDtails)

}
function highLightInput() {
    let inputs = tbody.querySelectorAll("input");
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            input.setAttribute("class", "warnningClass")
        }
        else {
            input.removeAttribute("class", "warnningClass")
        }
    })
}
function highLightFSelecter() {
    let selects = tbody.querySelectorAll("select");
    selects.forEach((select) => {
        if (select.value.trim() === "") {
            select.setAttribute("class", "warnningClass")
        }
        else {
            select.removeAttribute("class", "warnningClass")
        }
    })
}
function clearFormData() {
    let inputs = tbody.querySelectorAll("input");
    let selects = tbody.querySelectorAll("select");
    inputs.forEach((input) => {
        input.value = ""
    });
    selects.forEach((select) => {
        select.value = ""
    })
}
function checkInputForm() {
    if (selecter.value > 0) {
        saveButnDiv.style.display = "block";
    }
    else {
        saveButnDiv.style.display = "none";
    }
}
function updateRow() {
    var tb = document.getElementById('tableBody');
    var tempSerial = 1;
    for (i = 0; i < tb.rows.length; i++) {
        let d = tb.rows[i].cells[0];
        d.textContent = tempSerial++;
    }
}
function deleteRow(event) {
    let node = event.parentNode.parentNode;
    selecter.value--;
    node.remove()
    checkInputForm()
    updateRow()
}
function preDataFromLoacalStorage() {
    let preData = localStorage.getItem("stdDetails");
    studentDtails = [...JSON.parse(preData)];
}
function update(event) {
    let row = event.closest("tr");
    let inputs = row.querySelectorAll("input");
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });
    if (!allFilled) {
        alert("Enter a value in all fields");
        inputs.forEach(input => {
            input.focus();
        });
        event.innerHTML = "Save";
        return;
    }

    let isUpdating = event.innerHTML === "Update";
    event.innerHTML = isUpdating ? "Save" : "Update";

    inputs.forEach(input => {
        if (isUpdating) {
            input.removeAttribute("readonly");
        } else {
            input.setAttribute("readonly", "");
        }
    });
}