// #imports #initials-imports
import express, { type Request, type Response, type NextFunction } from 'express';              // express
import * as fs from 'node:fs/promises';     //  fs readdir
import { fileURLToPath } from 'node:url';   // to get __dirname
import path from 'node:path';               // sendFiling

// #routers, #routings, #middlewares
import router from './routes/authUser.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', '..', 'client')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'main.html'));
});
// cadastro
app.use("/login", router);

// login do usuario
app.listen(8000, '0.0.0.0', () => {
    console.log('listening on http://0.0.0.0:8000');
});
// 19 de out.