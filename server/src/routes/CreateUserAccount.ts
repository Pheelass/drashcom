import Database from 'better-sqlite3';
import express, { Router, type RequestHandler } from 'express'
const router = express.Router();

let identifyUser: RequestHandler = (req, res) => {
    console.log('user-create received!')
    console.log(req.method)
    console.log(req.originalUrl)
}

router.post('/', identifyUser)

const db = new Database('foobar.db', {
    readonly: false,
    fileMustExist: false,
    timeout: 2000,
    verbose: console.log
});

db.pragma('journal_mode = WAL');
db.exec(`
	CREATE TABLE IF NOT EXISTS users (
	name TEXT NOT NULL,
	age INTEGER NOT NULL
	)
`);

const insert = db.prepare(`
	INSERT INTO users (username, password) 
	VALUES (?, ?)
`);

const insertMany = db.transaction((cats) => {
    for (const cat of cats) {
        insert.run(cat.name, cat.age);
    }
});

insertMany([
    { name: 'joey', age: 2 },
    { name: 'gigamoon', age: 5 }
]);
