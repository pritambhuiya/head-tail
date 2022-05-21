**TODO**

- [ ] Report error if maxLine and maxBytes both are given or get 0 as value
- [ ] Investigate head
- [ ] Display file name if more than one files are given
- [ ] Implement multiple files

**MAYBE**
- [ ] Consider richer structure for headMain

**DONE**

- [x] Test readFileSync
- [x] Call head function of headLib.js from head.js
- [x] Moved test of headMain function in testHeadMain.js
- [x] Accept file
- [x] Implement multiple fileContents
- [x] Consider tests for head function in a seperate file
- [x] Consider change of internal contracts for parseArgs, head & firstNElements
- [x] Make head work for only contents not file
- [x] Refactor parseArgs
- [x] Consider parseArgs function in a seperate file
- [x] Consider testParseArgs function in a seperate file
- [x] Second option will override first option
- [x] Implement ~~validateOption~~ setDefault function
- [x] Make default lines as 10
- [x] Consider rernaming maxLines & maxBytes to lines & bytes
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
