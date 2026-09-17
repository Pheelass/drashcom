const headerLoginIcon = document.getElementById("imgFromNav2");
const headerLogin = document.getElementById("aFromnav2");

headerLogin.addEventListener("pointerover", () => {
	headerLoginIcon.src = './content/user-icon[touched].svg'
});

headerLogin.addEventListener("pointerleave", () => {
	headerLoginIcon.src = './content/user-icon.svg'
})