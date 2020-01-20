const express = require('express');
const bodyParser = require( 'body-parser' );
const Blockchain = require('../blockchain/index');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
///what port  
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use(bodyParser.json());
//first endpoint for api
app.get('/blocks',function(req,res){
    res.json(bc.chain);  
});
app.post('/mine', function(req,res){
    const block = bc.addBlock(req.body.data);
    console.log(`New Block Added: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
});
app.get('/transactions',(req,res)=>{
    res.json(tp.transactions);
});
app.post('/transact',function(req,res){
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});
app.get('/public-key',function(req,res){
    res.json({publicKey: wallet.publicKey});
});

app.listen(HTTP_PORT, function(){
    console.log(`Listening on port ${HTTP_PORT}`);
});
p2pServer.listen();