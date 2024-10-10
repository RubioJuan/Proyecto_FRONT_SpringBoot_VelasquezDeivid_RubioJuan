// Mostrar productos existentes al cargar la página
window.onload = function() {
    obtenerProductos(); // Cambia esto para llamar a la función que obtiene los productos
};

// Función para obtener y mostrar los productos
function obtenerProductos() {
    const token = localStorage.getItem('token'); // Obtener el token
    fetch('http://209.145.51.162:8080/CineBites/CineBites/productos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(productos => {
        console.log(productos); // Verifica la respuesta del servidor
        const productosTableBody = document.querySelector('#productosTable tbody');
        productosTableBody.innerHTML = ''; // Limpiar la tabla
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.idProducto}</td>
                <td>${producto.codigoProducto}</td> <!-- Cambia a 'codigoProducto' -->
                <td>${producto.nombreProducto}</td> <!-- Cambia a 'nombreProducto' -->
                <td>${producto.descripcion || ''}</td>
                <td>${producto.precioUnitario}</td> <!-- Cambia a 'precioUnitario' -->
                <td>${producto.cantidadDisponible}</td>
                <td>${producto.umbral}</td>
            `;
            productosTableBody.appendChild(row);
        });
    })      
    .catch(error => {
        console.error('Error al obtener productos:', error);
    });
}

// Manejar la creación y actualización de productos en el mismo formulario
document.getElementById('productoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const token = localStorage.getItem('token'); // Obtener el token
    const productoId = document.getElementById('productoId').value;
    const productoData = {
        codigo_producto: document.getElementById('codigo_producto').value,
        nombre_producto: document.getElementById('nombre_producto').value,
        descripcion: document.getElementById('descripcion').value || null,
        precio_unitario: parseFloat(document.getElementById('precio_unitario').value),
        cantidadDisponible: parseInt(document.getElementById('cantidadDisponible').value),
        umbral: parseInt(document.getElementById('umbral').value)
    };

    const method = productoId ? 'PUT' : 'POST'; // Si hay un ID, actualiza. Si no, crea.
    const url = productoId
        ? `http://209.145.51.162:8080/CineBites/CineBites/productos/${productoId}`
        : 'http://209.145.51.162:8080/CineBites/CineBites/productos';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const message = productoId ? 'Producto actualizado' : 'Producto creado';
        alert(message);
        obtenerProductos(); // Actualizar la lista de productos
        document.getElementById('productoForm').reset(); // Limpiar el formulario después de guardar
    })
    .catch(error => {
        console.error('Error al gestionar producto:', error.message);
        document.getElementById('productoErrorMessage').textContent = 'Error: ' + error.message;
    });
});

// Manejar la eliminación de producto
document.getElementById('eliminarProductoBtn').addEventListener('click', function() {
    const token = localStorage.getItem('token'); // Obtener el token
    const productoId = document.getElementById('productoId').value;

    if (!productoId) {
        alert('Por favor, ingresa el ID del producto a eliminar.');
        return;
    }

    fetch(`http://209.145.51.162:8080/CineBites/CineBites/productos/${productoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        alert('Producto eliminado');
        obtenerProductos(); // Actualiza la lista de productos
        document.getElementById('productoForm').reset(); // Limpiar el formulario después de eliminar
    })
    .catch(error => {
        console.error('Error al eliminar producto:', error.message);
        document.getElementById('productoErrorMessage').textContent = 'Error al eliminar producto: ' + error.message;
    });
});
