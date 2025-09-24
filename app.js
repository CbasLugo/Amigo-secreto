// Almacenamiento de participantes
const participantes = [];
const campoNombre = document.getElementById("amigo");

// === AGREGAR ESTE CSS AL PRINCIPIO (o en style.css) ===
// Notificaciones personalizadas - Estilos
const estiloNotificaciones = `
.notificacion {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4444;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards;
    max-width: 400px;
    text-align: center;
    font-weight: 500;
}

.notificacion.exito {
    background: #4CAF50;
}

@keyframes slideIn {
    from { top: -100px; opacity: 0; }
    to { top: 20px; opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
}
`;

// Inyectar estilos en el documento
const styleSheet = document.createElement("style");
styleSheet.textContent = estiloNotificaciones;
document.head.appendChild(styleSheet);

// === REEMPLAZAR LA FUNCIÓN mostrarMensaje ===
// Mostrar mensajes temporales MEJORADA
function mostrarMensaje(texto, tipo = 'error') {
    // Eliminar notificación anterior si existe
    const notifAnterior = document.querySelector('.notificacion');
    if (notifAnterior) notifAnterior.remove();
    
    const aviso = document.createElement("div");
    aviso.className = `notificacion ${tipo}`;
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    
    setTimeout(() => {
        if (aviso.parentNode) {
            aviso.parentNode.removeChild(aviso);
        }
    }, 3000);
}

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
        mostrarMensaje("Por favor escribe un nombre", "error");
        return;
    }
    
    if (participantes.includes(nombre)) {
        mostrarMensaje("Este nombre ya está en la lista", "error");
        return;
    }
    
    participantes.push(nombre);
    campoNombre.value = "";
    actualizarVista();
    mostrarMensaje("¡Nombre agregado correctamente!", "exito");
    campoNombre.focus();
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
    mostrarMensaje("Participante eliminado", "exito");
}

// Función para sortear (ahora coincide con el HTML)
function sortearAmigo() {
    if (participantes.length < 2) {
        mostrarMensaje("Necesitas al menos 2 participantes", "error");
        return;
    }
    
    const ganador = participantes[Math.floor(Math.random() * participantes.length)];
    document.getElementById("resultado").innerHTML = `
        <p>¡El amigo secreto es:</p>
        <p class="ganador">${ganador}</p>
    `;
    mostrarMensaje("¡Sorteo realizado con éxito!", "exito");
}

// Tecla Enter para agregar
campoNombre.addEventListener("keypress", (e) => {
    if (e.key === "Enter") agregarAmigo();
});