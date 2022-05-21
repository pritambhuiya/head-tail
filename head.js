// console.log('usage: head [-n lines | -c bytes] [file ...]');

const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  console.log(headMain(fs.readFileSync, ...process.argv.slice(2)));
};

main();
