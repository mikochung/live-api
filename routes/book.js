const route = require('express').Router()
const {validate, ValidateError} = require('express-json-validator')
const Book = require('../controllers/book')
const Handler_Book = new Book()
const bookSchema = require('../models/book').bookSchema

Handler_Book.collectionConnect().then( ()=> {
    route.get('/test' , (req, res) => {
        //res.send({"status": 200, "Description": "Test"})
        Handler_Book.test(req, res) //call test method
    })
    
    route.get('/book', (req, res) => {
        Handler_Book.allBook(req, res)
    })
    
    route.get('/bookrecord', (req, res) => {
        Handler_Book.bookOne(req, res)
    })
    
    route.put('/update', (req, res) => {
        Handler_Book.updateBook(req, res)
    })

    route.put('/updatemulti', (req, res) => {
        Handler_Book.updateMultiBook(req, res)
    })
    
    route.post('/create', (req, res) => {
        Handler_Book.newBook(req, res)
    })

    route.delete('/delete', (req, res) => {
        Handler_Book.deleteBook(req, res)
    })

    route.delete('/deleteone', (req, res) => {
        Handler_Book.deleteOneBook(req, res)
    })

    route.use((err, req, res, next) => {
        if(err) {            
            //if(err instanceof ValidateError) {                
                res.status(422).send({'status':422, 'description':err.message})
            //else {
                //console.log('unknown error')
            //}
        } else {
            next()
        }
    })
}).catch(
    err=>console.error('Error')
)

module.exports = route