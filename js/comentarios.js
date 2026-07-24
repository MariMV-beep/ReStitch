function sendMail(){
  let parms = {
    name: document.getElementById("nombre").value,
    name: document.getElementById("email").value,
    name: document.getElementById("comentario").value,
  }

  emailjs.send("service_1v906cj", "template_rjnmlmh",parms).then(alert("Comentario enviado!!"))
}




