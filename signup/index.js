"use strict";
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        signUp();
    }
});
let allUsers = [];
if (localStorage.users) {
    const usersString = localStorage.getItem('users');
    if (usersString) {
        let retrieved = JSON.parse(usersString);
        console.log(retrieved);
        allUsers = retrieved;
    }
    else {
        allUsers = [];
        console.log("No users found in local storage.");
    }
}
const signUp = () => {
    var _a, _b, _c, _d;
    let firstName = (_a = document.getElementById('firstName')) === null || _a === void 0 ? void 0 : _a.value;
    let lastName = (_b = document.getElementById('userName')) === null || _b === void 0 ? void 0 : _b.value;
    let email = (_c = document.getElementById('email')) === null || _c === void 0 ? void 0 : _c.value;
    let password = (_d = document.getElementById('password')) === null || _d === void 0 ? void 0 : _d.value;
    let user = { firstName, lastName, email, password };
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (firstName && lastName && email && password) {
        if (firstName !== " " || lastName !== " " || email !== " " || password !== " ") {
            let pTest = passwordRegex.test(password);
            const found = allUsers.find(person => person.email === email);
            if (found) {
                alert("Email already exists, proceed to sign in page");
            }
            else {
                if (pTest) {
                    allUsers.push(user);
                    console.log(allUsers);
                    let localStore = (localStorage.users = JSON.stringify(allUsers));
                    if (localStore) {
                        setTimeout(() => {
                            window.location.href = "../signup.html";
                        }, 1000);
                    }
                }
                else {
                    const errorText = document.getElementById('includes');
                    if (errorText) {
                        errorText.style.cssText = 'color: #ff0000; font-size: 14px; margin-top: 10px; text-align: center; font-weight: bold; padding: 10px;';
                        // errorText.innerHTML = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
                    }
                }
            }
        }
    }
    else {
    }
};
const clearUsers = () => {
    if (localStorage.users) {
        const usersString = localStorage.getItem('users');
        if (usersString) {
            let confirmation = prompt('Enter password to clear users');
            if (confirmation === 'admin123') {
                localStorage.removeItem('users');
                allUsers = [];
                alert('Users cleared successfully');
            }
            else {
                alert('Incorrect password');
                alert('Users not cleared');
            }
        }
    }
    else {
        allUsers = [];
    }
};
