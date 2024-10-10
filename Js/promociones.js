// Mostrar promociones existentes al cargar la página
window.onload = function() {
    obtenerPromociones(); // Llama a la función que obtiene las promociones
};

// Función para obtener y mostrar las promociones
function obtenerPromociones() {
    const token = localStorage.getItem('token'); // Obtener el token
    fetch('http://209.145.51.162:8080/CineBites/CineBites/promociones', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(promociones => {
        const promocionesTableBody = document.querySelector('#promocionesTable tbody');
        promocionesTableBody.innerHTML = ''; // Limpiar la tabla
        promociones.forEach(promocion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${promocion.idPromocion}</td>
                <td>${promocion.descripcion}</td>
                <td>${promocion.descuento}</td>
                <td>${new Date(promocion.fechaInicio).toLocaleDateString()}</td>
                <td>${new Date(promocion.fechaFin).toLocaleDateString()}</td>
            `;
            promocionesTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener promociones:', error);
    });
}

// Manejar la creación y actualización de promociones en el mismo formulario
document.getElementById('promocionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const token = localStorage.getItem('token'); // Obtener el token
    const promocionId = document.getElementById('promocionId').value;
    const promocionData = {
        descripcion: document.getElementById('descripcion').value,
        descuento: parseFloat(document.getElementById('descuento').value),
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value
    };

    const method = promocionId ? 'PUT' : 'POST'; // Si hay un ID, actualiza. Si no, crea.
    const url = promocionId
        ? `http://209.145.51.162:8080/CineBites/CineBites/promociones/${promocionId}`
        : 'http://209.145.51.162:8080/CineBites/CineBites/promociones';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(promocionData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const message = promocionId ? 'Promoción actualizada' : 'Promoción creada';
        alert(message);
        obtenerPromociones(); // Actualizar la lista de promociones
        document.getElementById('promocionForm').reset(); // Limpiar el formulario después de guardar
    })
    .catch(error => {
        console.error('Error al gestionar promoción:', error.message);
        document.getElementById('promocionErrorMessage').textContent = 'Error: ' + error.message;
    });
});

// Manejar la eliminación de promoción
document.getElementById('eliminarPromocionBtn').addEventListener('click', function() {
    const token = localStorage.getItem('token'); // Obtener el token
    const promocionId = document.getElementById('promocionId').value;

    if (!promocionId) {
        alert('Por favor, ingresa el ID de la promoción a eliminar.');
        return;
    }

    fetch(`http://209.145.51.162:8080/CineBites/CineBites/promociones/${promocionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        alert('Promoción eliminada');
        obtenerPromociones(); // Actualiza la lista de promociones
        document.getElementById('promocionForm').reset(); // Limpiar el formulario después de eliminar
    })
    .catch(error => {
        console.error('Error al eliminar promoción:', error.message);
        document.getElementById('promocionErrorMessage').textContent = 'Error al eliminar promoción: ' + error.message;
    });
});
