document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        signUp();
    }
});

interface User {
    firstName:string,
    userName: string,
    email: string,
    password: string
}

let allUsers: User[] = []

if (localStorage.users) {
    const usersString = localStorage.getItem('users');
    if (usersString) {
        let retrieved = JSON.parse(usersString);
        console.log(retrieved);
        allUsers = retrieved;
    } else {
    allUsers = [];
    console.log("No users found in local storage.");
    }
}

const signUp = () => {
    let firstName = (document.getElementById('firstNAME') as HTMLInputElement)?.value.trim();
    let userName = (document.getElementById('userNAME') as HTMLInputElement)?.value.trim(); // Assuming 'userNAME' is intended for lastName
    let email = (document.getElementById('mAIL') as HTMLInputElement)?.value.trim();
    let password = (document.getElementById('passWORD') as HTMLInputElement)?.value.trim();

    let user:User = { firstName, userName, email, password};
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
    } else {
        if (pTest) {
            allUsers.push(user);
            console.log(allUsers);
            localStorage.users = JSON.stringify(allUsers);
            setTimeout(() => {
                window.location.href = "../login.html";
            }, 1000);
        } else {
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
            } else {
                alert('Incorrect password');
            }
        }
    }
};