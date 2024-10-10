// Mostrar empleados existentes al cargar la página
window.onload = function() {
    obtenerEmpleados();
    obtenerRoles(); // Llamada para obtener roles
};

// Función para obtener y mostrar los empleados
function obtenerEmpleados() {
    const token = localStorage.getItem('token'); // Obtener el token
    fetch('http://209.145.51.162:8080/CineBites/CineBites/empleados', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(empleados => {
        const empleadosTableBody = document.querySelector('#empleadosTable tbody');
        empleadosTableBody.innerHTML = ''; // Limpiar la tabla
        empleados.forEach(empleado => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleado.idEmpleado}</td>
                <td>${empleado.identificacion}</td>
                <td>${empleado.nombres}</td>
                <td>${empleado.apellidos}</td>
                <td>${empleado.telefono || ''}</td>
                <td>${empleado.rol.nombreRol}</td> <!-- Mostrar el nombre del rol -->
            `;
            empleadosTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener empleados:', error);
    });
}

// Función para obtener y mostrar los roles
function obtenerRoles() {
    const token = localStorage.getItem('token'); // Obtener el token
    fetch('http://209.145.51.162:8080/CineBites/CineBites/roles', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(roles => {
        const rolSelect = document.getElementById('rolSelect');
        rolSelect.innerHTML = ''; // Limpiar el select
        roles.forEach(rol => {
            const option = document.createElement('option');
            option.value = rol.idRol; // Valor del option será el idRol
            option.textContent = rol.nombreRol; // Texto del option será el nombreRol
            rolSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener roles:', error);
    });
}

// Manejar la creación y actualización de empleados en el mismo formulario
document.getElementById('empleadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const token = localStorage.getItem('token'); // Obtener el token
    const empleadoId = document.getElementById('empleadoId').value;
    const empleadoData = {
        identificacion: document.getElementById('identificacion').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        telefono: document.getElementById('telefono').value || null,
        direccion: document.getElementById('direccion').value || null,
        rol: { idRol: document.getElementById('rolSelect').value }, // Asignar rol usando el ID del select
        estado: 'activo' // Asignar un estado predeterminado o capturarlo del formulario si es necesario
    };

    const method = empleadoId ? 'PUT' : 'POST'; // Si hay un ID, actualiza. Si no, crea.
    const url = empleadoId
        ? `http://209.145.51.162:8080/CineBites/CineBites/empleados/${empleadoId}`
        : 'http://209.145.51.162:8080/CineBites/CineBites/empleados';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(empleadoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const message = empleadoId ? 'Empleado actualizado' : 'Empleado creado';
        alert(message);
        obtenerEmpleados(); // Actualizar la lista de empleados
    })
    .catch(error => {
        console.error('Error al gestionar empleado:', error.message);
        document.getElementById('empleadoErrorMessage').textContent = 'Error: ' + error.message;
    });
});

// Manejar la eliminación de empleado
document.getElementById('eliminarEmpleadoBtn').addEventListener('click', function() {
    const token = localStorage.getItem('token'); // Obtener el token
    const empleadoId = document.getElementById('empleadoId').value;

    console.log('Empleado ID a eliminar:', empleadoId); // Verifica el ID del empleado

    if (!empleadoId) {
        alert('Por favor, ingresa el ID del empleado a eliminar.');
        return;
    }

    fetch(`http://209.145.51.162:8080/CineBites/CineBites/empleados/${empleadoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        alert('Empleado eliminado');
        obtenerEmpleados(); // Actualiza la lista de empleados
    })
    .catch(error => {
        console.error('Error al eliminar empleado:', error.message);
        document.getElementById('empleadoErrorMessage').textContent = 'Error al eliminar empleado: ' + error.message;
    });
});
