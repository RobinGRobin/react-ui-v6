const monitoringURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;
const monitoringProfessorURL = `https://api-emotiva-7ec548e73d6b.herokuapp.com/emotion/`;

export async function monitoring(image, idUser, idClass, token) {
    const base64Response = await fetch(image);
    const blobBytes = await base64Response.blob();
    var formdata = new FormData();
    formdata.append("facePicture", blobBytes, "example-name");

    var headers = new Headers();
    headers.append("Authorizaton", token);

    var requestOptions = {
        method: "POST",
        headers: headers,
        body: formdata,
        redirect: "follow",
    };

    const monitoringUserEmotionURL = monitoringURL + idUser + "/" + idClass;

    return fetch(monitoringUserEmotionURL, requestOptions);
}

export async function monitoringProfessor(idClass, token) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorizaton", token);

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    return fetch(monitoringProfessorURL + idClass, requestOptions);
}
