**TODO**

- [ ] Refactor  parseArgs
- [ ] Implement validateOption function
- [ ] Make head work for only contents not file
- [ ] Make default lines as 10
- [ ] Second option will override first option
- [ ] Report error if maxLine and maxBytes both are given or get 0 as value
- [ ] Investigate head
- [ ] Call head function of headLib.js from head.js

**MAYBE**
- [ ] Consider tests for head function in a seperate file
- [ ] Consider richer structure for headMain

**DONE**

- [x] extract areBothValueSet
- [x] Refactor firstNelements, head
- [x] Consider renaming head & headMain
- [x] Write parseArgs function
- [x] Write headMain function
- [x] Write test for parseArgs
- [x] Write test for headMain
- [x] Write test for contentsUpto
- [x] Write test for getDelimiter
- [x] Extract common function
  - [x] BytesUpto & linesUpto are almost same
  - [x] SplitCharacters & splitLines are almost same
  - [x] JoinCharacters & joinLines are almost same
- [x] Extract bytesUpto function
- [x] ~~Write test for BytesUpto function~~
- [x] Implement head for 1 byte
- [x] Implement head for multiple bytes
- [x] ~~Write test for linesUpto function~~
- [x] Extract linesUpto function
- [x] Consider data structure for options
- [x] ~~Extract splitLines & joinLines function~~
- [x] Implement maxLines option in head function
- [x] Implement head for multiple lines
- [x] Implement head for 1 line
- [x] Implement head for multiple lines
- [x] Rename testHead.js to testHeadLib.js
- [x] Create headLib.js in src/
- [x] Move head.js back to root
- [x] ~~Move head.js into src/~~
- [x] Make first test case pass
- [x] Write a test case/expectation
- [x] Create testHead.js
- [x] Verify mocha exists
- [x] Create directory structure


