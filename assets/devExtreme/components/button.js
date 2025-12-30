function loadButton(strComponente, strText, strType, blnSubmit, blnVisible, blnDisabled, typeIcon, strTextHint) {
    $(strComponente).dxButton({
        text: strText,
        type: strType,
        useSubmitBehavior: blnSubmit,
        visible: blnVisible,
        disabled: blnDisabled,
        icon: typeIcon,
        hint: strTextHint
    })
}