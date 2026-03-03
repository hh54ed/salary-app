
const dateInput = document.getElementById("work-date");
const wageInput = document.getElementById("wage");
const hoursInput = document.getElementById("hours");
const nightShiftCheckbox = document.getElementById("night-shift");
const saveButton = document.getElementById("save-btn");
const historyList = document.getElementById("history-list");
const totalSpan = document.getElementById("total-amount");


let workLog = JSON.parse(localStorage.getItem("salaryAppLogs")) || [];

// 画面表示
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

  // 配列の先頭に追加
  workLog.unshift(newRecord);

  // 保存して表示更新
  saveAndRender();
});

// データを保存して画面を更新する関数
function saveAndRender() {
  localStorage.setItem("salaryAppLogs", JSON.stringify(workLog));
  updateDisplay();
}


function updateDisplay() {
  historyList.innerHTML = "";
  let totalSalary = 0;

  
  workLog.forEach((record, index) => {
    const listItem = document.createElement("li");

    // テキスト部分を作る
    const textSpan = document.createElement("span");
    textSpan.innerHTML = `<strong>${record.date}</strong> : ${record.hours}時間 / ${record.salary.toLocaleString()}円 `;

    //  削除ボタンを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "delete-btn"; // CSSで見た目を変えられるようにクラスをつける

    // 削除ボタンが押された時の処理
    deleteBtn.addEventListener("click", () => {
      // 確認ダイアログを出す
      if (confirm("この記録を削除してもよろしいですか？")) {
        
        workLog.splice(index, 1);
        // 保存して表示更新
        saveAndRender();
      }
    });

    // リストの中に「テキスト」と「ボタン」を入れる
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteBtn);

    // 完成した行を画面に追加
    historyList.appendChild(listItem);

    totalSalary += record.salary;
  });

  totalSpan.textContent = totalSalary.toLocaleString();
}

