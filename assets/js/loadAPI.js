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
                alert(strDetalle || 'Error desconocido')
                return []
            }
        }

        if (blnAlert && data.success) {
            alert('Éxito')
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

        alert(errorMsg)
        return []
    }
}
