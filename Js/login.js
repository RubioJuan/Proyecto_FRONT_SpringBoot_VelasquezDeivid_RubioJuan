// Mostrar la animación al cargar la página
window.onload = function() {
    // Muestra la animación de bienvenida durante 3 segundos
    document.body.classList.add('content-hidden'); // Oculta el contenido detrás de la animación
    setTimeout(function() {
        document.getElementById('animation-container').style.display = 'none';
        document.body.classList.remove('content-hidden'); // Muestra el contenido cuando la animación termina
    }, 3000); // Ajusta el tiempo según la duración de tu animación
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

    // Preparar el cuerpo de la solicitud con las credenciales
    const data = {
        nombreUsuario: email,
        contrasena: password
    };

    // Realizar la solicitud a la API para verificar el usuario
    fetch('http://209.145.51.162:8080/CineBites/login', {
        method: 'POST', // Usar el método adecuado según tu API (puede ser GET o POST)
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas'); // Manejar el error de credenciales
        }
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(user => {
        // Si la autenticación es correcta
        if (user && user.role) {
            // Ocultar formulario de login
            toggleVisibility('login-container', false);

            // Mostrar animación de "cargando experiencia"
            toggleVisibility('animation-container', true);

            // Guardar el rol del usuario en localStorage
            localStorage.setItem('userRole', user.role);
            
            // Esperar 3 segundos antes de redirigir
            setTimeout(() => {
                window.location.href = './roles.html'; // Redirigir a la página de roles
            }, 3000); // Cambia 3000 a la duración en milisegundos que desees
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        // Mostrar mensaje de error si las credenciales son incorrectas
        errorMessage.textContent = 'Error en el inicio de sesión: ' + error.message;
    });
});
