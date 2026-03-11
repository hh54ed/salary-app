
const dateInput = document.getElementById("work-date");
const wageInput = document.getElementById("wage");
const hoursInput = document.getElementById("hours");
const nightShiftCheckbox = document.getElementById("night-shift");
const saveButton = document.getElementById("save-btn");
const historyList = document.getElementById("history-list");
const totalSpan = document.getElementById("total-amount");


let workLog = JSON.parse(localStorage.getItem("salaryAppLogs")) || [];

updateDisplay();
dateInput.valueAsDate = new Date();

saveButton.addEventListener("click", () => {
  const date = dateInput.value;
  let wage = Number(wageInput.value);
  const hours = Number(hoursInput.value);

  if (date === "" || wage === 0 || hours === 0) {
    alert("日付、時給、時間を正しく入力してください");
    return;
  }

  if (nightShiftCheckbox.checked) {
    wage = wage * 1.25;
  }
  const dailySalary = Math.floor(wage * hours);

  const newRecord = {
    date: date,
    hours: hours,
    salary: dailySalary,
  };

  workLog.unshift(newRecord);

  saveAndRender();
});

function saveAndRender() {
  localStorage.setItem("salaryAppLogs", JSON.stringify(workLog));
  updateDisplay();
}


function updateDisplay() {
  historyList.innerHTML = "";
  let totalSalary = 0;

  
  workLog.forEach((record, index) => {
    const listItem = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.innerHTML = `<strong>${record.date}</strong> : ${record.hours}時間 / ${record.salary.toLocaleString()}円 `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "delete-btn"; 

    deleteBtn.addEventListener("click", () => {
     
      if (confirm("この記録を削除してもよろしいですか？")) {
        
        workLog.splice(index, 1);
      
        saveAndRender();
      }
    });

  
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteBtn);

    historyList.appendChild(listItem);

    totalSalary += record.salary;
  });

  totalSpan.textContent = totalSalary.toLocaleString();
}


