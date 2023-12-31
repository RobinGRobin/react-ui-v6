// RUTAS PARA DESPLIEGUE
const registerUserURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const registerUserInClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const getUserClassesURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/user/`;
const professorDeleteClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/professor/`;
const studentDeleteClasURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const getClassDetailURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/`;
const getStudentsClassURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/class/students/`;

// RUTAS PARA EL DESARROLLO
/* const registerUserURL = `http://localhost:3002/class/`;
const registerUserInClassURL = `http://localhost:3002/class/`;
const getUserClassesURL = `http://localhost:3002/class/user/`;
const professorDeleteClassURL = `http://localhost:3002/class/professor/`;
const studentDeleteClasURL = `http://localhost:3002/class/`;
const getClassDetailURL = `http://localhost:3002/class/`;
const getStudentsClassURL = `http://localhost:3002/class/students/`; */

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

export async function deleteClass(updates, userType, studentId) {
    var requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    if (userType === "professor") {
        return fetch(
            professorDeleteClassURL + updates.accessCode.value,
            requestOptions
        );
    }

    if (userType === "student") {
        return fetch(
            studentDeleteClasURL + studentId + "/" + updates.accessCode.value,
            requestOptions
        );
    }
}

export async function getClassDetail(idClass) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    // URL Style: http://server:port/class/:idClass

    return fetch(getClassDetailURL + idClass, requestOptions);
}

export async function getStudentsInClass(idClass) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    // URL Style: http://server:port/class/students/:idClass

    return fetch(getStudentsClassURL + idClass, requestOptions);
}
