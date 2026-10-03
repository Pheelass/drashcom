import express from 'express';
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'main.html'));
});

const saltRounds = 5;

// cadastro
app.post('/signup', async (req, res) => {
    // essa sessão ainda está vazia e só sera feita caso: 
    //      # []    POST /login deve ser melhorada e aperfeicoada
    //      # []    Ter dependencias ajustadas, docker configurado devidamente 
    //      # []    Ter 100% Typescript integrado funcionando
})


// login do usuario
app.post('/login', async (req, res) => {
    const file = `${__dirname}/server/users.json`;

    try {
    	type Usuario = {
    		nome: string;
    		senha: string;
    	}
        const texto = await fs.readFile(file, 'utf8');
        const dados: Usuario[] = JSON.parse(texto);
        const usuario = req.body.user.name;
        const _usuario = dados.find((ctx) => ctx.nome === usuario);

        console.log('usuario encontrado?: ' + Boolean(_usuario));

        if (!_usuario) {
            res
                .status(401)
                .type('text')
                .send('email/senha incorretos');
            return;
        }

        const senhaCorreta = await bcrypt.compare(req.body.user.psw, _usuario.senha); // deu erro
        
        if (senhaCorreta) {
            res
                .status(200)
                .type('text')
                .send('welcome!');
            console.log('ACESSO PERMITIDO: Usuario entrou');
            return

        } else if(!senhaCorreta) {
            res
            .status(401)
            .type('text')
            .send('naninanao!');
            console.log('email/senha incorretos');
            return
        }

    // if err on try
    } catch(err){
    	console.error(err)
        res.status(500).type('text').send('something went wrong on server')
    }
    
});
app.listen(8000, '0.0.0.0', () => {
    console.log('listening on http://0.0.0.0:8000');
});
