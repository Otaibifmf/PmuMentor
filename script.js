// ===========================
// User Model (Data Class)
// ===========================
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

// ===========================
// Storage Manager
// ===========================
class UserStorage {

    static saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static loadUser() {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }
}

// ===========================
// User Interface Controller
// ===========================
class UserUIController {

    constructor() {
        this.registerForm = document.getElementById("registerForm");
        this.loginForm = document.getElementById("loginForm");
        this.updateForm = document.getElementById("updateForm");
        this.messageBox = document.getElementById("message");
        this.tabButtons = document.querySelectorAll(".tab-btn");

        this.initializeEventListeners();
        this.showForm("register");
    }

    // ---------------------------
    // Form & Tab Display Handling
    // ---------------------------
    showForm(formName) {
        this.hideAllForms();
        this.clearActiveTabs();

        switch (formName) {
            case "register":
                this.registerForm.style.display = "block";
                this.tabButtons[0].classList.add("active");
                break;

            case "login":
                this.loginForm.style.display = "block";
                this.tabButtons[1].classList.add("active");
                break;

            case "update":
                this.updateForm.style.display = "block";
                this.tabButtons[2].classList.add("active");
                break;
        }
    }

    hideAllForms() {
        this.registerForm.style.display = "none";
        this.loginForm.style.display = "none";
        this.updateForm.style.display = "none";
    }

    clearActiveTabs() {
        this.tabButtons.forEach(btn => btn.classList.remove("active"));
    }

    // ---------------------------
    // Message Helper
    // ---------------------------
    showMessage(text, color = "green") {
        this.messageBox.style.color = color;
        this.messageBox.textContent = text;

        setTimeout(() => {
            this.messageBox.textContent = "";
        }, 3000);
    }

    // ---------------------------
    // Event Listener Initialization
    // ---------------------------
    initializeEventListeners() {
        this.registerForm.addEventListener("submit", (e) => this.handleRegister(e));
        this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
        this.updateForm.addEventListener("submit", (e) => this.handleUpdate(e));
    }

    // ---------------------------
    // REGISTER LOGIC
    // ---------------------------
    handleRegister(event) {
        event.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const user = new User(name, email, password);
        UserStorage.saveUser(user);

        this.showMessage("Registration successful!", "green");
    }

    // ---------------------------
    // LOGIN LOGIC
    // ---------------------------
    handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = UserStorage.loadUser();

        if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
            this.showMessage("Invalid login credentials!", "red");
            return;
        }

        window.location.href = "dashboard.html";
    }

    // ---------------------------
    // UPDATE PROFILE LOGIC
    // ---------------------------
    handleUpdate(event) {
        event.preventDefault();

        const newEmail = document.getElementById("updateEmail").value;
        const newName = document.getElementById("updateName").value;

        const user = UserStorage.loadUser();

        if (!user) {
            this.showMessage("No user found!", "red");
            return;
        }

        user.email = newEmail;
        user.name = newName;

        UserStorage.saveUser(user);

        this.showMessage("Profile updated successfully!", "green");
    }
}

// ===========================
// Initialize After DOM Ready
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const uiController = new UserUIController();

    window.showForm = function (formName) {
        uiController.showForm(formName);
    };
});
