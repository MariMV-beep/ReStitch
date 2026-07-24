document.addEventListener("DOMContentLoaded", function () {
  const boton = document.querySelector('input[type="submit"]');

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    // Validar que todos los campos requeridos estén llenos
    const campos = document.querySelectorAll("input[required]");
    let todosLlenos = true;

    campos.forEach((campo) => {
      if (campo.value.trim() === "") {
        todosLlenos = false;
      }
    });

    if (!todosLlenos) {
      alert("Por favor, completa todos los campos antes de confirmar.");
      return;
    }

  });

  function sendMail() {
    let parms = {
      name: document.getElementById("nombre").value,
      name: document.getElementById("email").value,
      name: document.getElementById("comentario").value,
    }

    emailjs.send("service_1v906cj", "template_rjnmlmh", parms).then(alert("Comentario enviado!!"))
  }



});