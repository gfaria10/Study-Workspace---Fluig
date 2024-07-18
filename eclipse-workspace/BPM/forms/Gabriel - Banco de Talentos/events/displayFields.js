function displayFields(form, customHTML){

    var user = form.getValue("WKUser");

    // Para pegar o valor de um campo enviado no formulário, usa-se 'getValue()'.
    var nome = form.getValue('nome');
    var perfil = form.getValue('perfil');
    var linkedin = form.getValue('linkedin');
    var email = form.getValue('email');

    var interacao = '<h1>Olá, <strong>' + user + '</strong>. O canditato <strong>' + nome + '</strong> deseja trabalhar conosco!</h1><br>' +
                    '<h3>O perfil é: <strong>' + perfil + '</strong>' +
                    'Você pode conferir o currículo completo no LinkedIn: <strong>' + linkedin + '</strong>' +
                    'Você pode entrar em contato pelo email: <strong>' + email + '</strong>' +
                    'Obrigado!</h3>'

    customHTML.append('<script>$("#mensagemInteracao").append("'+interacao+'")</script>');
    customHTML.append('<script>$("#mensagemInteracao").show();$("#formPrincipal").hide();</script>');
}