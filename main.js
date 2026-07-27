const campoSenha = document.querySelector("#campo-senha");
const numeroSenha = document.querySelector(".parametro-senha__texto");

const botaoDiminuir = document.querySelectorAll(".parametro-senha__botao")[0];
const botaoAumentar = document.querySelectorAll(".parametro-senha__botao")[1];

const chkMaiusculo = document.querySelector("#maiusculo");
const chkMinusculo = document.querySelector("#minusculo");
const chkNumero = document.querySelector("#numero");
const chkSimbolo = document.querySelector("#simbolo");

const barra = document.querySelector("#nivel-forca");
const tempo = document.querySelector("#tempo-forca");

const botaoCopiar = document.querySelector("#copiar");

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

// =====================
// Eventos
// =====================

botaoDiminuir.addEventListener("click", diminuir);

botaoAumentar.addEventListener("click", aumentar);

chkMaiusculo.addEventListener("change", geraSenha);
chkMinusculo.addEventListener("change", geraSenha);
chkNumero.addEventListener("change", geraSenha);
chkSimbolo.addEventListener("change", geraSenha);

botaoCopiar.addEventListener("click", copiarSenha);

// =====================
// Tamanho
// =====================

function diminuir() {

    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }

}

function aumentar() {

    if (tamanhoSenha < 64) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }

}

// =====================
// Gerar senha
// =====================

function geraSenha() {

    let caracteres = "";

    if (chkMaiusculo.checked)
        caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (chkMinusculo.checked)
        caracteres += "abcdefghijklmnopqrstuvwxyz";

    if (chkNumero.checked)
        caracteres += "0123456789";

    if (chkSimbolo.checked)
        caracteres += "!@#$%&*()_-+=?<>";

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
// Barra de força
// =====================

function atualizarForca(base) {

    if (base === 0) {

        barra.style.width = "0%";
        barra.style.background = "#ff4d4d";

        tempo.textContent = "Selecione pelo menos um tipo de caractere.";

        return;
    }

    const entropia = tamanhoSenha * Math.log2(base);

    if (entropia < 40) {

        barra.style.width = "30%";
        barra.style.background = "#FF4D4D";

        tempo.textContent =
            "Senha fraca. Pode ser descoberta em poucos minutos.";

    }

    else if (entropia < 60) {

        barra.style.width = "60%";
        barra.style.background = "#FFD43B";

        tempo.textContent =
            "Senha média. Pode levar alguns anos para ser descoberta.";

    }

    else if (entropia < 80) {

        barra.style.width = "80%";
        barra.style.background = "#7ED957";

        tempo.textContent =
            "Senha forte. Pode levar milhares de anos para ser descoberta.";

    }

    else {

        barra.style.width = "100%";
        barra.style.background = "#00D26A";

        tempo.textContent =
            "Senha extremamente forte. Um computador levaria milhões de anos para descobri-la.";

    }

}

// =====================
// Copiar senha
// =====================

function copiarSenha() {

    if (campoSenha.value === "") return;

    navigator.clipboard.writeText(campoSenha.value);

    const textoOriginal = botaoCopiar.textContent;

    botaoCopiar.textContent = "✓";

    setTimeout(() => {

        botaoCopiar.textContent = textoOriginal;

    }, 1200);

}

// =====================
// Inicialização
// =====================

geraSenha();