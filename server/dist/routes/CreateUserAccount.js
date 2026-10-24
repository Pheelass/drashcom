import Database from 'better-sqlite3';
const db = new Database('foobar.db', {
    readonly: false,
    fileMustExist: false,
    timeout: 2000,
    verbose: console.log
});
db.pragma('journal_mode = WAL');
db.exec(`
	CREATE TABLE IF NOT EXISTS cats (
	name TEXT NOT NULL,
	age INTEGER NOT NULL
	)
`);
const insert = db.prepare(`
	INSERT INTO cats (name, age) 
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
