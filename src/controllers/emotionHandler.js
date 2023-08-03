// RUTAS PARA EL DESPLIEGUE

const monitoringURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;
const monitoringProfessorURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;

// RUTAS PARA EL DESARROLLO

/* const monitoringURL = `http://localhost:3002/emotion/`;
const monitoringProfessorURL = `http://localhost:3002/emotion/`;
 */
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

    // URL Style: http://server:port/emotion/idUser/idClass

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

    // URL Style: http:server:port/emotion/idClass

    return fetch(monitoringProfessorURL + idClass, requestOptions);
}
