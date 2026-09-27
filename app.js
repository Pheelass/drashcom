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
app.use(express.urlencoded());

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/client/main.html');
})

const saltRounds = 5;

// cadastro
app.post('/login', async (req, res) => {
	let file = './server/users.json'
	const texto = await fs.readFile(file);
	const dados = await JSON.parse(texto, 'utf8');
	let usuario = req.body.user.name;

	let usuarioExistente = await dados.find( ctx => ctx.nome === usuario );
	console.log('usuario encontrado?: ' + Boolean(usuarioExistente))


	if(!usuarioExistente){										
		console.error('> Usuario Inexistente');
		res.status(404).type('text').send('usuário não encontrado')

	} else { 																			
		console.log('> O usuario existe');

		let ctxx = bcrypt.compareSync(req.body.user.psw, usuarioExistente.senha)

		if (ctxx){
			res.status(200).type('text').send('welcome!');
			console.log('ACESSO PERMITIDO: Usuario entrou')
			return 
		} else if(!ctxx){
			res.status(401).type('text').send('naninanao!');
			console.log('ACESSO NEGADO: senha/nome incorreto')
			return
		}

	}

	/* ===== for hashing passwords
	const hash = await bcrypt.hash( req.body.user.psw, saltRounds )


	dados.push({ nome: usuario, senha: hash });


	await fs.writeFile(file, JSON.stringify(dados, null, 2))
	res.status(201).type('text').send('usercreated')
	*/
});

app.listen('8000', '0.0.0.0', () => {
	console.log('listening on http://0.0.0.0:8000')
})