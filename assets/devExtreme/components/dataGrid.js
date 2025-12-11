
function loadDataGrid(
    strComponente,
    jsonSource,
    strSelectionRow,
    intPaging,
    arrayColumns,
    strNameExcel,
    blnMasterDetailEnabled,
    functionMasterDetail,
    blnIsModal,
    intHeight,
    blnStoring,
    keyStorage,
    additionalOptions = {}
) {
    const heightWindow = window.innerHeight
    let height = blnIsModal ? intHeight : heightWindow
    height = height > 750 ? 700 : height > 700 ? 500 : height
     
    $(() => {
        let collapsed = false
        $(strComponente).dxDataGrid({
            dataSource: jsonSource,
            allowColumnResizing: true,
            allowSorting: true,
            allowFiltering: true,
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            closeOnOutsideClick: true,
            height: height,
            columnChooser: {
                enabled: true,     
            },
            allowColumnReordering: true,
            export: {
                enabled: true,
                allowExportSelectedData: true,
            },
            selection: {
                mode: strSelectionRow,
            },
            paging: {
                pageSize: intPaging,
            },
            filterPanel: {
                visible: true,
            },
            pager: {
                visible: true,
                allowedPageSizes: [20, 50, "all"],
                showPageSizeSelector: true,
                showInfo: true,
                showNavigationButtons: true,
            },
            loadPanel: {
                enabled: false,
            },
            remoteOperations: false,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: true,
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: true,
            },
            groupPanel: {
                visible: true,
            },
            grouping: {
                autoExpandAll: true,
            },
            columnFixing: {
                enabled: true,
            },
            columns: arrayColumns,
            toolbar: {
                items: [
                    "addRowButton",
                    "searchPanel",
                    {
                        location: "after",
                        widget: "dxButton",
                        options: {
                            icon: "increaseindent",
                            hint: "Contraer/Expandir",
                            onClick(e) {
                                const expanding = e.component.option("icon") === "increaseindent"
                                gridInstance.option("grouping.autoExpandAll", expanding)
                                e.component.option("icon", expanding ? "contentlayout" : "increaseindent")
                            },
                        },
                    },
                    "exportButton",
                    "columnChooserButton",
                    "groupPanel",
                ],
            },
            onExporting(e) {
                const workbook = new ExcelJS.Workbook()
                const worksheet = workbook.addWorksheet(strNameExcel)
                const bordesColumnas = {
                    top: {
                        style: "thin"
                    },
                    left: {
                        style: "thin"
                    },
                    bottom: {
                        style: "thin"
                    },
                    right: {
                        style: "thin"
                    }
                }
                function direccionBordes(a1) {
                    const m = a1.toUpperCase().match(/^([A-Z]+)(\d+)$/)
                    if (!m) throw new Error("Dirección A1 inválida: " + a1)
                    const letters = m[1]
                    const row = parseInt(m[2], 10)
                    let col = 0
                    for (let i = 0; i < letters.length; i++) {
                        col = col * 26 + (letters.charCodeAt(i) - 64)
                    }
                    return {
                        row,
                        col
                    }
                }
                function aplicarBordes(rangeA1) {
                    const parts = rangeA1.split(":")
                    const start = direccionBordes(parts[0])
                    const end = parts.length === 2 ? direccionBordes(parts[1]) : start
                    for (let r = start.row; r <= end.row; r++) {
                        const rowObj = worksheet.getRow(r)
                        for (let c = start.col; c <= end.col; c++) {
                            const cell = rowObj.getCell(c)
                            cell.border = bordesColumnas
                        }
                    }
                }
                //? Conversion imagen base 64
                const isoJumaco = "../../assets/img/iso-jumaco.png"
                let imgBase64
                function imgIso() {
                    imgUrlBase64(isoJumaco).then(base64 => {
                        imgBase64 = base64
                        worksheet.getColumn(2).width = 20
                        worksheet.getRow(1).height = 1220
                        const imgWidth = 150
                        const imgHeight = 150
                        const imageId = workbook.addImage({
                            base64: imgBase64,
                            extension: "png",
                        })
                        const colIndex = 1
                        const rowIndex = 0
                        const colWidthPx = worksheet.getColumn(2).width * 7.5
                        const rowHeightPx = worksheet.getRow(1).height
                        const offsetX = (colWidthPx - imgWidth) / 2
                        const offsetY = (rowHeightPx - imgHeight) / 2
                        worksheet.addImage(imageId, {
                            tl: {
                                col: colIndex,
                                row: rowIndex,
                                nativeColOffset: offsetX,
                                nativeRowOffset: offsetY
                            },
                            ext: {
                                width: imgWidth,
                                height: imgHeight
                            }
                        })
                        worksheet.getCell("B1").border = {
                            top: {
                                style: "thin"
                            },
                            bottom: {
                                style: "thin"
                            },
                            left: {
                                style: "thin"
                            },
                            right: {
                                style: "thin"
                            }
                        }
                        worksheet.mergeCells("B1:B8")
                        aplicarBordes("B1:B8")
                        //? =========================
                        //? ENCABEZADO PRINCIPAL    
                        //? =========================
                        worksheet.mergeCells("C1:G1")
                        const header = worksheet.getCell("C1")
                        header.value = "SISTEMA DE GESTIÓN DE LA CALIDAD"
                        header.font = {
                            name: "Arial",
                            size: 14,
                            bold: true
                        }
                        header.alignment = {
                            horizontal: "center",
                            vertical: "middle"
                        }
                        worksheet.getRow(1).height = 26
                        aplicarBordes("C1:G1")
                        worksheet.mergeCells("C2")
                        worksheet.getCell("C2").value = "Proceso"
                        worksheet.getCell("C2").font = {
                            bold: true
                        }
                        aplicarBordes("C2")
                        worksheet.mergeCells("D2")
                        worksheet.getCell("D2").value = "Planeación"
                        aplicarBordes("D2")
                        worksheet.mergeCells("E2")
                        worksheet.getCell("E2").value = "Tipo:"
                        aplicarBordes("E2")
                        worksheet.mergeCells("F2:G2")
                        worksheet.getCell("F2").value = "Control Operacional"
                        aplicarBordes("F2:G2")
                        worksheet.mergeCells("C3")
                        worksheet.getCell("C3").value = "Subproceso"
                        worksheet.getCell("C3").font = {
                            bold: true
                        }
                        aplicarBordes("C3")
                        worksheet.mergeCells("D3")
                        worksheet.getCell("D3").value = "Diseño y Desarrollo"
                        aplicarBordes("D3")
                        worksheet.mergeCells("E3")
                        worksheet.getCell("E3").value = "Código:"
                        aplicarBordes("E3")
                        worksheet.mergeCells("F3:G3")
                        worksheet.getCell("F3").value = "R-PL-02-06"
                        aplicarBordes("F3:G3")
                        worksheet.mergeCells("C4:C5")
                        worksheet.getCell("C4").value = "Título:"
                        worksheet.getCell("C4").font = {
                            bold: true
                        }.alignment = {
                            horizontal: "center",
                            vertical: "middle"
                        }
                        aplicarBordes("C4:C5")
                        worksheet.mergeCells("D4:E5:D5")
                        const strPrograma = worksheet.getCell("D4")
                        strPrograma.value = "Programa de muestras"
                        strPrograma.alignment = {
                            horizontal: "center",
                            vertical: "middle"
        
                        }
                        aplicarBordes("D4:E5:D5")
                        worksheet.mergeCells("F4")
                        worksheet.getCell("F4").value = "Versión:"
                        worksheet.getCell("F4").font = {
                            bold: true
                        }
                        worksheet.getColumn(1).width = 1000
                        aplicarBordes("F4")
                        worksheet.mergeCells("G4")
                        worksheet.getCell("G4").value = "Versión: 1"
                        aplicarBordes("G4")
                        worksheet.mergeCells("F5")
                        worksheet.getCell("F5").value = "Revisión:"
                        worksheet.getCell("F5").font = {
                            bold: true
                        }
                        aplicarBordes("F5")
                        worksheet.mergeCells("G5")
                        worksheet.getCell("G5").value = "Revisión"
                        aplicarBordes("G5")
        
                        worksheet.mergeCells("F7")
                        worksheet.getCell("F7").value = "Actualización:"
                        worksheet.getCell("F7").alignment = {
                            horizontal: "right"
                        }
                        worksheet.getCell("F7").font = {
                            italic: true
                        }
                        worksheet.mergeCells("F8")
                        worksheet.getCell("F8").value = "Fecha de verificación:"
                        worksheet.getCell("F8").alignment = {
                            horizontal: "right"
                        }
                        worksheet.getCell("F8").font = {
                            italic: true
                        }
                        worksheet.mergeCells("F9")
                        worksheet.getCell("F9").value = "Verificado por:"
                        worksheet.getCell("F9").alignment = {
                            horizontal: "right"
                        }
                        worksheet.getCell("F9").font = {
                            italic: true
                        }
                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: {
                                row: 11,
                                column: 1
                            }, // empieza debajo
                            autoFilterEnabled: true,
                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], {
                                    type: "application/octet-stream"
                                }), `${strNameExcel}.xlsx`)
                            })
                        })
                        e.cancel = true
                    })
                }
                imgIso()
            },
            onContentReady(e) {
                if (!collapsed) {
                    collapsed = true
                    e.component.expandRow(["EnviroCare"])
                }
            },
            summary: {
                totalItems: [],
            },
            onContextMenuPreparing(e) {
                if (e.column === undefined) {
                    return
                } else {
                    if (e.target !== "content") return
                    const tipoColumna = e.column.dataType
                    if (tipoColumna === "number") {
                        e.items = [{
                                text: "Suma",
                                onItemClick: () => addSummario(strComponente, e.column, "sum")
                            },
                            {
                                text: "Promedio",
                                onItemClick: () => addSummario(strComponente, e.column, "avg")
                            },
                            {
                                text: "Mínimo",
                                onItemClick: () => addSummario(strComponente, e.column, "min")
                            },
                            {
                                text: "Máximo",
                                onItemClick: () => addSummario(strComponente, e.column, "max")
                            },
                            {
                                text: "Limpiar",
                                onItemClick: () => limpiarSumarios(strComponente, e.column)
                            },
                        ]
                    } else if (tipoColumna === "string" || tipoColumna === "date" || tipoColumna === "datetime" || tipoColumna === "boolean") {
                        e.items = [{
                                text: "Conteo",
                                onItemClick: () => addSummario(strComponente, e.column, "count")
                            },
                            {
                                text: "Limpiar",
                                onItemClick: () => limpiarSumarios(strComponente, e.column)
                            },
                        ]
                    }
                }
            },
            masterDetail: {
                enabled: blnMasterDetailEnabled,
                template(container, options) {
                    if (typeof functionMasterDetail === "function") {
                        functionMasterDetail(container, options)
                    }
                },
            },
            stateStoring: {
                enabled: blnStoring,
                type: "localStorage",
                storageKey: keyStorage,
            },
            ...additionalOptions,
        }).dxDataGrid("instance")
    })

    window.clearGridSelection = () => {
        gridInstance.clearSelection()
    }

    async function imgUrlBase64(url) {
        const response = await fetch(url)
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    function addSummario(strComponente, column, typeSummary) {
        const dataGrid = $(strComponente).dxDataGrid("instance")
        const totalItems = dataGrid.option("summary.totalItems")
        const existingSummary = totalItems.find(item => item.column === column.dataField && item.summaryType === typeSummary)
        if (!existingSummary) {
            totalItems.push({
                column: column.dataField,
                summaryType: typeSummary
            })
        }
        dataGrid.option("summary.totalItems", totalItems)
    }

    function limpiarSumarios(strComponente, column) {
        const dataGrid = $(strComponente).dxDataGrid("instance")
        const totalItems = dataGrid.option("summary.totalItems")
        const newSummary = totalItems.filter(item => item.column !== column.dataField)
        dataGrid.option("summary.totalItems", newSummary)
    }
    
}