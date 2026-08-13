// =====================
// Seleção dos Elementos
// =====================
const campoSenha = document.querySelector("#campo-senha");
const numeroSenha = document.querySelector("#valor-tamanho"); // Atualizado para o ID do HTML novo
const rangeSenha = document.querySelector("#range-caracteres"); // Novo slider
const btnGerar = document.querySelector("#btn-gerar"); // Novo botão de gerar

const botaoDiminuir = document.querySelector("#btn-menos");
const botaoAumentar = document.querySelector("#btn-mais");

const chkMaiusculo = document.querySelector("#maiusculo");
const chkMinusculo = document.querySelector("#minusculo");
const chkNumero = document.querySelector("#numero");
const chkSimbolo = document.querySelector("#simbolo");

const barra = document.querySelector("#nivel-forca");
const tempo = document.querySelector("#tempo-forca");
const badgeStatus = document.querySelector("#badge-nivel");

const botaoCopiar = document.querySelector("#copiar");

let tamanhoSenha = 12;

// =====================
// Eventos
// =====================

// Eventos de clique nos botões - e +
botaoDiminuir.addEventListener("click", diminuir);
botaoAumentar.addEventListener("click", aumentar);

// Evento ao arrastar a barra de deslizar
if (rangeSenha) {
    rangeSenha.addEventListener("input", (e) => {
        tamanhoSenha = parseInt(e.target.value);
        numeroSenha.textContent = `${tamanhoSenha} caracteres`;
        geraSenha();
    });
}

// Botão adicional "Gerar Nova Senha"
if (btnGerar) {
    btnGerar.addEventListener("click", geraSenha);
}

// Checkboxes de opções
chkMaiusculo.addEventListener("change", geraSenha);
chkMinusculo.addEventListener("change", geraSenha);
chkNumero.addEventListener("change", geraSenha);
chkSimbolo.addEventListener("change", geraSenha);

// Botão Copiar
botaoCopiar.addEventListener("click", copiarSenha);

// =====================
// Controle de Tamanho
// =====================

function diminuir() {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        atualizarInputsTamanho();
        geraSenha();
    }
}

function aumentar() {
    if (tamanhoSenha < 32) {
        tamanhoSenha++;
        atualizarInputsTamanho();
        geraSenha();
    }
}

function atualizarInputsTamanho() {
    numeroSenha.textContent = `${tamanhoSenha} caracteres`;
    if (rangeSenha) {
        rangeSenha.value = tamanhoSenha;
    }
}

// =====================
// Gerar Senha
// =====================

function geraSenha() {
    let caracteres = "";

    if (chkMaiusculo.checked) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chkMinusculo.checked) caracteres += "abcdefghijklmnopqrstuvwxyz";
    if (chkNumero.checked) caracteres += "0123456789";
    if (chkSimbolo.checked) caracteres += "!@#$%&*()_-+=?<>";

    if (caracteres.length === 0) {
        campoSenha.value = "";
        atualizarForca(0);
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;
    atualizarForca(caracteres.length);
}

// =====================
// Barra de Força (Entropia)
// =====================

function atualizarForca(base) {
    if (base === 0) {
        barra.style.width = "0%";
        barra.style.background = "#f85149";
        if (badgeStatus) {
            badgeStatus.textContent = "Inválida";
            badgeStatus.style.color = "#f85149";
            badgeStatus.style.background = "rgba(248, 81, 73, 0.15)";
        }
        tempo.textContent = "Selecione pelo menos um tipo de caractere.";
        return;
    }

    const entropia = tamanhoSenha * Math.log2(base);

    if (entropia < 40) {
        barra.style.width = "30%";
        barra.style.background = "#f85149";
        if (badgeStatus) {
            badgeStatus.textContent = "Fraca";
            badgeStatus.style.color = "#f85149";
            badgeStatus.style.background = "rgba(248, 81, 73, 0.15)";
        }
        tempo.textContent = "Senha fraca. Pode ser descoberta em poucos minutos.";
    } 
    else if (entropia < 60) {
        barra.style.width = "60%";
        barra.style.background = "#d29922";
        if (badgeStatus) {
            badgeStatus.textContent = "Média";
            badgeStatus.style.color = "#d29922";
            badgeStatus.style.background = "rgba(210, 153, 34, 0.15)";
        }
        tempo.textContent = "Senha média. Pode levar alguns anos para ser descoberta.";
    } 
    else if (entropia < 80) {
        barra.style.width = "85%";
        barra.style.background = "#3fb950";
        if (badgeStatus) {
            badgeStatus.textContent = "Forte";
            badgeStatus.style.color = "#3fb950";
            badgeStatus.style.background = "rgba(63, 185, 80, 0.15)";
        }
        tempo.textContent = "Senha forte. Pode levar milhares de anos para ser descoberta.";
    } 
    else {
        barra.style.width = "100%";
        barra.style.background = "#58a6ff";
        if (badgeStatus) {
            badgeStatus.textContent = "Muito Forte";
            badgeStatus.style.color = "#58a6ff";
            badgeStatus.style.background = "rgba(88, 166, 255, 0.15)";
        }
        tempo.textContent = "Senha extremamente forte. Um computador levaria milhões de anos para descobri-la.";
    }
}

// =====================
// Copiar Senha
// =====================

function copiarSenha() {
    if (campoSenha.value === "") return;

    navigator.clipboard.writeText(campoSenha.value);

    const textoOriginal = botaoCopiar.innerHTML;
    botaoCopiar.innerHTML = "✅ Copiado!";

    setTimeout(() => {
        botaoCopiar.innerHTML = textoOriginal;
    }, 1200);
}

// =====================
// Inicialização
// =====================

atualizarInputsTamanho();
geraSenha();