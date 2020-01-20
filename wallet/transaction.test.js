const Transaction = require('./transaction.js');
const Wallet = require('./index.js');

describe('Transaction',()=>{
    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13jnt';
        transaction = Transaction.newTransaction(wallet,recipient, amount);
    });

    it('outputs the amount subtracted from wallet balance',()=>{
        console.log(transaction.outputs);
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });
    it( 'outputs the amount added from wallet balance', () => {
        expect( transaction.outputs.find( output => output.address === recipient ).amount ).toEqual( amount );
    } );

    it('inputs the balance of the wallet', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance); 
    });

    it('validates a transaction',()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates corrupt transac',()=>{
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });
describe( 'Transaction Exceed', () => {
            let transaction, wallet, recipient, amount;

            beforeEach( () => {
                wallet = new Wallet();
                amount = 5000;
                recipient = 'r3c1p13jnt';
                transaction = Transaction.newTransaction( wallet, recipient, amount );
            } );
            it( 'exceed baalnce', () => {
                expect( transaction ).toEqual( undefined );
            } );
});
describe( 'and updating a transaction', () => {
    let nextAmount, nextRecipient;

    beforeEach( () => {
        nextAmount = 20;
        nextRecipient = 'n3xt-4ddr355';
        transaction = transaction.update( wallet, nextRecipient, nextAmount );
    } );

    it( `subtracts the next amount from the sender's output`, () => {
        expect( transaction.outputs.find( output => output.address === wallet.publicKey ).amount )
            .toEqual( wallet.balance - amount - nextAmount );
    } );

    it( 'outputs an amount for the next recipient', () => {
        expect( transaction.outputs.find( output => output.address === nextRecipient ).amount )
            .toEqual( nextAmount );
    } );
} );
} );