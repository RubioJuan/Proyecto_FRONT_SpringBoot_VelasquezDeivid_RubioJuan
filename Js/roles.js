window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
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
                <img src="https://cdn-icons-png.flaticon.com/512/4814/4814852.png" alt="Categorías">
                <h2>Gestión de clientes</h2>
                <p>Clientes</p>
                <a href="../View/clientes.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/554/554795.png" alt="Categorías">
                <h2>Gestión de empleados</h2>
                <p>Empleados</p>
                <a href="../View/empleados.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.freepik.com/256/12201/12201509.png?semt=ais_hybrid" alt="Categorías">
                <h2>Gestión de inventario</h2>
                <p>Inventario</p>
                <a href="../View/inventario.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.freepik.com/512/12516/12516291.png" alt="Categorías">
                <h2>Gestión de promociones</h2>
                <p>Promociones</p>
                <a href="../View/promociones.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/994/994649.png" alt="Categorías">
                <h2>Gestión de ventas</h2>
                <p>Ventas</p>
                <a href="../View/ventas.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/5674/5674015.png" alt="Categorías">
                <h2>Gestión de reportes</h2>
                <p>Reportes</p>
                <a href="../View/reportes.html" class="ingresar-btn">Ingresar</a>
            </div>`,
        'Gerente': `
            <div class="card">
                <img src="https://cdn-icons-png.freepik.com/256/12201/12201509.png?semt=ais_hybrid" alt="Inventario">
                <h2>Gestión inventario</h2>
                <p>Inventario</p>
                <a href="../View/inventario.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/4814/4814852.png" alt="Inventario">
                <h2>Gestión clientes</h2>
                <p>Clientes</p>
                <a href="../View/clientes.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/994/994649.png" alt="Inventario">
                <h2>Gestión ventas</h2>
                <p>Ventas</p>
                <a href="../View/ventas.html" class="ingresar-btn">Ingresar</a>
            </div>`,
        'Cajero': `
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/994/994649.png" alt="Clientes">
                <h2>Gestión de ventas</h2>
                <p>Ventas</p>
                <a href="../View/ventas.html" class="ingresar-btn">Ingresar</a>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/4814/4814852.png" alt="Clientes">
                <h2>Gestión de clientes</h2>
                <p>Clientes</p>
                <a href="../View/clientes.html" class="ingresar-btn">Ingresar</a>
            </div>`
    };

    const roleMap = {
        'ROLE_ADMIN': 'Administrador',
        'ROLE_GERENTE': 'Gerente',
        'ROLE_CAJERO': 'Cajero'
    };

    const normalizedRole = roleMap[userRole] || null;

    if (normalizedRole && roles[normalizedRole]) {
        container.innerHTML = roles[normalizedRole];
        container.classList.add('roles-container');  // Usa la clase nueva para roles
        container.style.display = 'flex';  

        document.querySelectorAll('.ingresar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const href = event.target.getAttribute('href');
                fetch(href, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) throw new Error('No tienes autorización.');
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