import express from 'express';
import * as fs from 'node:fs/promises'
const app = express();
import { fileURLToPath } from "node:url";
import path from "node:path";
import bcrypt from "bcrypt"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + '/client/')))
// servindo arquivos estáticos com express, o mime type não deveria
// ser um problema aqui. 

app.use(express.json())

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/client/main.html');
})

const saltRounds = 5;

// cadastro
app.post('/login/:username/:password', async (req, res) => {	
	let ui = {
		"tem paes?":"ent tchaes"
	}

	let file = './server/users.json'
	const texto = await fs.readFile(file);
	const dados = await JSON.parse(texto, 'utf8');
	let usuario = req.params.username;
	let senha = req.params.password;

	let usuarioExistente = await dados.find( ctx => ctx.nome === usuario );
	console.log(usuarioExistente)


	if(!usuarioExistente){ 																// se o <usuario:nome> NAO existe
		console.error('> Usuario Inexistente');

	} else { 																			// se o <usuario:nome> existe
		console.log('> O usuario existe');

		let ctxx = bcrypt.compareSync(senha, usuarioExistente.senha, function(err, result) {
		})

		if (ctxx){
			res.status(200).type('text').send('welcome!');
			console.log('ACESSO PERMITIDO: Usuario entrou')
			return 
		} else if(!ctxx){
			res.status(401).type('text').send('naninanao!');
			console.log('ACESSO NEGADO: senha/nome incorreto')
			return
		}

		res.status(201).type('text').send('usuario criado!')
		return
	}

	const hash = await bcrypt.hash( req.params.password, saltRounds )


	dados.push({ nome: usuario, senha: hash });


	await fs.writeFile(file, JSON.stringify(dados, null, 2))
	res.status(201).type('text').send('usercreated')
});

app.listen('8000', '0.0.0.0', () => {
	console.log('listening on http://0.0.0.0:8000')
})