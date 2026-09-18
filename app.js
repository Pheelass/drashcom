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

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/client/main.html');
})

const saltRounds = 5;

app.get('/login/:username/:password', async (req, res) => {	
	let ui = {
		"tem paes?":"ent tchaes"
	}
	res.type('text').send("ain bolsonaru");
	let file = './server/users.json'
	const texto = await fs.readFile(file);
	const dados = await JSON.parse(texto, 'utf8');
	let usuario = req.params.username;

	const hash = await bcrypt.hash( req.params.password, saltRounds )

	dados.push({
		nome: usuario, 
		senha: hash
	});

	console.log(dados)

	await fs.writeFile(file, JSON.stringify(dados, null, 2))	
});

app.listen('8000', '127.0.0.1', () => {
	console.log('listening on http://localhost:8000')
})

