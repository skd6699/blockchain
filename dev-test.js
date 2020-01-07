const Block = require('./block');
// const block = new Block('foo', 'bar', 'zoo', 'baz');//instance of bllock class
const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toString());
// console.log(block.toString());
// console.log(Block.genesis().toString());