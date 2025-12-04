let users = [];

function showMessage(msg) {
    document.getElementById('message').innerText = msg;
}

function showForm(formName) {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';

    document.getElementById(formName + 'Form').style.display = 'block';

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    if(formName === 'register') tabs[0].classList.add('active');
    if(formName === 'login') tabs[1].classList.add('active');
    if(formName === 'update') tabs[2].classList.add('active');

    showMessage('');
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if(users.find(u => u.email === email)) {
        showMessage('Email already exists!');
        return;
    }

    users.push({ name, email, password });
    showMessage('Registration successful!');
    this.reset();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if(!user) {
        showMessage('Invalid email or password!');
        return;
    }

    showMessage(`Login successful! Welcome, ${user.name}`);
    this.reset();
});

document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('updateEmail').value;
    const newName = document.getElementById('updateName').value;

    const user = users.find(u => u.email === email);
    if(!user) {
        showMessage('User not found!');
        return;
    }

    user.name = newName;
    showMessage('Profile updated successfully!');
    this.reset();
});
