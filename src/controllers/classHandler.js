const registerUserURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const registerUserInClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const getUserClassesURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/user/`;
const professorDeleteClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/professor/`;
const studentDeleteClasURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;

export async function registerNewClass(updates, idprofessor) {
    const registerClassBody = {
        name: updates.nombreClase.value,
        group: updates.grupoClase.value,
        professorId: idprofessor,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(registerClassBody),
        redirect: "follow",
    };

    return fetch(registerUserURL, requestOptions);
}

export async function registerUserInClass(updates, idStudent) {
    const addStudentBody = {
        idStudent: idStudent,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

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

export async function getProfessorClassesRegistered(idUser) {
    var headers = new Headers();
    headers.append("Content-type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    return fetch(getUserClassesURL + idUser, requestOptions);
}

export async function deleteClass(accessCode, userType, studentId) {
    var requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    if (userType === "professor") {
        return fetch(professorDeleteClassURL + accessCode, requestOptions);
    }

    if (userType === "student") {
        return fetch(
            studentDeleteClasURL + studentId + "/" + accessCode,
            requestOptions
        );
    }
}
