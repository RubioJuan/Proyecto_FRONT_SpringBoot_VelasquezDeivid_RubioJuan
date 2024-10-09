// Mostrar clientes existentes al cargar la página
window.onload = function() {
    obtenerClientes();
};

// Función para obtener y mostrar los clientes
function obtenerClientes() {
    const token = localStorage.getItem('token'); // Obtener el token
    fetch('http://209.145.51.162:8080/CineBites/CineBites/clientes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(clientes => {
        const clientesTableBody = document.querySelector('#clientesTable tbody');
        clientesTableBody.innerHTML = ''; // Limpiar la tabla
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.idCliente}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono || ''}</td>
            `;
            clientesTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener clientes:', error);
    });
}

// Manejar la creación y actualización de clientes en el mismo formulario
document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const token = localStorage.getItem('token'); // Obtener el token
    const clienteId = document.getElementById('clienteId').value;
    const clienteData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value || null
    };

    const method = clienteId ? 'PUT' : 'POST'; // Si hay un ID, actualiza. Si no, crea.
    const url = clienteId
        ? `http://209.145.51.162:8080/CineBites/CineBites/clientes/${clienteId}`
        : 'http://209.145.51.162:8080/CineBites/CineBites/clientes';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clienteData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const message = clienteId ? 'Cliente actualizado' : 'Cliente creado';
        alert(message);
        obtenerClientes(); // Actualizar la lista de clientes
    })
    .catch(error => {
        console.error('Error al gestionar cliente:', error.message);
        document.getElementById('clienteErrorMessage').textContent = 'Error: ' + error.message;
    });
});

// Manejar la eliminación de cliente
document.getElementById('eliminarClienteBtn').addEventListener('click', function() {
    const token = localStorage.getItem('token'); // Obtener el token
    const clienteId = document.getElementById('clienteId').value;

    console.log('Cliente ID a eliminar:', clienteId); // Verifica el ID del cliente

    if (!clienteId) {
        alert('Por favor, ingresa el ID del cliente a eliminar.');
        return;
    }

    fetch(`http://209.145.51.162:8080/CineBites/CineBites/clientes/${clienteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        alert('Cliente eliminado');
        obtenerClientes(); // Actualiza la lista de clientes
    })
    .catch(error => {
        console.error('Error al eliminar cliente:', error.message);
        document.getElementById('clienteErrorMessage').textContent = 'Error al eliminar cliente: ' + error.message;
    });
});
