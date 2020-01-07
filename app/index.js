const express = require('express');
const Blockchain = require('../blockchain/index');
const bodyParser = require( 'body-parser' );
///what port  
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use( bodyParser.urlencoded( { extended: true } ) );
const bc = new Blockchain();
//first endpoint for api
app.get('/blocks',function(req,res){
    res.send({chain:bc.chain});  
});

app.listen(HTTP_PORT, function(){
    console.log(`Listening on port ${HTTP_PORT}`);
});