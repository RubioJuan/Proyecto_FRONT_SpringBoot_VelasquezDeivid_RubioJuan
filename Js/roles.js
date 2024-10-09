window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const container = document.getElementById('user-container');

    // Si no hay token, redirige al login
    if (!token) {
        alert('No estás autenticado. Por favor, inicia sesión.');
        window.location.href = '/index.html';  // Cambia esto según la ruta de tu login
        return;
    }

    // Definir las tarjetas según el rol del usuario
    const roles = {
        'Administrador': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/8c/28/f4/8c28f45027000f49b0d7ff550acde29f.jpg" alt="Categorías">
                <h2>Administrador</h2>
                <p>Gestiona todas las categorías de productos</p>
                <a href="http://localhost:8080/CineBites/" class="ingresar-btn">Ingresar</a>
            </div>`,
        'Gerente': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/4f/e3/20/4fe32088a07b8a4d51791e4688f3e150.jpg" alt="Inventario">
                <h2>Gerente</h2>
                <p>Revisa el stock de productos y actualiza su información</p>
                <a href="http://localhost:8080/CineBites/" class="ingresar-btn">Ingresar</a>
            </div>`,
        'Cajero': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/38/a4/37/38a437b9d9fe614a97ba61463178f06d.jpg" alt="Clientes">
                <h2>Cajero</h2>
                <p>Consulta y administra la información de tus clientes</p>
                <a href="http://localhost:8080/CineBites/" class="ingresar-btn">Ingresar</a>
            </div>`
    };

    // Convertir el rol recuperado a un formato que coincida con las claves definidas
    const roleMap = {
        'ROLE_ADMIN': 'Administrador',
        'ROLE_GERENTE': 'Gerente',
        'ROLE_CAJERO': 'Cajero'
    };

    // Asegúrate de que el rol en el localStorage coincida con el mapeo
    const normalizedRole = roleMap[userRole] || null;

    // Verificar si el rol del usuario es válido y mostrar la tarjeta correspondiente
    if (normalizedRole && roles[normalizedRole]) {
        container.innerHTML = roles[normalizedRole];
        container.style.display = 'flex';  // Mostrar el contenedor si el rol es válido

        // Asignar el token al header de la solicitud cuando el usuario hace clic en "Ingresar"
        document.querySelectorAll('.ingresar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();  // Prevenir la redirección inmediata
                
                const href = event.target.getAttribute('href');  // Obtener el href de la tarjeta
                
                // Redirigir manualmente con el token en el encabezado
                fetch(href, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Añadir el token al encabezado
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No tienes autorización para acceder a este recurso.');
                    }
                    // Redirigir a la página del enlace después de la autorización
                    window.location.href = href;
                })
                .catch(error => {
                    alert(`Error: ${error.message}`);
                });
            });
        });
    } else {
        container.innerHTML = `<p>Usuario no tiene un rol válido asignado.</p>`;
    }
});
