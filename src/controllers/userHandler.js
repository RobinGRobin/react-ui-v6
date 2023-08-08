// RUTAS PARA DESPLIEGUE
/* const registerUserURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/auth/register`;
const loginUserURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/auth/login`; */

// RUTAS PARA DESARROLLO
const registerUserURL = `http://localhost:3002/auth/register`;
const loginUserURL = `http://localhost:3002/auth/login`;

function calculateAge(day, month, year) {
    let today = new Date();
    let years = today.getFullYear() - year;
    if (month > today.getMonth() + 1 || day > today.getDay()) {
        years--;
    }
    return years;
}

export async function registerUser(updates) {
    const years = calculateAge(
        +updates.dayselect.value,
        +updates.monthselect.value,
        +updates.yearselect.value
    );

    const registerBody = {
        name: updates.name.value,
        email: updates.email.value,
        password: updates.password1.value,
        age: years,
        mobileNumber: updates.phone.value,
        typeUser: updates.usertype.value,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(registerBody),
        redirect: "follow",
    };

    return fetch(registerUserURL, requestOptions);
}

export async function loginUser(updates) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: updates.email.value,
            password: updates.passwordLogin.value,
        }),
        redirect: "follow",
    };

    return fetch(loginUserURL, requestOptions);
}
