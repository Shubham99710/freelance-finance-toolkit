// Tab Switching Logic
const navButtons = document.querySelectorAll('.nav-btn');
const calculatorCards = document.querySelectorAll('.calculator-card');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');

    // Hide all calculator cards
    calculatorCards.forEach(card => card.style.display = 'none');

    // Show selected calculator card
    const targetTab = button.getAttribute('data-tab');
    const activeCard = document.getElementById(targetTab);
    if (activeCard) {
      activeCard.style.display = 'block';
    }
  });
});

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

// Calculator 3: Compound Interest
const calcInterestBtn = document.getElementById('calc-interest-btn');

if (calcInterestBtn) {
  calcInterestBtn.addEventListener('click', () => {
    const principal = parseFloat(document.getElementById('initial-deposit').value) || 0;
    const monthlyContrib = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    const annualRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const years = parseFloat(document.getElementById('investment-years').value) || 0;

    if (years <= 0) {
      alert('Please enter a valid investment period in years.');
      return;
    }

    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    
    // Future value of initial deposit
    let futureValue = principal * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions
    if (monthlyRate > 0) {
      futureValue += monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      futureValue += monthlyContrib * months;
    }

    const totalDeposited = principal + (monthlyContrib * months);
    const totalInterest = futureValue - totalDeposited;

    // Display results formatted to 2 decimal places
    document.getElementById('total-value').textContent = futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('total-interest').textContent = totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementById('interest-result').style.display = 'block';
  });
}