window.addEventListener("DOMContentLoaded", () => {
    // VARIABLES
    const url = CONFIG.API_URL
    let idRow = 0
    let blnDblClickGrid, nombreImagen
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
        dataField: 'IMG',
        caption: 'Imagen',
        dataType: 'string',
    }]
    // MODAL
    const modalElement = document.getElementById('modalArticulos')
    const modal = new bootstrap.Modal(modalElement)

    // COMPONENTES 
    loadSwitch("#swActivo", false, true, true, true)
    loadTextBox('#textBoxNombre', '', true, 'Ingresa el nombre', false, false)
    loadTextBox('#textBoxClave', '', true, 'Ingresa la clave', false, false)
    loadNumberBox('#numberBoxPrecio', 'requerido', false, '$ 0', '$ #0.##', false, 999999999, 1, true)
    
    // FUNCIONES
    async function generarGrid(opcion) {
        const jsonArticulo = {
            Stored: 'dbo.PA_ComedorG3T',
            Opcion: opcion,
        }
        const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonArticulo, '', false)
        loadDataGrid(
                '#dataGridArticulos',
                resData !== undefined ? resData[0] : [],
                'single',
                20,
                arrayArticulos,
                'Comedor G3T',
                false,
                null,
                false,
                450,
                true,
                'gridSatateArticulos', {
                    onSelectionChanged(e) {
                        const data = e.selectedRowsData[0]
                        idRow = data.id
                        $('#swActivo').dxSwitch({
                            readOnly: false,
                            disabled: false,
                            value: data.ACTIVO
                        })
                        $('#textBoxNombre').dxTextBox({
                            value: data.NOMBRE
                        })
                        $('#textBoxClave').dxTextBox({
                            value: data.CLAVE,
                            readOnly: true
                        })
                        $('#numberBoxPrecio').dxNumberBox({
                            value: data.PRECIO
                        })
                        $('#contenedorImgFile').addClass('d-none')
                    },
                    onRowDblClick(e) {
                        if (blnDblClickGrid) {
                            e.event.preventDefault()
                        } else {
                            modal.show()
                        }
                    }
                }
            )
    }
    generarGrid('CA')
    
    // ACCIONES
    $('#agregarArticulos').click(() => {
        idRow = 0
        $('#swActivo').dxSwitch('option', 'value', true)
        $('#textBoxNombre').dxTextBox('option', 'value', '')
        $('#textBoxClave').dxTextBox({
            value: '', 
            readOnly: false
        })
        $('#numberBoxPrecio').dxNumberBox('option', 'value', '')
        $('#contenedorImgFile').removeClass('d-none')
        $('#fileImge').val('')
        modal.show()
    })

    $('#btnGuardar').click(async () => {
        const activo = $('#swActivo').dxSwitch('option', 'value')
        const nombre = $('#textBoxNombre').dxTextBox('option', 'value')
        const clave = $('#textBoxClave').dxTextBox('option', 'value')
        const precio = $('#numberBoxPrecio').dxNumberBox('option', 'value')
        const fileImg = document.getElementById("fileImge")
        const formData = new FormData()
        if(fileImg.files[0] !== undefined) {
            nombreImagen = fileImg.files[0].name
            if (fileImg.files.length > 0) {
                formData.append("fileImg", fileImg.files[0]);
            }
            fetch("../../../comedor/subir.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(resp => {
                console.log(resp)
            })
        } 
        const jsonGuardarArticulo = {
            Stored: 'dbo.PA_ComedorG3T',
            Opcion: 'GA',
            Articulo: {
                ID: idRow,
                NOMBRE: nombre,
                CLAVE: clave, 
                PRECIO: precio,
                IMAGEN: nombreImagen, 
                ACTIVO: activo
            }
        }
        const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonGuardarArticulo, '', true)
        if(resData.length > 0) {
            modal.hide()
            generarGrid('CA')
        }
    })
})