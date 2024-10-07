// Mostrar la animación al cargar la página
window.onload = function() {
    // Ocultar el formulario de inicio de sesión
    document.getElementById('login-container').style.display = 'none';

    // Mostrar la animación
    const animationContainer = document.getElementById('animation-container');
    animationContainer.style.display = 'flex'; // Asegúrate de mostrarlo como un flex container

    // Espera 3 segundos antes de mostrar el formulario de inicio de sesión
    setTimeout(() => {
        animationContainer.style.display = 'none'; // Ocultar la animación
        document.getElementById('login-container').style.display = 'block'; // Mostrar el formulario
    }, 3000); // Cambia 3000 a la duración en milisegundos que desees
};

// Función para mostrar y ocultar elementos
function toggleVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    element.style.display = isVisible ? 'block' : 'none';
}

// Manejador de evento para el formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpiar mensajes de error al inicio
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Limpiar el mensaje de error

    const email = document.getElementById('logemail').value; // Asegúrate de que el ID sea correcto
    const password = document.getElementById('logpass').value; // Asegúrate de que el ID sea correcto

    // Credenciales simuladas
    const users = {
        admin: { password: 'admin123', role: 'Administrador' },
        gerente: { password: 'gerente123', role: 'Gerente' },
        cajero: { password: 'cajero123', role: 'Cajero' }
    };

    // Verificar credenciales
    if (users[email] && users[email].password === password) {
        // Ocultar formulario de login
        toggleVisibility('login-container', false);
        
        // Mostrar animación de "cargando experiencia"
        const animationContainer = document.getElementById('animation-container');
        toggleVisibility('animation-container', true);

        // Guardar el rol del usuario
        localStorage.setItem('userRole', users[email].role);
        
        // Espera 3 segundos antes de redirigir
        setTimeout(() => {
            window.location.href = './roles.html';
        }, 3000); // Cambia 3000 a la duración en milisegundos que desees

    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
    }
});
