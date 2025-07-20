const addEmployeeButton = document.getElementById('submit-btn');
const employeeName = document.getElementById('name');
const employeeRole = document.getElementById('role');
const employeeStatues = document.getElementById('status');
const employeeSalary = document.getElementById('salary');

const nameError = document.getElementById('name-error');
const roleError = document.getElementById('role-error');
const statuesError = document.getElementById('status-error');
const salaryError = document.getElementById('salary-error');

const table = document.getElementById('employees-table').querySelector('tbody');
const activeCount = document.getElementById('active-count');

const trashTable = document.getElementById('trash-table').querySelector('tbody');
const trashCount = document.getElementById('trash-count');
const trashSection = document.getElementById('trash-section');
const toggleTrashBtn = document.getElementById('toggle-trash');
const totalPayroll = document.getElementById('total-payroll');

const searchName = document.getElementById('search-name');
const filterName = document.getElementById('filter-name');
const filterRole = document.getElementById('filter-role');
const salaryMin = document.getElementById('salary-min');
const salaryMax = document.getElementById('salary-max');
const filterStatus = document.getElementById('filter-status');
const applyFiltersBtn = document.getElementById('apply-filters');
const deleteLowSalaryBtn = document.getElementById('delete-low-salary');

activeCount.textContent = '0';
trashCount.textContent = '0';
trashSection.style.display = 'none';
totalPayroll.textContent = '0 R';

function updatePayroll() {
  const salaries = Array.from(table.querySelectorAll('tr')).map(row => {
    const salary = row.querySelectorAll('td')[3]?.textContent;
    return parseFloat(salary) || 0;
  });
  const total = salaries.reduce((acc, val) => acc + val, 0);
  totalPayroll.textContent = `${total} R`;
}

toggleTrashBtn.addEventListener('click', () => {
  trashSection.style.display = trashSection.style.display === 'none' ? 'block' : 'none';
});

