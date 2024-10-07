window.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const container = document.getElementById('user-container');
    
    const roles = {
        'Administrador': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/8c/28/f4/8c28f45027000f49b0d7ff550acde29f.jpg" alt="Categorías">
                <h2>Administrador</h2>
                <p>Gestiona todas las categorías de productos</p>
                <a href="http://localhost:8080/CineBites/">Ingresar</a>
            </div>`,
        'Gerente': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/4f/e3/20/4fe32088a07b8a4d51791e4688f3e150.jpg" alt="Inventario">
                <h2>Gerente</h2>
                <p>Revisa el stock de productos y actualiza su información</p>
                <a href="http://localhost:8080/CineBites/">Ingresar</a>
            </div>`,
        'Cajero': `
            <div class="card">
                <img src="https://i.pinimg.com/564x/38/a4/37/38a437b9d9fe614a97ba61463178f06d.jpg" alt="Clientes">
                <h2>Cajero</h2>
                <p>Consulta y administra la información de tus clientes</p>
                <a href="http://localhost:8080/CineBites/">Ingresar</a>
            </div>`
    };

    if (roles[userRole]) {
        container.innerHTML = roles[userRole];
        container.style.display = 'flex';  // Mostrar el contenedor cuando el rol es válido
    } else {
        container.innerHTML = `<p>Usuario no tiene un rol válido asignado.</p>`;
    }
});
