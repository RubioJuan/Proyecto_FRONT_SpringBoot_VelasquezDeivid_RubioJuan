let carrito = [];

// Al cargar la ventana, se obtienen empleados, productos y clientes
window.onload = function() {
    obtenerEmpleados();
    obtenerProductos();
    obtenerClientes();
};

// Función para obtener empleados y llenar el select
async function obtenerEmpleados() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://209.145.51.162:8080/CineBites/CineBites/empleados', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const empleados = await response.json();
        const empleadoSelect = document.getElementById('empleadoSelect');
        empleadoSelect.innerHTML = empleados.map(empleado => 
            `<option value="${empleado.idEmpleado}">${empleado.nombres} ${empleado.apellidos}</option>`
        ).join('');
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        alert(`Error al obtener empleados: ${error.message}`);
    }
}

// Función para obtener productos y llenar el select
async function obtenerProductos() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://209.145.51.162:8080/CineBites/CineBites/productos', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const productos = await response.json();
        const productoSelect = document.getElementById('productoSelect');
        productoSelect.innerHTML = productos.map(producto => 
            `<option value="${producto.idProducto}">${producto.nombreProducto}</option>`
        ).join('');
    } catch (error) {
        console.error('Error al obtener productos:', error);
        alert(`Error al obtener productos: ${error.message}`);
    }
}

// Nueva función para obtener clientes y llenar el select
async function obtenerClientes() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://209.145.51.162:8080/CineBites/CineBites/clientes', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const clientes = await response.json();
        const clienteSelect = document.getElementById('clienteSelect');
        clienteSelect.innerHTML = clientes.map(cliente => 
            `<option value="${cliente.idCliente}">${cliente.nombre} ${cliente.apellido}</option>`
        ).join('');
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        alert(`Error al obtener clientes: ${error.message}`);
    }
}

// Función para agregar productos al carrito
document.getElementById('agregarProductoBtn').addEventListener('click', async function() {
    const productoId = document.getElementById('productoSelect').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const impuesto = parseFloat(document.getElementById('impuesto').value) || 0;

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://209.145.51.162:8080/CineBites/CineBites/productos/${productoId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error al obtener el producto: ${response.statusText}`);
        
        const producto = await response.json();
        const precioVenta = producto.precioUnitario;

        if (!precioVenta || isNaN(precioVenta) || precioVenta <= 0) {
            throw new Error('El producto no tiene un precio válido.');
        }

        const subtotal = cantidad * precioVenta;
        const total = subtotal * (1 + impuesto);

        // Agregar el producto al carrito
        carrito.push({
            productoId: producto.idProducto,
            nombreProducto: producto.nombreProducto,
            cantidad: cantidad,
            precioUnitario: precioVenta,
            subtotal: subtotal,
            impuesto: impuesto,
            total: total
        });

        actualizarCarrito();
    } catch (error) {
        console.error('Error al obtener producto:', error);
        alert(`Error: ${error.message}`);
    }
});

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
    const carritoTableBody = document.querySelector('#carritoTable tbody');
    carritoTableBody.innerHTML = '';

    carrito.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precioUnitario.toFixed(2)}</td>
            <td>${producto.subtotal.toFixed(2)}</td>
            <td>${producto.impuesto.toFixed(2)}</td>
            <td>${producto.total.toFixed(2)}</td>
            <td><button class="eliminarBtn" data-index="${index}">Eliminar</button></td>
        `;
        carritoTableBody.appendChild(row);
    });

    // Añadir eventos a los botones de eliminar
    document.querySelectorAll('.eliminarBtn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            eliminarProductoDelCarrito(index);
        });
    });
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para obtener detalles del empleado
async function obtenerDetallesEmpleado(idEmpleado) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://209.145.51.162:8080/CineBites/CineBites/empleados/${idEmpleado}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error al obtener detalles del empleado: ${response.statusText}`);

    return await response.json();
}

// Función para obtener detalles del cliente
async function obtenerDetallesCliente(idCliente) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://209.145.51.162:8080/CineBites/CineBites/clientes/${idCliente}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error al obtener detalles del cliente: ${response.statusText}`);

    return await response.json();
}

