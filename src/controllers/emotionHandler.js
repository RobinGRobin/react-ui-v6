const monitoringURL = `http://localhost:3002/emotion/`;

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

    const monitoringUserEmotionURL = monitoringURL + idUser + "/" + idClass;

    return fetch(monitoringUserEmotionURL, requestOptions);
}
