# flatbucket
A simple file system directory flattener. Creates a bucket directory which is filled with symlinks to all the files in a given directory and its subdirectories.

include as a module:
```
$ npm install --save flatbucket
```
```
flatbucket = require('flatbucket');

flatbucket('source_path','bucket_path');
```

run from command line
```
$ flatbucket /home/peter/wallpaper /home/peter/wallpaperbucket

C:> flatbucket c:\users\peter\music c:\musicbucket
```
