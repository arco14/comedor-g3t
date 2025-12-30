window.addEventListener("DOMContentLoaded", async () => {
    // const url = CONFIG.API_URL
    const arrayArticulos = [{
        dataField: 'NOMBRE',
        caption: 'Nombre',
        dataType: 'string',
    }, 
    {
        dataField: 'CLAVE',
        caption: 'Clave',
        dataType: 'string',
    }, 
    {
        dataField: 'PRECIO',
        caption: 'Precio',
        dataType: 'number',
    }, 
    {
        dataField: 'IMAGEN',
        caption: 'Imagen',
        dataType: 'string',
    }]
    const jsonData = [{
        NOMBRE: 'Test',
        CLAVE: 'TES', 
        PRECIO: 35,
        IMAGEN: 'bebida.jpg'
    }]
    async function generarGrid(strComponente, jsonData, arrayColumns, blnIsModal, intHeight) {
        loadDataGrid(
                `#${strComponente}`,
                jsonData,
                'none',
                20,
                arrayColumns,
                'Comedor 3T',
                false,
                null,
                blnIsModal,
                intHeight,
                true,
                `gridSatate-${strComponente}`
            )
    }
    generarGrid('dataGridArticulos', jsonData, arrayArticulos, true, 500)

    $('#agregarArticulos').click(() => {
        const modalElement = document.getElementById('modalArticulos')
        const modal = new bootstrap.Modal(modalElement)
        modal.show()
    })
})