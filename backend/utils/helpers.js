const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname,'..',  'data/db.json');

const readData = () => {
    const json = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(json);
}

const writeData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}


module.exports = {readData, writeData}