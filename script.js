const html = document.querySelector('html')
const BtFoco = document.querySelector('.app__card-button--foco')
const BtCurto = document.querySelector('.app__card-button--curto')
const BtLongo = document.querySelector('.app__card-button--longo')
const BtTempo = document.querySelector('.app__card-primary-button')
const Botoes = document.querySelectorAll('.app__card-button')
const imagem = document.querySelector('.app__image')
const tempoNaTela = document.getElementById('timer')
const BtMusica = document.getElementById('alternar-musica')
const BtIniciar = document.getElementById('start-pause')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconeIniciarOuPausarBt = document.querySelector('.app__card-primary-butto-icon')
const pause = new Audio('./sons/pause.mp3')
const playContagem = new Audio('./sons/play.wav')
const finalizarContagem = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervalo = null

musica.loop = true



BtMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


function textoPrincipal(texto, textostrong) {
    document.querySelector('.app__title').firstChild.textContent = texto;
    document.querySelector('.app__title-strong').textContent = textostrong;
}

function alterarConteudo(conteudo) {
    mostrarTempo()
    html.setAttribute('data-contexto', conteudo)
    imagem.setAttribute('src', `/.imagens/${conteudo}.png`);
    Botoes.forEach(function (conteudo) {
        conteudo.classList.remove('active')
    })
}

function alterarBotao(momento) {
    iniciarOuPausarBt.textContent = `${momento}`
    iconeIniciarOuPausarBt.setAttribute('src', `/.imagens/${momento}.png`);

}

BtFoco.addEventListener('click', () => {
    textoPrincipal('Otimize sua produtividade,', 'mergulhe no que importa')
    alterarConteudo('foco')
    BtFoco.classList.add('active')
    tempoDecorridoEmSegundos = 1500;
    mostrarTempo()
})

BtCurto.addEventListener('click', () => {
    textoPrincipal('Que tal dar uma respirada?', 'Faça uma pausa curta!')
    alterarConteudo('descanso-curto')
    BtCurto.classList.add('active')
    tempoDecorridoEmSegundos = 300;
    mostrarTempo()
})

BtLongo.addEventListener('click', () => {
    textoPrincipal('Hora de voltar à superfície.', 'Faça uma pausa longa.')
    alterarConteudo('descanso-longo')
    BtLongo.classList.add('active')
    tempoDecorridoEmSegundos = 900;
    mostrarTempo()
})


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        finalizarContagem.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
}

BtIniciar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervalo) {
        pause.play()
        zerar()
        alterarBotao("Retornar")
        return
    }
    playContagem.play()
    intervalo = setInterval(() => { 
        contagemRegressiva()
        mostrarTempo()
    }, 1000)
    alterarBotao("Pausar")

}

function zerar() {
    clearInterval(intervalo)
    intervalo = null
    alterarBotao("Começar")
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()