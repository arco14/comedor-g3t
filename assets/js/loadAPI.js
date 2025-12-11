async function loadAPI(strEndpoint, strMethod, jsonData, strToken, blnAlert) {
    let resStatus;

    try {
        const res = await fetch(strEndpoint, {
            method: strMethod,
            headers: {
                'Authorization': strToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        });

        resStatus = res.status;

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();


        // 🔹 Aquí atrapamos errores enviados desde Node
        if (data.success === false || data.message?.includes('does not exist')) {
            Swal.fire({
                title: 'Error!',
                text: data.message || 'Error desconocido en el servidor.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const result = data?.response?.[0];
        if (!result?.length) return;

        const { intEstatus, strDetalle } = result[0];

        if (intEstatus === 0) {
            Swal.fire({
                text: strDetalle || 'Error desconocido',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (blnAlert && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: 'Los datos se procesaron con éxito',
                confirmButtonText: 'Ok',
                timer: 2000
            });
        }

        return data;

    } catch (error) {
        let errorMsg;
        switch (resStatus) {
            case 401:
                errorMsg = 'Token no proporcionado, vuelve a iniciar sesión.';
                break;
            case 403:
                errorMsg = 'Token caducado o sin permisos. Vuelve a iniciar sesión.';
                break;
            default:
                // 🔹 Mostramos el error del backend si existe
                errorMsg = error.message || 'Error de servidor. Contacta a sistemas.';
        }

        Swal.fire({
            title: 'Error!',
            text: errorMsg,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
