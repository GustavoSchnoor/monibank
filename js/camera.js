const botaoIniciarCamera = document.querySelector('[data-video-botao]'); // Selecionamos a imagem de sorriso para fazer algo quando clicar nela
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagem = document.querySelector('[data-mensagem]');
const botaoEnviarFoto = document.querySelector('[data-enviar]');

let imagemURL = '';

botaoIniciarCamera.addEventListener('click', async function () {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false}) // Solicita ao usuario a permissao de abrir a camera do dispositivo

    botaoIniciarCamera.style.display = 'none'; // com o display: none, o campo não será exibido mais no site
    campoCamera.style.display = 'block'; // com o display: block, o campo será exibido no site.

    video.srcObject = iniciarVideo // No elemento HTML video, colocamos o "src" src.Object = ao objeto promise que retornou após verificação do await no navigator.mediaDevices.getUserMedia
})

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drowImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = 'none';
    mensagem.style.display = 'block'
})

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro');
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;
    
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    window.location.href = './abrir-conta-form-3.html';
})