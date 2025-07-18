const addEmployeeButton = document.getElementById('submit-btn');
const employeeName = document.getElementById('name');
const employeeRole = document.getElementById('role');
const employeeStatues = document.getElementById('status');

const nameError = document.getElementById('name-error');
const roleError = document.getElementById('role-error');
const statuesError = document.getElementById('status-error');

const table = document.getElementById('employees-table').querySelector('tbody');
const activeCount = document.getElementById('active-count');

const trashTable = document.getElementById('trash-table').querySelector('tbody');
const trashCount = document.getElementById('trash-count');
const trashSection = document.getElementById('trash-section');
const toggleTrashBtn = document.getElementById('toggle-trash');

activeCount.textContent = '0';
trashCount.textContent = '0';
trashSection.style.display = 'none';

toggleTrashBtn.addEventListener('click', function() {
    trashSection.style.display = trashSection.style.display === 'none' ? 'block' : 'none';
});

addEmployeeButton.addEventListener('click', function(e) {
    e.preventDefault();

    let valid = true;

    if (employeeName.value.trim() === '') {
        nameError.style.color = 'red';
        nameError.textContent = 'Name is required';
        valid = false;
    } else {
        nameError.textContent = '';
        employeeName.style.borderColor = 'green';
    }

    if (employeeRole.value.trim() === '') {
        roleError.style.color = 'red';
        roleError.textContent = 'Role is required';
        valid = false;
    } else {
        roleError.textContent = '';
        employeeRole.style.borderColor = 'green';
    }

    if (employeeStatues.value.trim() === '') {
        statuesError.style.color = 'red';
        statuesError.textContent = 'Status is required';
        valid = false;
    } else {
        statuesError.textContent = '';
        employeeStatues.style.borderColor = 'green';
    }

    if (valid) {

        const tdName = document.createElement('td');
        const tdRole = document.createElement('td');
        const tdStatues = document.createElement('td');
        const tdActionRemove = document.createElement('button');
        const tdActionEdit = document.createElement('button');

        tdName.textContent = employeeName.value;
        tdRole.textContent = employeeRole.value;
        tdStatues.textContent = employeeStatues.value;

        tdStatues.style.color = 'white';

        if (employeeStatues.value === 'Active') {
            tdStatues.style.color = 'green';
        } else if (employeeStatues.value === 'On Leave') {
            tdStatues.style.color = 'orange';
        } else {
            tdStatues.style.color = 'red';
        }
      

        tdActionRemove.textContent = 'remove';
        tdActionRemove.style.backgroundColor = 'red';
        tdActionRemove.style.color = 'white';
        tdActionRemove.style.padding = '5px';
        tdActionRemove.style.border = 'none';
        tdActionRemove.style.margin = '10px';
        tdActionRemove.style.cursor = 'pointer';

        tdActionEdit.textContent = 'Edit';
        tdActionEdit.style.backgroundColor = '#007bff';
        tdActionEdit.style.color = 'white';
        tdActionEdit.style.padding = '5px';
        tdActionEdit.style.border = 'none';
        tdActionEdit.style.margin = '0 10px';
        tdActionEdit.style.cursor = 'pointer';

        const tr = document.createElement('tr');
        tr.setAttribute('data-status', employeeStatues.value);
        tr.append(tdName, tdRole, tdStatues, tdActionRemove, tdActionEdit);
        table.appendChild(tr);

        activeCount.textContent = parseInt(activeCount.textContent) + 1;

        employeeName.value = '';
        employeeRole.value = '';
        employeeStatues.value = '';

        tdActionRemove.addEventListener('click', function() {
            table.removeChild(tr);
            activeCount.textContent = parseInt(activeCount.textContent) - 1;

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
            restoreBtn.style.backgroundColor = 'green';
            restoreBtn.style.color = 'white';
            restoreBtn.style.border = 'none';
            restoreBtn.style.padding = '5px';
            restoreBtn.style.margin = '0 10px';
            restoreBtn.style.cursor = 'pointer';

            deleteBtn.textContent = 'delete'
            deleteBtn.style.backgroundColor = 'red';
            deleteBtn.style.color = 'white';
            deleteBtn.style.border = 'none';
            deleteBtn.style.padding = '5px';
            deleteBtn.style.margin = '0 10px';
            deleteBtn.style.cursor = 'pointer';

            trashActionsTd.appendChild(restoreBtn);
            trashActionsTd.appendChild(deleteBtn);

            trashTr.append(trashName, trashRole, trashStatus, trashActionsTd);
            trashTable.appendChild(trashTr);
            trashCount.textContent = parseInt(trashCount.textContent) + 1;

            restoreBtn.addEventListener('click', function() {
                trashTable.removeChild(trashTr);
                trashCount.textContent = parseInt(trashCount.textContent) - 1;
                table.appendChild(tr);
                activeCount.textContent = parseInt(activeCount.textContent) + 1;
            });

            deleteBtn.addEventListener('click', function(){
                  console.log(trashTable.removeChild(trashTr))
                  trashTable.removeChild(trashTr)
            })
        });

        tdActionEdit.addEventListener('click', function() {
            const newName = prompt('Enter new full name:', tdName.textContent);
            const newRole = prompt('Enter new Role:', tdRole.textContent);
            const newStatus = prompt('Enter new Status (Active / On Leave / Terminated):', tdStatues.textContent);

            if (newName)
                   tdName.textContent = newName;
            if (newRole)
                   tdRole.textContent = newRole;
            if (newStatus) {
                tdStatues.textContent = newStatus;
                tr.setAttribute('data-status', newStatus);
                if (newStatus === 'Active') {
                    tdStatues.style.color = 'green';
                } else if (newStatus === 'On Leave') {
                    tdStatues.style.color = 'orange';
                } else {
                    tdStatues.style.color = 'red';
                }
            }
        });

    }
});
