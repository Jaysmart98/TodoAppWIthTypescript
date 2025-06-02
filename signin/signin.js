"use strict";
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        signIn();
    }
});
const signIn = () => {
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    const errorMsgElement = document.getElementById('signInErrorMsg');
    const email = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value.trim();
    const password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value.trim();
    const storedUsersString = localStorage.getItem('users');
    if (storedUsersString) {
        try {
            const storedUsers = JSON.parse(storedUsersString);
            const foundUser = storedUsers.find(user => user.email === email && user.password === password);
            if (foundUser) {
                alert(`Sign in successful! Welcome, ${foundUser.firstName} ${foundUser.lastName}`);
                window.location.href = "../dashboard/dashboard.html";
            }
            else {
                if (errorMsgElement) {
                    errorMsgElement.classList.remove('d-none'); // Show the error message
                }
            }
        }
        catch (error) {
            console.error("Error parsing users from local storage:", error);
            if (errorMsgElement) {
                errorMsgElement.classList.remove('d-none');
                errorMsgElement.textContent = "An error occurred during sign in.";
            }
        }
    }
    else {
        if (errorMsgElement) {
            errorMsgElement.classList.remove('d-none');
            errorMsgElement.textContent = "No accounts found. Please sign up.";
        }
    }
};
