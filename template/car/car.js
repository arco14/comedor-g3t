window.addEventListener('DOMContentLoaded', async () => {
    const url = CONFIG.API_URL

    //? obtener firma por gafete
    const firma =  14130589

    const jsonEmpleado = {
        Stored: 'dbo.PA_ComedorG3T',
        Opcion: 'CE',
        Firma: firma
    }
    return
    const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonEmpleado, '', false)
    console.log(resData)
    const infoEmpleado = resData.response[0][0]
    $('#numEmpleado').html(infoEmpleado.NUMERO_EMPLEADO)
    $('#infoEmpleado').html(`${infoEmpleado.NOMBRE}, ${infoEmpleado.DEPARTAMENTO}`)
})