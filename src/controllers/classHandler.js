const registerUserURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const registerUserInClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const getUserClassesURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/user/`;

export async function registerNewClass(updates, idprofessor, token) {
    const registerClassBody = {
        name: updates.nombreClase.value,
        group: updates.grupoClase.value,
        professorId: idprofessor,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorizaton", token);

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(registerClassBody),
        redirect: "follow",
    };

    return fetch(registerUserURL, requestOptions);
}

export async function registerUserInClass(updates, idStudent, token) {
    const addStudentBody = {
        idStudent: idStudent,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorizaton", token);

    const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(addStudentBody),
        redirect: "follow",
    };

    return fetch(
        registerUserInClassURL + updates.accessCode.value,
        requestOptions
    );
}

export async function getProfessorClassesRegistered(idUser, token) {
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Authorizaton", token);

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    return fetch(getUserClassesURL + idUser, requestOptions);
}
