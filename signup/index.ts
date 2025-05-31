document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        signUp();
    }
})

interface User {
    firstName:string,
    lastName: string,
    email: string,
    password: string
}

let allUsers:User[] = []

if (localStorage.users) {
    const usersString = localStorage.getItem('users');
    if (usersString) {
        let retrieved = JSON.parse(usersString);
        console.log(retrieved);
        allUsers = retrieved;
    } else {
        allUsers = []
    }
}

const signUp = () => {
    let firstName = (document.getElementById('firstName') as HTMLInputElement)?.value;
    let lastName = (document.getElementById('lastName') as HTMLInputElement)?.value;
    let email = (document.getElementById('email') as HTMLInputElement)?.value;
    let password = (document.getElementById('password') as HTMLInputElement)?.value

    let user:User = { firstName, lastName, email, password};
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!firstName && lastName && email && password) {
        if ( firstName !== " " || lastName !== " " || email !== " " || password !== " ") {
            let pTest = passwordRegex.test(password);
            const found = allUsers.find(person => person.email === email);
            if(found) {
                alert("Email already exists");
            } else {
                if (pTest) {
                    allUsers.push(user);
                    console.log(allUsers);
                    let localStore = (localStorage.users = JSON.stringify(allUsers));
                    if (localStore) {
                        setTimeout(() => {
                            window.location.href = "../index.html";
                        }, 1000);
                    }
                } else {
                    const errorText = document.getElementById('includes');
                    if (errorText) {
                        errorText.style.display = 'color: red !important;';
                        errorText.innerHTML = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
                    }
                }
            }
        }
        
    } else{

    }
}

const clearUsers = () => {
    if (localStorage.users) {
        const usersString = localStorage.getItem('users');
        if (usersString) {
            let confirmation = prompt('Enter password to clear users')
            if (confirmation === 'admin123') {
                localStorage.removeItem('users');
                allUsers = [];
                alert('Users cleared successfully');
            } else {
                alert('Incorrect password');
                alert('Users not cleared');
            }
    }
} else {
    allUsers = []
}
}