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
    let firstName = (_a = document.getElementById('firstNAME')) === null || _a === void 0 ? void 0 : _a.value.trim();
    let userName = (_b = document.getElementById('userNAME')) === null || _b === void 0 ? void 0 : _b.value.trim(); // Assuming 'userNAME' is intended for lastName
    let email = (_c = document.getElementById('mAIL')) === null || _c === void 0 ? void 0 : _c.value.trim();
    let password = (_d = document.getElementById('passWORD')) === null || _d === void 0 ? void 0 : _d.value.trim();
    let user = { firstName, userName, email, password };
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const errorText = document.getElementById('alatMsg');
    if (!firstName || !userName || !email || !password) {
        if (errorText) {
            errorText.style.cssText = 'color: #ff0000 !important; font-size: 14px !important; text-align: center !important; font-weight: bold !important; padding: 10px !important;';
            errorText.innerHTML = "All fields are required.";
        }
        return; // Stop the signup process if fields are missing
    }
    let pTest = passwordRegex.test(password);
    const found = allUsers.find(person => person.email === email);
    if (found) {
        alert("Email already exists, proceed to sign in page");
    }
    else {
        if (pTest) {
            allUsers.push(user);
            console.log(allUsers);
            localStorage.users = JSON.stringify(allUsers);
            setTimeout(() => {
                window.location.href = "../login.html";
            }, 1000);
        }
        else {
            if (errorText) {
                errorText.style.cssText = 'color: #ff0000 !important; font-size: 14px !important; text-align: center !important; font-weight: bold !important; padding: 10px !important;';
                errorText.innerHTML = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
            }
        }
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
            }
        }
    }
};
