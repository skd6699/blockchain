const TransactionPool = require('./transaction-pool.js');
const Transaction = require('./transaction.js');
const Wallet = require('./index.js');

describe('Transaction Pool',()=>{
    let tp, wallet, transaction;

    beforeEach(()=>{
        tp = new TransactionPool();
        wallet = new Wallet();
        // transaction = Transaction.newTransaction(wallet,'recipient',30);
        // tp.updateOrAddTransaction(transaction);
        transaction = wallet.createTransaction('recipient',30,tp);
    });

    it('adds transaction to pool',()=>{
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool',() => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-address', 40);
        tp.updateOrAddTransaction(newTransaction);
        expect(JSON.stringify(tp.transactions.find(t=> t.id === transaction.id))).not.toEqual(oldTransaction);
    });

    it('it clears pool',()=>{
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });

    describe('mixing valid and corrupt transactions',()=>{
        let validTransactions;

        beforeEach(()=>{
            validTransactions = [...tp.transactions];
            for(let i = 0; i < 6; i++){
                wallet = new Wallet();
                transaction = wallet.createTransaction('recipient',30,tp);
                if(i%2==0){
                    transaction.input.amount = 9999;
                }else{
                    validTransactions.push(transaction);
                }
            }
        });

        it('shows a diff between valid and corrupt transactions',()=>{
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('grabs valid transactions',()=>{
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });
});