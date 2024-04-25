import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o evento padrão do formulario (atualizar pagina)

    const listaRespostas = {
        'nome': e.target.elements['nome'].value, // Seleciona o elemento target do evento(e) -> "FORMULARIO" e em 'elements', ele vai retornar o valor do atributo 'name' do HTML
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value,
    }

    localStorage.setItem('cadastro', JSON.stringify(listaRespostas)); // Salvamos localmente com o nome 'cadastro' e o objeto listaRespostas foi convertido para JSON

    window.location.href = './abrir-conta-form-2.html'; // REDIRECIONA após feito tudo, para a outra pagina html criada.

})

camposDoFormulario.forEach( (campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', (evento) => evento.preventDefault());
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = { // OBJETO
    // PROPRIEDADES
    nome: {                 // PARES DE -> CHAVE: 'VALOR' contido dentro da Propriedade
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
} // FIM DO OBJETO

function verificaCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity('');

    if (campo.name == 'cpf' && campo.value.length >=11) {
        ehUmCpf(campo);
    }

    if (campo.name == 'aniversario' && campo.value != '') {
        ehMaiorDeIdade(campo);
    }
    // LEMBRANDO -> forEach faz uma função de callback para cada valor dentro da variavel
    tiposDeErro.forEach( (erro) => {// Para cada tipo de erro, faremos uma verificação e mandar a mensagem correta. Usaremos o primeiro exemplo 'valueMissing'
        if (campo.validity[erro]) { // Se a validade do campo para o erro atual for verdadeira (ou seja, se o erro estiver presente):
            mensagem = mensagens[campo.name][erro]; // A mensagem será a correspondente ao tipo de erro para o campo atual. Por exemplo, mensagens[campo.name]['valueMissing'].
            console.log(mensagem) // "O campo de nome não pode estar vazio."
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro') // Seleciona o campo correspondente, acima dele teremos o parentNode ('fieldset' no HTML) e a partir dai, faremos a pesquisa (querySelector) pelo elemento com classe ".mensagem-erro". Resultando sempre no SPAN com essa classe mais próxima do campo que estamos analisando

    const validadorDeInput = campo.checkValidity(); // MÉTODO checkValidity() valida se os atributos do campo estão preenchidos corretamente de acordo com o atributo -> required, pattern, type, entre outros. Ele retorna true se o campo estiver preenchido corretamente e false se não estiver.

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = '';
    }
}