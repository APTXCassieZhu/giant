var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
var users = require('./routers/users')
var checklogin = require('./routers/checklogin')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false}))
app.use('/checklogin', checklogin)
app.use('/users', users)
app.use('/script', express.static(__dirname +'/script'))

app.get('/',function(req, res){
    res.send("success")
})

app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})