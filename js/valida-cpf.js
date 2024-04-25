export default function ehUmCpf(campo) {
    const cpf = campo.value.replace(/\.|-/g, '');
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        // Se QUALQUER uma das funções acima RETORNAR TRUE significa que o CPF é INVÁLIDO !!!
        campo.setCustomValidity('Esse CPF não é valido')
    }
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf); // Se INCLUIR algum dos numeros da lista acima, no CPF, ele irá retornar VERDADEIRO / TRUE
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador; // Pega o primeiro numero do CPF e multiplica por 10, segundo numero por 9, terceiro numero por 8 ... até o nono digito cpf por 2.
        multiplicador--; // COmo o multiplicador começa com 10, vai diminuindo conforme cada iteração
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) { // SOMENTE SE o resultado da soma * 10 e com esse valor pegarmos o modulo 11. Se esse valor fosse 10 ou 11, soma que seria retornado, é 0.
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador; 
        multiplicador--; 
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) { 
        soma = 0;
    }

    return soma != cpf[10];
}