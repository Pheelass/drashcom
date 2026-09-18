const headerLoginIcon = document.getElementById("imgFromNav2");
const headerLogin = document.getElementById("aFromnav2");
const WarningFeature = document.querySelector(".WARNING_feature");
const closeParent1 = document.querySelector('#closeParent');

console.log(closeParent1 + '\n' + WarningFeature)

closeParent1.addEventListener('click', () => {
	WarningFeature.style.display = "none"
})

headerLogin.addEventListener("pointerover", () => {
	headerLoginIcon.src = './content/user-icon[touched].svg'
});

headerLogin.addEventListener("pointerleave", () => {
	headerLoginIcon.src = './content/user-icon.svg'
})

