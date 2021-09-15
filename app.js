const Express = require("express")
const BodyParser = require("body-parser")
const Book = require('./routes/book')
const app = Express()
const cors = require('cors')


app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))

app.use(cors())
app.use('/',Book)

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// const port = 10888
// const port = process.env.PORT || 8080

// app.listen(process.env.port || 80, () => {
//     console.log('Server is up and running on port number')
// })


