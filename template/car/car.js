import { generarCard } from "../../../comedor/template/content/dashboard/dashboard.js"
window.addEventListener('DOMContentLoaded', async () => {
    const url = CONFIG.API_URL
    $('#btnGuardarConsumo').click(async () => {
        const carrito = JSON.parse(document.getElementById('arrayCarrito').value)
        const infoEmpleado = JSON.parse(document.getElementById('arrayEmpleado').value)
        const ConsumoDetalle = carrito.map(item => ({
            ARTICULO: parseInt(item.id),
            CANTIDAD: item.qty,
            PRECIO: item.price
        }))
        const jsonConsumo = {
            Stored: 'dbo.PA_ComedorG3T',
            Opcion: 'GCE',
            Consumo: {
                FIRMA: infoEmpleado.FIRMA,
                NOMBRE_EMPLEADO: infoEmpleado.NOMBRE
            },
            ConsumoDetalle
        }
        Swal.fire({
            title: "Estas seguro de imprimir este consumo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f8b739",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI!",
            cancelButtonText: "NO"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonConsumo, '', false)
                if(resData.length > 0) {
                    const jsonTicket = {
                        Stored: 'dbo.PA_ComedorG3T',
                        Opcion: 'GTE',
                        Articulo: {
                            ID_TICKET: resData[0][0].Id
                        }
                    }
                    const resTicket = await loadAPI(`${url}COMEDOR`, 'POST', jsonTicket, '', true)
                    const dataArticulos = resTicket[0]
                    const totalArticulos = resTicket[1][0]
                    if(resTicket[0].length > 0 || totalArticulos.TOTAL !== null) {
                        // ENVIAR DATOS DEL TICKET A PHP 
                        const articulos = dataArticulos.map(art => ({
                            ARTICULOS: art.ARTICULOS,
                            CANTIDAD: art.CANTIDAD,
                            FIRMA: art.FIRMA,
                            NOMBRE_EMPLEADO: art.NOMBRE_EMPLEADO,
                            PRECIO: art.PRECIO
                        }))
                        fetch('../../../comedor/ticket.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    ARTICULOS: articulos,
                                    TOTAL: totalArticulos.TOTAL
                                })
                            })
                            .then(res => res.text())
                            .then(data => {
                                console.log(data)
                            })
                            .catch(err => {
                                console.error(err)
                        })
                        $('#textBoxFirma').dxTextBox({
                            value: ""
                        }) 
                        document.getElementById('cartProducts').innerHTML = ''
                        document.getElementById('total').innerHTML = ''
                        document.getElementById('precio').innerHTML = ''
                        generarCard()
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'No se encuentra relación con el número de gafete!',
                        timer: 3000
                    })
                }
            }
        })
    })
})