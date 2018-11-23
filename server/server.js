//npm init --yes
//npm install express body-parser --save
//npm install --save mongoose
const express = require('express')
const bodyParser = require('body-parser')

const api = require('./routes/api')

const app = express()
app.use(bodyParser.json())
app.use('/api', api)

//----------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});