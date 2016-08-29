# flatten-dir
A simple utility to flatten subdirectories into one master directory.
Creates a bucket directory which is filled with symlinks to all the files
in a given directory and its subdirectories.

include as a module:
```shell
$ npm install --save flatten-dir
```
```javascript
flatten = require('flatten-dir');

flatten('source_path','bucket_path');
```

run from command line
```shell
$ flatten /home/peter/wallpaper /home/peter/wallpaperbucket
```

change its behavior:
```javascript
ignorelist = ['vertical', 'anime'];

flatten('source', 'dest', ignorelist)
// only buckets files/dirs whose names are not in the ignorelist

```

the same can be achieved when running on command line
```shell

$ flatten src dest --ignore ".*, *.tmp, temp"

```

ignorelists and whitelists can be saved to (newline delimited) config files .bucketignore and .bucketaccept 
