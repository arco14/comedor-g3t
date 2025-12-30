function loadNumberBox(strComponente, strMessage, blnValidation, strPlaceHolder, strFormat, blnReadOnly, floatMax, floatMin, blnClearButton, strValidationGroup) {
    if (blnValidation) {
        $(strComponente).dxNumberBox({
            format: strFormat,
            value: 0,
            placeholder: strPlaceHolder,
            showSpinButtons: true,
            showClearButton: blnClearButton,
            readOnly: blnReadOnly,
            max: floatMax,
            min: floatMin,
        }).dxValidator({
            validationGroup: strValidationGroup,
            validationRules: [{
                type: 'required',
                message: strMessage
            }]
        })
    } else {
        $(strComponente).dxNumberBox({
            format: strFormat,
            value: 0,
            placeholder: strPlaceHolder,
            showSpinButtons: true,
            showClearButton: blnClearButton,
            readOnly: blnReadOnly,
            max: floatMax,
            min: floatMin,
        })
    }
}