console.log("login JS Working");

const codeMessageStatus = {
	201: "BAD REQUEST: Caixa(s) vazia(s) detectada(s)",
}
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
	let username = document.getElementById("username");
	let password = document.getElementById("password");
	let _nome = username.value;
	let _senha = password.value;
	let nome = _nome.trim();
	let senha = _senha.trim();
	console.log(nome, senha)

	if ( !nome || !senha ) {
		alert('valor inválido - caixas vazias');
		return
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
	if (status === 500){
		alert("algo aconteceu");
	};
})