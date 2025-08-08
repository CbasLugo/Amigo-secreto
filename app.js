// Lista para almacenar los nombres ingresados
let amigos = [];

/**
 * Agrega un nombre a la lista de amigos.
 * Valida que el campo no esté vacío y actualiza la lista visible.
 */
function agregarAmigo() {
    let nombre = document.getElementById("amigo").value.trim(); // Captura y limpia el valor

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    amigos.push(nombre); // Agrega el nombre a la lista
    document.getElementById("amigo").value = ""; // Limpia el campo de texto
    mostrarLista(); // Actualiza la lista visible
}

/**
 * Muestra los nombres en la lista HTML.
 */
function mostrarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpia el contenido previo

    amigos.forEach(function(amigo) {
        let li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

/**
 * Sortea un amigo al azar de la lista y muestra el resultado.
 */
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("La lista está vacía. Agrega nombres antes de sortear.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto es: <strong>${amigos[indiceAleatorio]}</strong>`;
}
