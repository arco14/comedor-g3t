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
                    if(resTicket[0].length > 0 || resTicket[1][0].TOTAL !== null) {
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