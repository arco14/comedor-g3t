window.addEventListener("DOMContentLoaded", () => {
    // VARIABLES
    const url = CONFIG.API_URL
    let idRow, blnDblClickGrid
    const arrayEmpleados = [{
        dataField: 'NUMERO_EMPLEADO',
        caption: '# EMPLEADO',
        dataType: 'string',
    }, 
    {
        dataField: 'NOMBRE',
        caption: 'NOMBRE',
        dataType: 'string',
    }, 
    {
        dataField: 'DEPARTAMENTO',
        caption: 'DEPARTAMENTO',
        dataType: 'STRING', 
    }, 
    {
        dataField: 'FIRMA',
        caption: 'FIRMA',
        dataType: 'string',
    }]
    
    // MODAL
    const modalElement = document.getElementById('modalEmpleados')
    const modal = new bootstrap.Modal(modalElement)

    // COMPONENTES 
    loadSwitch("#swActivo", false, true, true, true)
    loadTextBox('#textBoxNumEmpleado', '', true, 'Ingresa el # empleado', false, false)
    loadTextBox('#textBoxNombre', '', true, 'Ingresa el nombre', false, false)
    loadTextBox('#textBoxDepartamento', '', true, 'Ingresa el departamento', false, false)
    loadTextBox('#textBoxFirmaEmp', '', true, 'Ingresa la firma', false, false)
    loadButton('#btnGuardar', 'Guardar', 'success', false, true, false, '', '')
    
    // FUNCIONES
    async function generarGrid(opcion) {
        const jsonArticulo = {
            Stored: 'dbo.PA_ComedorG3T',
            Opcion: opcion,
        }
        const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonArticulo, '', false)
        loadDataGrid(
                '#dataGridEmpleados',
                resData !== undefined ? resData[0] : [],
                'single',
                20,
                arrayEmpleados,
                'Comedor G3T',
                false,
                null,
                false,
                450,
                true,
                'gridSatateEmpleados', {
                    onSelectionChanged(e) {
                        const data = e.selectedRowsData[0]
                        idRow = data.FIRMA
                        $('#swActivo').dxSwitch({
                            readOnly: false,
                            disabled: false,
                            value: data.ACTIVO
                        })
                        $('#textBoxNumEmpleado').dxTextBox({
                            value: data.NUMERO_EMPLEADO,
                            readOnly: true
                        })
                        $('#textBoxNombre').dxTextBox({
                            value: data.NOMBRE
                        })
                        $('#textBoxDepartamento').dxTextBox({
                            value: data.DEPARTAMENTO
                        })
                        $('#textBoxFirmaEmp').dxTextBox({
                            value: data.FIRMA, 
                            readOnly: true
                        })
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
    generarGrid('CTE')
    
    // ACCIONES
    $('#agregarEmpleados').click(() => {
        idRow = 0
        $('#swActivo').dxSwitch('option', 'value', true)
        $('#textBoxNumEmpleado').dxTextBox({
            value: '',
            readOnly: false
        })
        $('#textBoxNombre').dxTextBox('option', 'value', '')
        $('#textBoxDepartamento').dxTextBox('option', 'value', '')
        $('#textBoxFirmaEmp').dxTextBox({
            value: '',
            readOnly: false
        })
        modal.show()
    })

     $('#btnHome').click(() => {
        window.location = '../../../comedor'
     })

    $('#btnGuardar').dxButton({
        async onClick() {
            const activo = $('#swActivo').dxSwitch('option', 'value')
            const numeroEmpleado = $('#textBoxNumEmpleado').dxTextBox('option', 'value')
            const nombre = $('#textBoxNombre').dxTextBox('option', 'value')
            const departamento = $('#textBoxDepartamento').dxTextBox('option', 'value')
            const firma = $('#textBoxFirmaEmp').dxTextBox('option', 'value')
            const jsonGuardarEmpleado = {
                Stored: 'dbo.PA_ComedorG3T',
                Opcion: 'GE',
                Empleado: {
                    ID: parseInt(idRow),
                    NUMERO_EMPLEADO: numeroEmpleado,
                    NOMBRE: nombre, 
                    DEPARTAMENTO: departamento,
                    FIRMA: firma, 
                    ACTIVO: activo
                }
            }
            const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonGuardarEmpleado, '', true)
            if(resData.length > 0) {
                modal.hide()
                generarGrid('CTE')
            }
        }
    })
})