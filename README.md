# flatten-dir (almost!)
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

C:> flatten c:\users\peter\music G:\musicbucket --duplicate
```

change its behavior:
```javascript
ignorelist = ['vertical', 'anime'];

function myaccept (string) {
	filext = sting.slice(-4);
	if (filext === '.jpg' || filext === '.jpeg')
		return true;
	else
		return false;
}
// does not take a function, currently

flatten('source', 'dest', ignorelist)
// only buckets files/dirs whose names are not in the ignorelist

flatten('source','dest',[],myaccept);
// only buckets files/dirs that pass through the accept

flatten('source','dest', [], [], "duplicate");
// causes the files to be copied rather than symlinked

flatten('source','dest',ignorelist,acceptlist,"duplicate");
// use any combination of options
// soon!
```

the same can be achieved when running on command line
```shell
$ flatten . ./copy --duplicate

$ flatten working final --ignore ".*, *.tmp, temp"

$ flatten src dest --accept "*.jpg, *.png, *.webp"
```

ignorelists and whitelists can be saved to (newline delimited) config files .bucketignore and .bucketaccept 
