const Wallet = require('./index.js');
const TransactionPool = require('./transaction-pool.js');

describe('Wallet',()=>{
    let wallet, tp;

    beforeEach(()=>{
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('create Transaction',()=>{
        let transaction, sendAmount, recipient;

        beforeEach(()=>{
            sendAmount = 50;
            recipient = 'random address';
            transaction = wallet.createTransaction(recipient, sendAmount, tp); 
        });

        describe('and doing the same transaction',()=>{
            beforeEach(()=>{
                wallet.createTransaction(recipient,sendAmount,tp);
            });

            it('doubles the `sendAmount` subtracted',()=>{
                expect(transaction.outputs.find(output=>output.address === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2);
            });

            it('clones the`sendAmount` output for recipient',()=>{
                expect(transaction.outputs.filter(output=> output.address === recipient).map(output=> output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    });

});

