// Function 1: Switch between calculator tabs
function showTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  for (let i = 0; i < contents.length; i++) {
    if (contents[i]) contents[i].classList.remove('active');
  }

  const buttons = document.querySelectorAll('.tab-btn');
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i]) buttons[i].classList.remove('active');
  }

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.classList.add('active');

  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
}

// Function 2: Get Currency Symbol Safely
function getCurrency() {
  const selectElem = document.getElementById('currency-select');
  return selectElem ? selectElem.value : '₹';
}

// Function 3: Calculate Hourly Rate
function calculateRate() {
  const currency = getCurrency();
  
  // Safe element fetching
  const incomeElem = document.getElementById('income');
  const expensesElem = document.getElementById('expenses');
  const hoursElem = document.getElementById('hours');
  const resultBox = document.getElementById('rate-result');

  if (!incomeElem || !expensesElem || !hoursElem || !resultBox) {
    console.error("One or more input IDs in index.html do not match script.js!");
    return;
  }

  const income = parseFloat(incomeElem.value) || 0;
  const expenses = parseFloat(expensesElem.value) || 0;
  const hours = parseFloat(hoursElem.value) || 0;

  if (hours <= 0) {
    resultBox.innerText = "Please enter valid billable hours greater than zero.";
    return;
  }

  const totalNeededPerMonth = income + expenses;
  const totalHoursPerMonth = hours * 4;
  const hourlyRate = (totalNeededPerMonth / totalHoursPerMonth).toFixed(2);

  resultBox.innerText = `You should charge at least ${currency}${hourlyRate} / hour.`;
}

// Function 4: Calculate Tip
function calculateTip() {
  const currency = getCurrency();

  const billElem = document.getElementById('bill');
  const tipElem = document.getElementById('tip-percent');
  const peopleElem = document.getElementById('people');
  const resultBox = document.getElementById('tip-result');

  if (!billElem || !tipElem || !peopleElem || !resultBox) {
    console.error("One or more input IDs in index.html do not match script.js!");
    return;
  }

  const bill = parseFloat(billElem.value) || 0;
  const tipPercent = parseFloat(tipElem.value) || 0;
  const people = parseFloat(peopleElem.value) || 1;

  if (people <= 0) {
    resultBox.innerText = "Number of people must be at least 1.";
    return;
  }

  const tipTotal = bill * (tipPercent / 100);
  const grandTotal = bill + tipTotal;
  const perPerson = (grandTotal / people).toFixed(2);

  resultBox.innerText = `Total with tip: ${currency}${grandTotal.toFixed(2)} | Each person pays: ${currency}${perPerson}`;
}