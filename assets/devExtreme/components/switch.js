function loadSwitch(strComponente, blnValidacion, blnValue, blnDisabled, blnReadOnly) {
    if (blnValidacion) {
        $(strComponente).dxSwitch({
            value: blnValue,
            readOnly: blnReadOnly,
            disabled: blnDisabled,
            switchedOffText: 'No',
            switchedOnText: 'Si'
        }).dxValidator({
            validationRules: [{
                type: 'required',
                message: 'Requerido',
            }]
        })
    } else {
        $(strComponente).dxSwitch({
            value: blnValue,
            readOnly: blnReadOnly,
            disabled: blnDisabled,
            switchedOffText: 'No',
            switchedOnText: 'Si'
        })
    }
}