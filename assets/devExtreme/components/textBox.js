function loadTextBox(strComponente, strMode, blnVisible, strPlaceHolder, blnValidacion, blnReadOnly, strValidationGroup) {
    if (blnValidacion) {
        $(strComponente).dxTextBox({
            mode: strMode,
            showClearButton: true,
            placeholder: strPlaceHolder,
            visible: blnVisible,
            readOnly: blnReadOnly,
        }).dxValidator({
            validationGroup: strValidationGroup,
            validationRules: [{
                    type: 'required',
                    message: 'Requerido',
                }
            ],
        });
    } else {
        $(strComponente).dxTextBox({
            showClearButton: true,
            placeholder: strPlaceHolder,
            visible: blnVisible,
            readOnly: blnReadOnly,
        })
    }
}