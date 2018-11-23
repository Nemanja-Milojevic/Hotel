//npm init --yes
//npm install express body-parser --save
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const cors = require('cors') //npm install cors --save
const history = require('connect-history-api-fallback')

const staticFileMiddleware = express.static(path.join(__dirname, '../dist/ngApp'))

const api = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', api)

//----------------------------------------------------------------
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});