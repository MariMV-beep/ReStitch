function sendMail() {

    let params = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        comentario: document.getElementById("comentario").value
    };

    console.log("Datos enviados:", params);

    emailjs.send(
        "service_z2b70g9",
        "template_8qhyfq2",
        params
    )
    .then(function (response) {
        console.log("Éxito:", response);
        alert("Comentario enviado correctamente.");
    })
    .catch(function (error) {
        console.error("Error completo:", error);
        alert("Error: " + error.text);
    });

}