async function obtenerDetallesProducto(idProducto) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://209.145.51.162:8080/CineBites/CineBites/productos/${idProducto}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error al obtener detalles del producto: ${response.statusText}`);

    return await response.json();
}
// Función para completar la venta y generar la factura
document.getElementById('finalizarVentaBtn').addEventListener('click', async function () {
    const clienteId = document.getElementById('clienteSelect').value;
    const empleadoId = document.getElementById('empleadoSelect').value;
    const fechaVenta = document.getElementById('fechaVenta').value;
    const impuesto = parseFloat(document.getElementById('impuesto').value) || 0;

    // Validaciones
    if (!fechaVenta || carrito.length === 0) {
        alert('Por favor, selecciona una fecha de venta y asegúrate de que el carrito no esté vacío.');
        return;
    }

    // Calcular subtotal
    const subtotal = carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precioUnitario), 0);

    try {
        const empleadoDetalles = await obtenerDetallesEmpleado(empleadoId);
        const clienteDetalles = await obtenerDetallesCliente(clienteId);

        // Crear objeto de venta
        const venta = {
            idVenta: 8, // Asigna el idVenta correspondiente (esto puede cambiar dinámicamente)
            fechaVenta: fechaVenta,
            subtotal: subtotal,
            total: subtotal * (1 + impuesto),
            impuesto: impuesto / 100,
            empleado: {
                idEmpleado: empleadoId,
                identificacion: empleadoDetalles.identificacion,
                nombres: empleadoDetalles.nombres,
                apellidos: empleadoDetalles.apellidos,
                direccion: empleadoDetalles.direccion,
                telefono: empleadoDetalles.telefono,
                rol: {
                    idRol: empleadoDetalles.rol.idRol,
                    nombreRol: empleadoDetalles.rol.nombreRol
                },
                estado: empleadoDetalles.estado
            },
            cliente: {
                idCliente: clienteId,
                nombre: clienteDetalles.nombre,
                apellido: clienteDetalles.apellido,
                email: clienteDetalles.email,
                telefono: clienteDetalles.telefono
            }
        };

        const token = localStorage.getItem('token');
        const ventaResponse = await fetch('http://209.145.51.162:8080/CineBites/CineBites/ventas', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });

        if (!ventaResponse.ok) throw new Error(`Error al completar la venta: ${ventaResponse.statusText}`);

        const ventaResultado = await ventaResponse.json(); // La respuesta de la venta
        alert(`Venta completada con éxito! ID: ${ventaResultado.idVenta}`);

        let detallesVentaTexto = ''; // String para almacenar los detalles de venta para el PDF
        
        // Iterar sobre el carrito y crear cada detalle-venta
        for (let item of carrito) {
            const productoDetalles = await obtenerDetallesProducto(item.productoId);

            const detalleVenta = {
                idDetalle: 10, 
                venta: ventaResultado,
                producto: {
                    idProducto: productoDetalles.idProducto,
                    nombreProducto: productoDetalles.nombreProducto,
                    precioUnitario: productoDetalles.precioUnitario,
                    codigoProducto: productoDetalles.codigoProducto
                },
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
                estado: "Completado"
            };

            const detalleVentaResponse = await fetch('http://209.145.51.162:8080/CineBites/CineBites/detalles-venta', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detalleVenta)
            });

            if (!detalleVentaResponse.ok) throw new Error(`Error al crear el detalle de la venta: ${detalleVentaResponse.statusText}`);
            
            const detalleVentaResultado = await detalleVentaResponse.json(); // La respuesta del detalle de la venta
            alert(`Detalle de venta completado con éxito! ID: ${detalleVentaResultado.idDetalle}`);

            // Agregar los detalles del producto al texto para el PDF
            detallesVentaTexto += `Producto: ${productoDetalles.nombreProducto}, Cantidad: ${item.cantidad}, Precio: ${item.precioUnitario}\n`;
        }

        // Limpiar carrito y actualizar vista
        carrito = [];
        actualizarCarrito();
        alert('Detalles de venta creados correctamente.');

        // Generar el PDF con los detalles de la venta y los productos
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título del documento
        doc.setFontSize(20);
        doc.text('Factura de Venta', 10, 10);

        // Detalles de la venta
        doc.setFontSize(12);
        doc.text(`Fecha de Venta: ${venta.fechaVenta}`, 10, 30);
        doc.text(`ID Venta: ${ventaResultado.idVenta}`, 10, 40);
        doc.text(`Subtotal: $${venta.subtotal}`, 10, 50);
        doc.text(`Impuesto: $${venta.impuesto}`, 10, 60);
        doc.text(`Total: $${venta.total}`, 10, 70);

        // Detalles del cliente
        doc.text('Detalles del Cliente:', 10, 90);
        doc.text(`Nombre: ${venta.cliente.nombre} ${venta.cliente.apellido}`, 10, 100);
        doc.text(`Email: ${venta.cliente.email}`, 10, 110);
        doc.text(`Teléfono: ${venta.cliente.telefono}`, 10, 120);

        // Detalles del empleado
        doc.text('Detalles del Empleado:', 10, 140);
        doc.text(`Nombre: ${venta.empleado.nombres} ${venta.empleado.apellidos}`, 10, 150);
        doc.text(`Rol: ${venta.empleado.rol.nombreRol}`, 10, 160);

        // Detalles de los productos vendidos
        doc.text('Detalles de los productos:', 10, 180);
        doc.text(detallesVentaTexto, 10, 190);

        // Descargar el PDF
        doc.save('factura_venta.pdf');

    } catch (error) {
        console.error('Error al finalizar la venta:', error);
        alert(`Error: ${error.message}`);
    }
});
