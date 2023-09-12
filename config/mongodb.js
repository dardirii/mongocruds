const { MongoClient } = require('mongodb');

const url = 'mongodb://master:123@localhost:27017?authSource=admin';
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
    console.log('Connected !')
    }catch(e){
        console.log(e)
    }
})();

const db = client.db('edu-native');

module.exports = db;
