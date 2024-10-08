// Mostrar la animación al cargar la página
window.onload = function() {
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

    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    const data = {
        nombreUsuario: email,
        contrasena: password
    };

    // Mostrar la animación de carga al hacer clic en el botón de "Ingresar"
    document.getElementById('login-container').style.display = 'none'; // Ocultar el formulario
    document.getElementById('animation-container').style.display = 'block'; // Mostrar animación

    // Realizar la solicitud a la API para verificar el usuario
    fetch('http://209.145.51.162:8080/CineBites/login', {
        method: 'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json();
    })
    .then(user => {
        if (user && user.role) {
            // Guardar el rol del usuario en localStorage
            localStorage.setItem('userRole', user.role);

            // Esperar 3 segundos antes de redirigir a la página de roles
            setTimeout(() => {
                window.location.href = './roles.html';
            }, 3000); // Cambia este tiempo según la duración de la animación
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        // Ocultar la animación y volver a mostrar el formulario si hay un error
        toggleVisibility('animation-container', false);
        toggleVisibility('login-container', true);

        // Mostrar mensaje de error
        errorMessage.textContent = 'Error en el inicio de sesión: ' + error.message;
    });
});
