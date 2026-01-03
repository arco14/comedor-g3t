const url = CONFIG.API_URL
export async function generarCard() {
    const jsonTest = {
        Stored: 'dbo.PA_ComedorG3T',
        Opcion: 'CD',
        Usuario: 'christian.acosta'
    }
    const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonTest, '', false)
    const entregas = resData[0][0]
    const empleados = resData[1][0]
    $('#entregadosDia').text(entregas.ENTREGAS_DIA)
    $('#empleadosActivos').text(empleados.EMPLEADOS_ACTIVOS)
    const fechaActual = new Date()
    $('#fechaActual').text(moment(fechaActual).format('DD/MM/yyyy, h:mm:ss a'))
}
window.addEventListener("DOMContentLoaded", () => {
    generarCard()
})