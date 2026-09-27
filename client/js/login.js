console.log("login JS Working");

const codeMessageStatus = {
	201: "BAD REQUEST: Caixa(s) vazia(s) detectada(s)",
	301: "TOO LONG: senha/login muito curto"
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

	let requestLogin = await fetch(`/login`, { 
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				name: nome,
				psw: senha
			}
		})
	});

	let status = requestLogin.status
	if (status === 401){
		alert("senha/nome incorreta");
	};
	if (status === 200){
		alert("logado com sucesso");
	};
	if (status === 201){
		alert("usuario cadastrado");
	};
	if (status === 404){
		alert("usuario nao achado");
	};
})

function verify(nome, senha){
	let nomeCtx = nome.trim();
	let senhaCtx = senha.trim();

	if(!nomeCtx || !senhaCtx){
		return { status: false, code: 201 };
	}
	
	if(nomeCtx.length < 3 || senhaCtx.length < 5){
		return { status: false, code: 301 };
	}
	return { status: true, code: 400 }
}