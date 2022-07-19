const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://PawsOriginator:p24kmwEJIQUulYMJ@cluster0.da8dy.mongodb.net/?retryWrites=true&w=majority"


MongoClient.connect(connectionString)
.then(client => {
    console.log('connected to db')
    const db = client.db('Pet-Info-Database');
    const infoCollection = db.collection('Pet-Data');

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    
    app.get('/getPetNames', (req, res) => {
        infoCollection.find({petName: {$exists: true}}).toArray()
        .then(results => {
            console.log(results)
            res.json(results)
        })
        .catch(error => console.error(error))
    })

})
.catch(error => console.error(error))


app.listen(PORT, () => console.log(`Connected to port at ${PORT}`));