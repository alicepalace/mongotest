const { MongoClient } = require('mongodb');

let dbConnection

let uri = 'mongodb+srv://bbnewborn:DnbfDhYe5ae9OPDM@cluster0.58dlxkn.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log(err);
                //return cb(err);
                cb(error);
            });
    },
    getDb: () => dbConnection
};
