window.onload = function() {
    obtenerEmpleados();
    obtenerProductos();
    obtenerProductosAgotados();
};

// Función para obtener empleados y llenar el select
function obtenerEmpleados() {
    const token = localStorage.getItem('token');
    fetch('http://209.145.51.162:8080/CineBites/CineBites/empleados', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(empleados => {
        const empleadoSelect = document.getElementById('empleadoSelect');
        empleadoSelect.innerHTML = '';
        empleados.forEach(empleado => {
            const option = document.createElement('option');
            option.value = empleado.idEmpleado;
            option.textContent = `${empleado.nombres} ${empleado.apellidos}`;
            empleadoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener empleados:', error);
    });
}

// Función para obtener productos y llenar el select
function obtenerProductos() {
    const token = localStorage.getItem('token');
    fetch('http://209.145.51.162:8080/CineBites/CineBites/productos', { // Ajusta esta URL según la API para obtener productos
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(productos => {
        const productoSelect = document.getElementById('productoSelect');
        productoSelect.innerHTML = '';
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.idProducto; // Suponiendo que el objeto tiene idProducto
            option.textContent = producto.nombreProducto; // Suponiendo que el objeto tiene nombreProducto
            productoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener productos:', error);
    });
}

// Función para obtener y mostrar las ventas por empleado
document.getElementById('obtenerVentasBtn').addEventListener('click', function() {
    const empleadoId = document.getElementById('empleadoSelect').value;
    obtenerVentasPorEmpleado(empleadoId);
});

function obtenerVentasPorEmpleado(empleadoId) {
    const token = localStorage.getItem('token');
    fetch(`http://209.145.51.162:8080/CineBites/CineBites/ventas/empleado/${empleadoId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(ventas => {
        const ventasTableBody = document.querySelector('#ventasEmpleadoTable tbody');
        ventasTableBody.innerHTML = '';
        ventas.forEach(venta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.idVenta}</td>
                <td>${new Date(venta.fechaVenta).toLocaleDateString()}</td>
                <td>${venta.subtotal.toFixed(2)}</td>
                <td>${venta.total.toFixed(2)}</td>
                <td>${venta.impuesto.toFixed(2)}</td>
                <td>${venta.empleado.nombres} ${venta.empleado.apellidos}</td>
                <td>${venta.cliente.nombre} ${venta.cliente.apellido}</td>
            `;
            ventasTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener ventas por empleado:', error);
    });
}

// Función para obtener y mostrar detalle de ventas por producto
document.getElementById('obtenerVentasProductoBtn').addEventListener('click', function() {
    const productoId = document.getElementById('productoSelect').value;
    obtenerVentasPorProducto(productoId);
});

function obtenerVentasPorProducto(productoId) {
    const token = localStorage.getItem('token');
    fetch(`http://209.145.51.162:8080/CineBites/CineBites/detalles-venta/producto/${productoId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(detalleVentas => {
        const detalleTableBody = document.querySelector('#detalleVentasProductoTable tbody');
        detalleTableBody.innerHTML = ''; // Limpiar la tabla
        detalleVentas.forEach(detalle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detalle.producto.nombreProducto}</td>
                <td>${detalle.cantidad}</td>
                <td>${detalle.precioUnitario.toFixed(2)}</td>
            `;
            detalleTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener detalle de ventas por producto:', error);
    });
}

function obtenerVentasPorProducto(productoId) {
    const token = localStorage.getItem('token');
    fetch(`http://209.145.51.162:8080/CineBites/CineBites/detalles-venta/producto/${productoId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(detalleVentas => {
        const detalleTableBody = document.querySelector('#detalleVentasProductoTable tbody');
        detalleTableBody.innerHTML = ''; // Limpiar la tabla
        detalleVentas.forEach(detalle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detalle.producto.nombreProducto}</td>
                <td>${detalle.cantidad}</td>
                <td>${detalle.precioUnitario.toFixed(2)}</td>
            `;
            detalleTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener detalle de ventas por producto:', error);
    });
}

// Función para obtener y mostrar productos agotados
function obtenerProductosAgotados() {
    const token = localStorage.getItem('token');
    fetch('http://209.145.51.162:8080/CineBites/CineBites/productos/agotados', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(productos => {
        const productosTableBody = document.querySelector('#productosAgotadosTable tbody');
        productosTableBody.innerHTML = ''; // Limpiar la tabla
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.idProducto}</td>
                <td>${producto.nombreProducto}</td>
                <td>${producto.cantidadDisponible}</td>
            `;
            productosTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener productos agotados:', error);
    });
}

// Manejar el envío del formulario de rango de fechas
document.getElementById('rangoFechasForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    obtenerVentasPorRangoFechas(fechaInicio, fechaFin); // Llamar a la función para obtener ventas
});

function obtenerVentasPorRangoFechas(fechaInicio, fechaFin) {
    const token = localStorage.getItem('token');
    fetch(`http://209.145.51.162:8080/CineBites/CineBites/ventas/fecha/rango?inicio=${fechaInicio}&fin=${fechaFin}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Response:', response); // Agregar esto para ver la respuesta
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(ventas => {
        const ventasRangoTableBody = document.querySelector('#ventasRangoTable tbody');
        ventasRangoTableBody.innerHTML = '';
        ventas.forEach(venta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.idVenta}</td>
                <td>${new Date(venta.fechaVenta).toLocaleDateString()}</td>
                <td>${venta.subtotal.toFixed(2)}</td>
                <td>${venta.total.toFixed(2)}</td>
                <td>${venta.impuesto.toFixed(2)}</td>
                <td>${venta.empleado.nombres} ${venta.empleado.apellidos}</td>
                <td>${venta.cliente.nombre} ${venta.cliente.apellido}</td>
            `;
            ventasRangoTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener ventas por rango de fechas:', error);
    });
}

