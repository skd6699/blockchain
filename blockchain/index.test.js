const Blockchain = require('../blockchain');
const Block = require('./block');
describe('Blockchain', ()=>{
    let bc, bc2;
    beforeEach(()=>{
        bc = new Blockchain();3
        bc2 = new Blockchain();
    });

    it('start with genesis block', ()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', ()=>{
        const data ='foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates a vaid chain', ()=>{
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)).toBe(true); 
    });

    it('invalidates a chain with corrupt genesis block', ()=> {
        bc2.chain[0].data = 'Bad Data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    }); 

    it( 'invalidates a chain with corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';
        expect( bc.isValidChain( bc2.chain ) ).toBe( false );
    } );

    it('checks replaces chain with valid chain',()=>{
        bc2.addBlock('something');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('doesnt replace chain with one of less than or equal to length',()=>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });
});