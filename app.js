let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroAleatorio = gerarNumeroAleatorio();
let contadorTentativas = 1;

function exibirTextoNaTela (tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial(){
  exibirTextoNaTela ('h1','Jogo do número secreto');
  exibirTextoNaTela ('p','Escolha um número entre 1 e 10');
}

exibirMensagemInicial ();

function verificarChute() {
  let chute =  document.querySelector('input').value;
  if (chute == numeroAleatorio) {
    exibirTextoNaTela ('h1','Você acertou!');
    let palavraTentativa =  contadorTentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Parabéns! Você acertou com ${contadorTentativas} ${palavraTentativa}!`;
    exibirTextoNaTela ('p',mensagemTentativa);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroAleatorio) {
      exibirTextoNaTela ('h1', `O numero secreto é menor que ${chute}`);
    } else {
      exibirTextoNaTela ('h1', `O numero secreto é maior que ${chute}`);
    } 
    contadorTentativas++;
    limparCampo();
}
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let tamanhoLista = listaDeNumerosSorteados.lenght;

  if (tamanhoLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  } 
  if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
  
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogoAleatorio() {
  numeroAleatorio = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}