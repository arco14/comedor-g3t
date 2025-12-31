window.addEventListener('DOMContentLoaded', async () => {
    const url = CONFIG.API_URL
    $('#btnGuardarConsumo').click(() => {
        const carrito = JSON.parse(document.getElementById('arrayCarrito').value)
        console.log(carrito)
        const infoEmpleado = JSON.parse(document.getElementById('arrayEmpleado').value)
        console.log(infoEmpleado)
    })
})