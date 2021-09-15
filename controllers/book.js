const { resolve } = require("path")
const { rejects } = require("assert")

const MongoClient = require("mongodb").MongoClient

const CONNECTION_URL = "mongodb+srv://miko:Miko@123@cluster0.ipinr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const DATABASE_NAME = "bookstore"

var database, collection

module.exports = class Book{
    collectionConnect() {
        return new Promise( (resolve, reject) => {
            MongoClient.connect(CONNECTION_URL, {useUnitfiedTopology: true}, (error, client)=> {
                if(error) { reject(new Error(error)) }
                database = client.db(DATABASE_NAME)
                collection = database.collection("books")
                
            })
            resolve(console.log('Connect to database'))

        })
        

        

    }

    test(req, res) {
        res.send({"status": 200, "Description": "Test"})
    }

    allBook(req, res) {
        console.log('Someone request all books')
        collection.find().toArray((err, docs) => {
            if(err){
                res.status(500).send({"status": 500, "description": err})
            }
            res.send(docs)
        })
    }

    bookOne(req, res) {
        console.log(`Someone make query ${req.query.keyword}`)

        collection.find({"title": {$regex: req.query.keyword}}).toArray(function(err, docs) {
            if(err) {
                res.status(500).send({"status":500, "description":err})
            }

            res.send(docs)

        })

    }

    newBook(req, res) {
        console.log(req.body)
        collection.insertOne(req.body,(err) => {
            if(err) {
                res.status(500).send({'status': 500, 'description': err})
            }
            res.status(201).send({'status': 201, 'description': 'data updatae successfully'})
        })
    }

    deleteBook(req, res) {
        console.log('someone delete books')
        collection.deleteMany({}), ((err, docs) => {
            if(err) {
                res.status(500).send({"status": 500, "description":err})
            }
            res.send(docs)
        })
    }

    deleteOneBook(req, res) {
        console.log('someone delete one book')
        collection.deleteOne({ title:'test2'}), ((err, docs) => {
            if(err) {
                res.status(500).send({"status": 500, "description":err})
            }
            res.send(docs)
        })
    }

    updateBook(req, res) {
        collection.findOneAndUpdate({isbn: req.body.isbn},
            {$set: req.body},
            {},
            function(err) {
                if(err) {
                    res.status(500).send({"status": 500, "description": err})
                }

                res.status(201).send({"status": 201, "description": "Data update successfully"})


            }
        )    
    }

    updateMultiBook(req, res) {
        collection.updateMany({isbn: req.body.isbn},
            {$set: req.body},
            {},
            function(err) {
                if(err) {
                    res.status(500).send({"status": 500, "description": err})
                }

                res.status(201).send({"status": 201, "description": "Data update successfully"})
            
            }
            
            )
    } 

}