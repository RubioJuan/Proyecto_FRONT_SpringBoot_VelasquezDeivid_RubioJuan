// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Cambia el color de fondo durante 3 segundos
    const animationContainer = document.getElementById('animation-container');
    animationContainer.style.animation = 'backgroundColorChange 3s infinite';

    // Espera 3 segundos antes de mostrar el contenido
    setTimeout(() => {
        // Ocultar la animación
        animationContainer.style.display = 'none';
        // Mostrar el contenido de usuario
        document.getElementById('user-container').style.display = 'flex';
    }, 3000); // Cambia 3000 a la duración en milisegundos que desees
});