addEmployeeButton.addEventListener('click', function(e) {
  e.preventDefault();

  let valid = true;

  if (employeeName.value.trim() === '') {
    nameError.textContent = 'Name is required';
    valid = false;
  } else {
    nameError.textContent = '';
  }

  if (employeeRole.value.trim() === '') {
    roleError.textContent = 'Role is required';
    valid = false;
  } else {
    roleError.textContent = '';
  }

  if (employeeStatues.value.trim() === '') {
    statuesError.textContent = 'Status is required';
    valid = false;
  } else {
    statuesError.textContent = '';
  }

  if (!/^\d{1,9}$/.test(employeeSalary.value)) {
    salaryError.textContent = 'Valid salary is required';
    valid = false;
  } else {
    salaryError.textContent = '';
  }

  if (!valid) return;

  const tr = document.createElement('tr');
  const tdName = document.createElement('td');
  const tdRole = document.createElement('td');
  const tdStatues = document.createElement('td');
  const tdSalary = document.createElement('td');
  const tdBonus = document.createElement('td');
  const tdActions = document.createElement('td');

  const tdActionRemove = document.createElement('button');
  const tdActionEdit = document.createElement('button');
  const bonusBtn = document.createElement('button');

  tdName.textContent = employeeName.value;
  tdRole.textContent = employeeRole.value;
  tdStatues.textContent = employeeStatues.value;
  tdSalary.textContent = employeeSalary.value;
  tdBonus.textContent = '0';

  tdStatues.style.color = employeeStatues.value === 'Active' ? 'green' : 
                         employeeStatues.value === 'On Leave' ? 'orange' : 'red';

  if (parseFloat(employeeSalary.value) >= 100000) {
    tdName.innerHTML += ' <span class="badge">High</span>';
  }

  bonusBtn.textContent = 'Add Bonus';
  bonusBtn.className = 'btn btn-bonus';
  bonusBtn.addEventListener('click', () => {
    const bonusPercent = prompt('Enter bonus percentage:');
    if (bonusPercent && !isNaN(bonusPercent)) {
      const bonusAmount = (parseFloat(employeeSalary.value) * parseFloat(bonusPercent) / 100).toFixed(2);
      tdBonus.textContent = `${bonusAmount} R`;
      tdName.innerHTML += ' <span class="badge pink">Bonus</span>';
    }
  });

  tdActionRemove.textContent = 'Remove';
  tdActionRemove.className = 'btn btn-remove';
  tdActionRemove.addEventListener('click', () => {
    if (table.contains(tr)) {
      table.removeChild(tr);
      activeCount.textContent = parseInt(activeCount.textContent) - 1;
    }

    const trashTr = document.createElement('tr');
    const trashName = document.createElement('td');
    const trashRole = document.createElement('td');
    const trashStatus = document.createElement('td');
    const restoreBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const trashActionsTd = document.createElement('td');

    trashName.textContent = tdName.textContent;
    trashRole.textContent = tdRole.textContent;
    trashStatus.textContent = tdStatues.textContent;

    restoreBtn.textContent = 'Restore';
    restoreBtn.className = 'btn btn-restore';
    restoreBtn.addEventListener('click', () => {
      trashTable.removeChild(trashTr);
      trashCount.textContent = parseInt(trashCount.textContent) - 1;
      table.appendChild(tr);
      activeCount.textContent = parseInt(activeCount.textContent) + 1;
      updatePayroll();
    });

    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.addEventListener('click', () => {
      if (trashTable.contains(trashTr)) {
        trashTable.removeChild(trashTr);
        trashCount.textContent = parseInt(trashCount.textContent) - 1;
      }
    });

    trashActionsTd.append(restoreBtn, deleteBtn);
    trashTr.append(trashName, trashRole, trashStatus, trashActionsTd);
    trashTable.appendChild(trashTr);
    trashCount.textContent = parseInt(trashCount.textContent) + 1;
    updatePayroll();
  });

  tdActionEdit.textContent = 'Edit';
  tdActionEdit.className = 'btn btn-edit';
  tdActionEdit.addEventListener('click', () => {
    const newName = prompt('Enter new name:', tdName.textContent);
    const newRole = prompt('Enter new role:', tdRole.textContent);
    const newStatus = prompt('Enter new status:', tdStatues.textContent);
    const newSalary = prompt('Enter new salary:', tdSalary.textContent);

    if (newName) tdName.textContent = newName;
    if (newRole) tdRole.textContent = newRole;
    if (newStatus) {
      tdStatues.textContent = newStatus;
      tdStatues.style.color = newStatus === 'Active' ? 'green' : 
                             newStatus === 'On Leave' ? 'orange' : 'red';
    }
    if (newSalary && !isNaN(newSalary)) {
      tdSalary.textContent = newSalary;
      updatePayroll();
    }
  });

  tdActions.append(tdActionRemove, tdActionEdit);
  tdBonus.appendChild(bonusBtn);
  tr.setAttribute('data-status', employeeStatues.value);
  tr.append(tdName, tdRole, tdStatues, tdSalary, tdBonus, tdActions);
  table.appendChild(tr);

  activeCount.textContent = parseInt(activeCount.textContent) + 1;
  updatePayroll();

  employeeName.value = '';
  employeeRole.value = '';
  employeeStatues.value = '';
  employeeSalary.value = '';
});

applyFiltersBtn.addEventListener('click', () => {
  const name = filterName.value.toLowerCase();
  const role = filterRole.value.toLowerCase();
  const min = parseFloat(salaryMin.value) || 0;
  const max = parseFloat(salaryMax.value) || Infinity;
  const status = filterStatus.value;

  Array.from(table.querySelectorAll('tr')).forEach(row => {
    const [n, r, s, sal] = row.querySelectorAll('td');
    const salary = parseFloat(sal.textContent) || 0;
    const match =
      n.textContent.toLowerCase().includes(name) &&
      r.textContent.toLowerCase().includes(role) &&
      salary >= min && salary <= max &&
      (status === '' || s.textContent === status);
    row.style.display = match ? '' : 'none';
  });
});

searchName.addEventListener('input', () => {
  const val = searchName.value.toLowerCase();
  Array.from(table.querySelectorAll('tr')).forEach(row => {
    const name = row.querySelector('td').textContent.toLowerCase();
    row.style.display = name.includes(val) ? '' : 'none';
  });
});

deleteLowSalaryBtn.addEventListener('click', () => {
  Array.from(table.querySelectorAll('tr')).forEach(row => {
    const salary = parseFloat(row.querySelectorAll('td')[3]?.textContent);
    if (salary <= 20000) {
      table.removeChild(row);
      activeCount.textContent = parseInt(activeCount.textContent) - 1;
    }
  });
  updatePayroll();
});
