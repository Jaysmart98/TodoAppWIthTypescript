interface User {
    firstName: string,
    userName: string,
    email: string,
    password: string
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        signIn();
    }
});

const signIn = () => {
    const emailInput = document.getElementById('signInEmail') as HTMLInputElement;
    const passwordInput = document.getElementById('signInPassword') as HTMLInputElement;
    const errorMsgElement = document.getElementById('signInErrorMsg');

    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    const storedUsersString = localStorage.getItem('users');

    if (storedUsersString) {
        try {
            const storedUsers: User[] = JSON.parse(storedUsersString);
            const foundUser = storedUsers.find(user => user.email === email && user.password === password); // In a real app, you'd compare hashed passwords

            if (foundUser) {
                alert(`Sign in successful! Welcome, ${foundUser.firstName} (${foundUser.userName})`);
                window.location.href = "../dashboard/dashboard.html";
            } else {
                if (errorMsgElement) {
                    errorMsgElement.classList.remove('d-none');
                }
            }
        } catch (error) {
            console.error("Error parsing users from local storage:", error);
            if (errorMsgElement) {
                errorMsgElement.classList.remove('d-none');
                errorMsgElement.textContent = "An error occurred during sign in.";
            }
        }
    } else {
        if (errorMsgElement) {
            errorMsgElement.classList.remove('d-none');
            errorMsgElement.textContent = "No accounts found. Please sign up.";
        }
    }
};