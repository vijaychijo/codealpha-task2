  document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

   
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}: Rs ${expense.amount}</span>
          <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }

    renderExpenses();

    
    expenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('expense-name').value;
      const amount = document.getElementById('expense-amount').value;
      if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
      } else {
        alert('Please fill out both fields.');
      }
    });

    
    window.editExpense = function(index) {
      const newName = prompt('Enter new expense name:');
      const newAmount = prompt('Enter new amount:');
      if (newName && newAmount) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      }
    };

    
    window.deleteExpense = function(index) {
      if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      }
    };
  });
