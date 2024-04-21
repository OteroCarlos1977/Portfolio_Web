document.addEventListener("DOMContentLoaded", function() {
    const botonHamburguesa = document.getElementById("hamburguesa");
    const listaNavegacion = document.getElementById("lista-navegacion");

    botonHamburguesa.addEventListener("click", function() {
        listaNavegacion.classList.toggle("mostrar");
    });
});