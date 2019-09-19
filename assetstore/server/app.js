var express = require('express')
const app = express()

var checklogin = require('./routers/checklogin')
app.use('/checklogin', checklogin)

app.get('/',function(req, res){
    res.send("success")
})

app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})