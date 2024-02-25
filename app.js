const ENCRYPT_DICT = {a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat"};
const DECRYPT_DICT = {ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u"};

function encriptar(texto) {
    let encriptado = "";
    let letras = texto.split("");

    for (let i = 0; i < letras.length; i++) {
        if(ENCRYPT_DICT[letras[i]] === undefined) {
            encriptado += letras[i];
        } else {
            encriptado += ENCRYPT_DICT[letras[i]];
        }
    }
    return encriptado;
}

function desencriptar(encriptado) {
    for (let clave in DECRYPT_DICT) {
        let valor = DECRYPT_DICT[clave];
        encriptado = encriptado.replaceAll(clave, valor);
    }
    return encriptado;
}

function handleKeyPress(event) {
    let keyCode = event.keyCode  || event.which;

    if ((keyCode >= 97 && keyCode <= 122) || keyCode === 0 || 
        (keyCode >= 32 && keyCode <= 63) || keyCode === 168 || keyCode === 13) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function changeCardOutput() {    
    let noticeDiv = document.getElementById("notice");
    let resultDiv = document.getElementById("result");
    noticeDiv.setAttribute("hidden", true);
    resultDiv.removeAttribute("hidden");
}

function updateCardOutput(text, processFunc) {
    let processedText = processFunc(text);
    changeCardOutput();
    document.getElementById("salida").value = processedText;
    
    if(window.innerWidth <= 820) {
        let textArea = document.getElementById("salida");
        textArea.style.height = "auto";        
        textArea.style.height = textArea.scrollHeight + "px";
    }
}

function onEncriptar() {
    let texto = document.getElementById("entrada").value;
    updateCardOutput(texto, encriptar);
}

function onDesencriptar() {
    let texto = document.getElementById("entrada").value;
    updateCardOutput(texto, desencriptar);
}

function onCopyText() {
    let text = document.getElementById("salida").value;
    navigator.clipboard.writeText(text);
    document.getElementById("entrada").value = "";
    alert("Texto copiado al portapapeles");
}