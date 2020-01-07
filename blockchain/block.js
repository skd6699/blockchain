const SHA256 = require('crypto-js/sha256');  
class Block{
        //special func find unique attr
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;        
    }
//this.lastHash.substring(0, 10)
//substring optional
    toString(){
        return `Block -
            Timestamp   : ${this.timestamp}
            Lasthash    : ${this.lastHash.substring(0, 10)}
            Hash        : ${this.hash.substring(0, 10)}
            Data        : ${this.data}`;
    }

    static genesis() {
        //call without creatng new instance
        return new this('Genesis Time', '----', 'f1r57-h45h', []);
    }
    
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);//hash to be craeted
        //new instance of block itself
        return new this(timestamp,lastHash,hash,data);
    }

    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }
}

module.exports = Block;


