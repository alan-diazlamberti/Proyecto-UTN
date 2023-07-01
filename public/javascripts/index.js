// Funcion para validar formulario
function validarForm() {
  var nombre = document.getElementsByName("nombre")[0].value;
  var email = document.getElementsByName("email")[0].value;
  var mensaje = document.getElementsByName("mensaje")[0].value;

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Rellena todos los campos para enviar un mensaje");
    return false;
  } else {
    return true;
  }
}

// Funcion para ver mas recetas
function verMas() {
  var columnasOcultas = document.getElementsByClassName("hidden");

  for (var i = 0; i < columnasOcultas.length; i++) {
    columnasOcultas[i].classList.remove("hidden");
  }
}
