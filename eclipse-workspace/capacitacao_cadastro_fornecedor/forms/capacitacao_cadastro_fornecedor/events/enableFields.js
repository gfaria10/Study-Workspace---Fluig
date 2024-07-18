function enableFields(form){
    // Campos que devem ficar bloqueados e que não terá alteração
    form.setEnabled('solicitante', false);
    form.setEnabled('emailSolicitante', false);
}