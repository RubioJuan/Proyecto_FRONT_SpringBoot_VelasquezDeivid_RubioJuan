// Mostrar la animación al cargar la página
window.onload = function() {
    document.body.classList.add('content-hidden'); // Oculta el contenido detrás de la animación
    setTimeout(function() {
        document.getElementById('animation-container').style.display = 'none';
        document.body.classList.remove('content-hidden'); // Muestra el contenido cuando la animación termina
    }, 3000); // Ajusta el tiempo según la duración de tu animación
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    const loginData = {
        nombreUsuario: email,
        contrasena: password
    };

    document.getElementById('login-container').style.display = 'none'; // Ocultar el formulario
    document.getElementById('animation-container').style.display = 'block'; // Mostrar animación

    // Enviar la solicitud para iniciar sesión
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
        const token = data.token;
        const userRole = data.rol;

        if (token && userRole) {
            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);

            // Redirigir a la página de roles
            setTimeout(() => {
                window.location.href = './View/roles.html';
            }, 3000);
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        // Mostrar mensaje de error
        document.getElementById('error-message').textContent = 'Error en el inicio de sesión: ' + error.message;
        document.getElementById('animation-container').style.display = 'none'; // Ocultar animación
        document.getElementById('login-container').style.display = 'block'; // Mostrar formulario
    });
});



