`head [-n lines | -c bytes] [file ...]`

```
head -n file1, file2, ...
  Specify number of lines from top using -n option. 
  Default line number is 10 (head file1, file2, ...). 

head -c file1, file2, ...
  Specify number of bytes from starting of line.
```

`usage: tail [-c # | -n #] [file ...]`

```
tail -n num/ -n-num file1, file2, ...
  Specify number of lines from end using -n option. 
  Default line number is 10 (tail file1, file2, ...). 

tail -n+num file1, file2, ...
  Specify number of lines from top & given line to end using -n option.

tail -c num / -c-num file1, file2, ...
  Specify number of bytes from ending of line.

tail -c+num file1, file2, ...
  Specify number of bytes from top & given bytes to end using -c option.
```
