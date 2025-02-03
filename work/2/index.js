document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const addRowsButton = document.getElementById("add-rows");
    const rowCountInput = document.getElementById("row-count");
    
    function createRow() {
        const row = document.createElement("tr");
        
        const lastNameCell = document.createElement("td");
        const lastNameInput = document.createElement("input");
        lastNameInput.type = "text";
        lastNameCell.appendChild(lastNameInput);
        
        const firstNameCell = document.createElement("td");
        const firstNameInput = document.createElement("input");
        firstNameInput.type = "text";
        firstNameCell.appendChild(firstNameInput);
        
        const grade1Cell = document.createElement("td");
        const grade1Select = document.createElement("select");
        const emptyOption1 = document.createElement("option");
        emptyOption1.value = "";
        emptyOption1.textContent = "-";
        const yesOption1 = document.createElement("option");
        yesOption1.value = "yes";
        yesOption1.textContent = "Да";
        const noOption1 = document.createElement("option");
        noOption1.value = "no";
        noOption1.textContent = "Нет";
        grade1Select.append(emptyOption1, yesOption1, noOption1);
        grade1Cell.appendChild(grade1Select);
        
        const grade2Cell = document.createElement("td");
        const grade2Select = document.createElement("select");
        const emptyOption2 = document.createElement("option");
        emptyOption2.value = "";
        emptyOption2.textContent = "-";
        const yesOption2 = document.createElement("option");
        yesOption2.value = "yes";
        yesOption2.textContent = "Да";
        const noOption2 = document.createElement("option");
        noOption2.value = "no";
        noOption2.textContent = "Нет";
        grade2Select.append(emptyOption2, yesOption2, noOption2);
        grade2Cell.appendChild(grade2Select);
        
        row.append(lastNameCell, firstNameCell, grade1Cell, grade2Cell);
        
        function updateRowColor() {
            if (!grade1Select.value || !grade2Select.value) {
                row.style.backgroundColor = "";
            } else if (grade1Select.value === "yes" && grade2Select.value === "yes") {
                row.style.backgroundColor = "lightgreen";
            } else if (grade1Select.value === "no" && grade2Select.value === "no") {
                row.style.backgroundColor = "lightcoral";
            } else {
                row.style.backgroundColor = "lightyellow";
            }
        }
        
        lastNameInput.addEventListener("input", updateRowColor);
        firstNameInput.addEventListener("input", updateRowColor);
        grade1Select.addEventListener("change", updateRowColor);
        grade2Select.addEventListener("change", updateRowColor);
        
        tableBody.appendChild(row);
    }
    
    addRowsButton.addEventListener("click", function () {
        const count = parseInt(rowCountInput.value) || 1;
        for (let i = 0; i < count; i++) {
            createRow();
        }
    });
});