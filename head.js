// console.log('usage: head [-n lines | -c bytes] [file ...]');

const { headMain } = require('./src/head/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.option === '--help') {
      console.log('usage: head [-n lines | -c bytes] [file ...]');
    }
  }
};

main();
