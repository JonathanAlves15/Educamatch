const perfil = document.getElementById("button_perfil");
const ajuda = document.getElementById("button_ajuda");
const home = document.getElementById("button_home");
const chat = document.getElementById("button_chat");

perfil.onclick = () => {
    window.location.href = "perfil.html";
}

ajuda.onclick = () => {
    window.location.href = "ajuda.html";
}

home.onclick = () => {
    window.location.href = "home.html";
}
chat.onclick = () => {
    window.location.href = "chat.html";
}