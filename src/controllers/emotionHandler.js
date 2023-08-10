// RUTAS PARA EL DESPLIEGUE
const monitoringURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;
const monitoringProfessorURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;
const monitoringProfessorTodayURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/today/`;
const detailClassStudentURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/user/`;

// RUTAS PARA EL DESARROLLO
/* const monitoringURL = `http://localhost:3002/emotion/`;
const monitoringProfessorURL = `http://localhost:3002/emotion/`;
const monitoringProfessorTodayURL = `http://localhost:3002/emotion/today/`;
const detailClassStudentURL = `http://localhost:3002/emotion/user/`; */

export async function monitoring(image, idUser, idClass) {
    const base64Response = await fetch(image);
    const blobBytes = await base64Response.blob();
    var formdata = new FormData();
    formdata.append("facePicture", blobBytes, "example-name");

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    // URL Style: http://server:port/emotion/:idUser/:idClass

    const monitoringUserEmotionURL = monitoringURL + idUser + "/" + idClass;

    return fetch(monitoringUserEmotionURL, requestOptions);
}

export async function monitoringProfessor(idClass) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    // URL Style: http://server:port/emotion/:idClass

    return fetch(monitoringProfessorURL + idClass, requestOptions);
}

export async function monitoringProfessorToday(idClass) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    // URL Style: http://server:port/emotion/today/:idClass/

    return fetch(monitoringProfessorTodayURL + idClass, requestOptions);
}

export async function emotionStudentByClass(idStudent, idClass) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    // URL Style: http://server:port/emotion/user/:idStudent/:idClass/

    return fetch(
        detailClassStudentURL + idStudent + "/" + idClass,
        requestOptions
    );
}
