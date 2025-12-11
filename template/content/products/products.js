window.addEventListener("DOMContentLoaded", () => {
    const arrayEntrega = [{
        dataField: 'NUM_EMPLEADO',
        caption: 'Num Empleado',
        dataType: 'string',
        width: 100,
        alignment: 'center'
    }, {
        dataField: 'NOMBRE_EMPLEADO',
        caption: 'Nombre Empleado',
        dataType: 'string',
    }, {
        dataField: 'CANTIDAD',
        caption: 'Cantidad',
        dataType: 'number',
        width: 100,
        alignment: 'center'
    }, {
        dataField: 'PRODUCTO',
        caption: 'Producto',
        dataType: 'string',
    }]
    const jsonEntrega = [{
        NUM_EMPLEADO: 1234,
        NOMBRE_EMPLEADO: 'Manuel Acosta',
        CANTIDAD: 5,
        PRODUCTO: 'Comida'
    }, {
        NUM_EMPLEADO: 4567,
        NOMBRE_EMPLEADO: 'Christian Acosta',
        CANTIDAD: 3,
        PRODUCTO: 'Snack'
    }, {
        NUM_EMPLEADO: 2789,
        NOMBRE_EMPLEADO: 'Emiliano Acosta',
        CANTIDAD: 2,
        PRODUCTO: 'Bebida'
    }, {
        NUM_EMPLEADO: 3456,
        NOMBRE_EMPLEADO: 'David Acosta',
        CANTIDAD: 8,
        PRODUCTO: 'Comida'
    }]
    loadDataGrid('#dataGridEntrega', 
                  jsonEntrega, 'none', 20, arrayEntrega, 'Entregas-Comedor', false, '', true, 450, true, 'gridEntrega')
})