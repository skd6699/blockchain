const Transaction = require('./transaction.js');
const Wallet = require('./index.js');

describe('Transaction',()=>{
    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 5000;
        recipient = 'r3c1p13jnt';
        transaction = Transaction.newTransaction(wallet,recipient, amount);
    });

    // it('outputs the amount subtracted from wallet balance',()=>{
    //     console.log(transaction.outputs);
    //     expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    // });
    // it( 'outputs the amount added from wallet balance', () => {
    //     expect( transaction.outputs.find( output => output.address === recipient ).amount ).toEqual( amount );
    // } );
    it('exceed baalnce',()=>{
        expect(transaction).toEqual(undefined);
    });
});