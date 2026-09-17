import express from 'express';
import fs from 'node:fs/promises'
const app = express();
import { fileURLToPath } from "node:url";
import path from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + '/client/')))
// servindo arquivos estáticos com express, o mime type não deveria
// ser um problema aqui. 

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/client/main.html');
})

app.get('/login/:username/:password', async (req, res) => {	
	let ui = {
		"tem paes?":"ent tchaes"
	}
	res.type('text').send("ain bolsonaru")
});

app.listen('8000', '127.0.0.1', () => {
	console.log('listening on http://localhost:8000')
})