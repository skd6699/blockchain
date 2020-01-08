const Blockchain = require('./blockchain');

const bc = new Blockchain();

//add 10 new blocks to chain
for(let i = 0; i < 10; i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
}