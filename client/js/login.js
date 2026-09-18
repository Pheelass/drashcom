console.log("login JS Working");

const codeMessageStatus = {
	201: "BAD REQUEST: Caixa(s) vazia(s) detectada(s)",
	301: "TOO LONG: senha/login muita longa"
}
const createAccountButton = document.getElementById("createAccountButton");

createAccountButton.addEventListener("click", async () => {
	let username = document.getElementById("username");
	let password = document.getElementById("password");
	let nome = username.value;
	let senha = password.value;

	let verification = verify(nome, senha);

	if(!verification.status){
		if(codeMessageStatus[verification.code] !== "undefined"){
			alert(codeMessageStatus[verification.code])
		} else {
			alert(`STRANGE ERROR: ${verification}`)
		}
		return;
	}

	let requestLogin = await fetch(`/login/${nome}/${senha}`).then(res => res.text()).then(texto => console.log(texto));
	console.log(typeof requestLogin)
})

function verify(nome, senha){
	let nomeCtx = nome.trim();
	let senhaCtx = senha.trim();
	if(!nomeCtx || !senhaCtx){
		return { status: false, code: 201 }
	}
	if(nomeCtx.length > 20 || senhaCtx.length > 50){
		return { status: false, code: 301 }
	}
	return { status: true, code: 400 }
}