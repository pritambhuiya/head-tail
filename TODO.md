 > # TAIL

- **TODO**
  - [ ] Implement multiple fileContents
  - [ ] Work on fileContents instead of files
  - [ ] Implement -r option
  - [ ] Implement -q option
  - [ ] Implement default option -n with 10 
  - [ ] Investigate tail

- **MAYBE**
  - [ ] Consider renaming from variable
  - [ ] Consider keeping head & tail files together

- **DONE**
  - [x] Extract decideIndex
  - [x] Extract decideStrategy
  - [x] Extract formatNumber
  - [x] Decide job based on value 
  - [x] Implement `bytes` option
  - [x] Implement `lines` option
  - [x] Extract tailMain
  - [x] Require split & join from head
  - [x] Implement tail for multiple lines
  - [x] Implement tail for 1 line
  - [x] Make a test case pass
  - [x] Write a test case/expectation
  - [x] Create tailLib.js in src/tail
  - [x] Create testTailLib.js in test/tail
  - [x] Create directory structure
<hr>

<br/>

> # HEAD

- **TODO**
  - [ ] Refactor parseArgs 
  - [ ] Refactor headLib 
  - [ ] Handle only number instead of option
  - [ ] Add functionality to show contents also if error found while reading file.
  - [ ] Show show contents & error(if found)

- **MAYBE**

- **DONE**

- [x] Investigate head
- [x] Should work for -optionValue & -option Value
- [x] Consider moving helper functions into helpers.js
- [x] Report error if unable to read file
- [x] Report error if maxLine and maxBytes both are given
- [x] Report error if get 0 as value
- [x] Consider richer structure for headMain
- [x] Display file name if more than one files are given
- [x] Implement multiple files
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
