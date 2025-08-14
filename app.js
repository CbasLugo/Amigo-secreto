// Almacenamiento de participantes
const participantes = [];
const campoNombre = document.getElementById("amigo");

// Formatear nombre con mayúscula inicial
campoNombre.addEventListener("input", () => {
    if (campoNombre.value.length > 0) {
        campoNombre.value = campoNombre.value[0].toUpperCase() + campoNombre.value.slice(1).toLowerCase();
    }
});

// Función para añadir participante (ahora coincide con el HTML)
function agregarAmigo() {
    const nombre = campoNombre.value.trim();
    
    if (!nombre) {
        mostrarMensaje("Por favor escribe un nombre");
        return;
    }
    
    if (participantes.includes(nombre)) {
        mostrarMensaje("Este nombre ya está en la lista");
        return;
    }
    
    participantes.push(nombre);
    campoNombre.value = "";
    actualizarVista();
    campoNombre.focus();
}

// Mostrar mensajes temporales
function mostrarMensaje(texto) {
    const aviso = document.createElement("div");
    aviso.className = "aviso";
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    
    setTimeout(() => {
        aviso.remove();
    }, 2000);
}

// Actualizar la visualización
function actualizarVista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    participantes.forEach((nombre, indice) => {
        const elemento = document.createElement("li");
        elemento.className = "participante";
        
        elemento.innerHTML = `
            <span>${nombre}</span>
            <button class="eliminar" data-indice="${indice}">×</button>
        `;
        
        lista.appendChild(elemento);
    });
    
    // Asignar eventos de eliminación
    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarParticipante);
    });
}

// Eliminar participante
function eliminarParticipante(evento) {
    const indice = evento.target.getAttribute("data-indice");
    participantes.splice(indice, 1);
    actualizarVista();
}

// Función para sortear (ahora coincide con el HTML)
function sortearAmigo() {
    if (participantes.length < 2) {
        mostrarMensaje("Necesitas al menos 2 participantes");
        return;
    }
    
    const ganador = participantes[Math.floor(Math.random() * participantes.length)];
    document.getElementById("resultado").innerHTML = `
        <p>¡El amigo secreto es:</p>
        <p class="ganador">${ganador}</p>
    `;
}

// Tecla Enter para agregar
campoNombre.addEventListener("keypress", (e) => {
    if (e.key === "Enter") agregarAmigo();
});