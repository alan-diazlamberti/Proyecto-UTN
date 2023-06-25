function validarForm() {
  var nombre = document.getElementsByName("nombre")[0].value;
  var email = document.getElementsByName("email")[0].value;
  var mensaje = document.getElementsByName("mensaje")[0].value;

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Rellena todos los campos para enviar un mensaje");
    return false;
  }

  return true;
}
