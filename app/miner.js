class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTransactions = this.transactionPool.validTransactions();
        //include reward for a miner
        //create block consisting of valid transactions
        const block = this.blockchain.addBlock(validTransactions);
        //sync chains 
        this.p2pServer.syncChains();
        //clear transaction pool 
        this.transactionPool.clear();
        //broadcast to every miner to clear their transaction pools
        this.p2pServer.broadcastClearTransaction();

        return block;

    }
}

module.exports = Miner;