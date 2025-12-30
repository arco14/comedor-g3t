async function loadAPI(strEndpoint, strMethod, jsonData, strToken, blnAlert) {
    let resStatus

    try {
        const res = await fetch(strEndpoint, {
            method: strMethod,
            headers: {
                'Authorization': strToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        })

        resStatus = res.status

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

        const data = await res.json()

        const response = data?.response

        // ✅ Debe ser array de tablas
        if (!Array.isArray(response) || response.length === 0) {
            return []
        }

        // 🔍 Buscar intEstatus en la PRIMERA TABLA
        const firstTable = response[0]

        if (Array.isArray(firstTable) && firstTable.length) {
            const { intEstatus, strDetalle } = firstTable[0]

            if (intEstatus === 0) {
                Swal.fire({
                    text: strDetalle || 'Error desconocido',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
                return []
            }
        }

        if (blnAlert && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: 'Los datos se procesaron correctamente!',
                confirmButtonText: 'Ok',
                timer: 2000
            })
        }

        // ✅ REGRESA TODAS LAS TABLAS
        return response

    } catch (error) {
        let errorMsg

        switch (resStatus) {
            case 401:
                errorMsg = 'Token no proporcionado, vuelve a iniciar sesión.'
                break
            case 403:
                errorMsg = 'Token caducado o sin permisos. Vuelve a iniciar sesión.'
                break
            default:
                errorMsg = 'Error de servidor. Contacta a sistemas.'
        }
        Swal.fire({
            title: 'Error!',
            text: errorMsg,
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return []
    }
}
