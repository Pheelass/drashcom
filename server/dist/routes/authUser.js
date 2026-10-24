import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const minhaRota = (req, res) => {
    console.log("requisicao recebida");
    console.log(req.method);
    console.log(req.originalUrl);
    res.type('text').end('ola mundo');
};
router.post('/', minhaRota);
export default router;
