const fs = require('fs');

const loadDb = () => {
    const raw = fs.readFileSync('db.json');
    return JSON.parse(raw);
    console.log("test");
}

const saveDb = (data) => {
     fs.writeFileSync('db.json', JSON.stringify(data, null, 2))
}

const addRecord = (username, name, surname) => {
    const db = loadDb();
    const data = {username, name, surname};
    db.users.push(data);
    saveDb(db);
    return data
}

const findUserByUsername = (username) => {
    const db = loadDb();
    return db.users.find((element)=> element.username === username );
}

const findUserByName = (tocoprzychodzidofunkcji) => {
    const db = loadDb();
    return db.users.find((element)=> element.name === tocoprzychodzidofunkcji );
}

module.exports = {loadDb, saveDb, addRecord, findUserByName, findUserByUsername}

// addRecord("usertestowy", "Michał", "Sperma")


