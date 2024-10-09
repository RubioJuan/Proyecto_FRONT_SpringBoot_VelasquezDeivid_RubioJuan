// Mostrar la animación al cargar la página
window.onload = function() {
    document.body.classList.add('content-hidden'); // Oculta el contenido detrás de la animación
    setTimeout(function() {
        document.getElementById('animation-container').style.display = 'none'; // Oculta la animación de carga
        document.body.classList.remove('content-hidden'); // Muestra el contenido cuando la animación termina
    }, 3000); // Ajusta el tiempo según la duración de tu animación (3 segundos en este caso)
};

// Manejar el evento de envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    const loginData = {
        nombreUsuario: email,
        contrasena: password
    };

    // Enviar la solicitud de inicio de sesión
    fetch('http://209.145.51.162:8080/CineBites/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Extraer la respuesta como JSON
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);  // Verifica la respuesta
        const token = data.token;
        const userRole = data.rol;

        if (token && userRole) {
            // Guardar el token y el rol del usuario en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);

            // Redirigir a la página de carga (carga.html)
            window.location.href = './View/carga.html';
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        // Mostrar el mensaje de error en caso de fallo
        document.getElementById('error-message').textContent = 'Error en el inicio de sesión: ' + error.message;
    });
});
