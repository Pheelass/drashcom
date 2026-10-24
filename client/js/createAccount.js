console.log("login JS Working");

const codeMessageStatus = {
	201: "caixas vazias",
	301: "senha/nome muito curto"
}
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
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
	

	let requestLogin = await fetch(`/signup`, { 
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
	if (status === 401) {
		alert("senha/nome incorreta");
	};

	if (status === 201) {
		alert("usuario cadastrado");
	};


})

function verify(nome, senha)
{
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