export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    validaIdade(dataNascimento)

    console.log(validaIdade(dataNascimento))
}

function validaIdade(data) {
    const dataAtual = new Date(); // Mostra a data ATUAL
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    // data.getUTCFullYear() Pegamos a data de nascimento passada na função e somamos 18
    // data.getUTCMonth() Pegamos o mes de nascimento
    // data.getUTCDate() Pegamos o dia do nascimento
    // dataMais18 = ano que nasceu +18 / mes/ dia.

    return dataAtual >= dataMais18; // Retorna TRUE se a data atual for maior que a data em que que TERIA 18.
}