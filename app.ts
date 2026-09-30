import express, { type Request, type Response } from 'express';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import bcrypt from 'bcrypt';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'client', 'main.html'));
});

const saltRounds = 5;

interface Usuario {
	nome: string;
	senha: string;
}

interface LoginBody {
	user: {
		name: string;
		psw: string;
	};
}

// cadastro
app.post('/login', async (req: Request<{}, {}, LoginBody>, res: Response) => {
	const file = './server/users.json';

	try {
		const texto = await fs.readFile(file, 'utf8');
		const dados: Usuario[] = JSON.parse(texto);

		const usuario = req.body.user.name;

		const usuarioExistente = dados.find(
			(ctx: Usuario) => ctx.nome === usuario
		);

		console.log('usuario encontrado?: ' + Boolean(usuarioExistente));

		if (!usuarioExistente) {
			console.error('> Usuario Inexistente');

			res
				.status(404)
				.type('text')
				.send('usuário não encontrado');

			return;
		}

		console.log('> O usuario existe');

		const senhaCorreta = await bcrypt.compare(
			req.body.user.psw,
			usuarioExistente.senha
		);

		if (senhaCorreta) {
			res
				.status(200)
				.type('text')
				.send('welcome!');

			console.log('ACESSO PERMITIDO: Usuario entrou');
			return;
		}

		res
			.status(401)
			.type('text')
			.send('naninanao!');

		console.log('ACESSO NEGADO: senha/nome incorreto');
	}finally{};

	/*
	===== for hashing passwords

	const hash = await bcrypt.hash(
		req.body.user.psw,
		saltRounds
	);

	dados.push({
		nome: usuario,
		senha: hash
	});

	await fs.writeFile(
		file,
		JSON.stringify(dados, null, 2)
	);

	res.status(201).type('text').send('usercreated');
	*/
});

app.listen(8000, '0.0.0.0', () => {
	console.log('listening on http://0.0.0.0:8000');
});