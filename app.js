const Express = require("express")
const BodyParser = require("body-parser")
const Book = require('./routes/book')
const app = Express()
const cors = require('cors')

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))

app.use(cors())
app.use('/',Book)

const port = 10888

app.listen(process.env.port ||port, () => {
    console.log('Server is up and running on port number')
})