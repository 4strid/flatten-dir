var fs        = require('fs');
var path      = require('path');
var md5       = require('crypto-md5');
var async     = require('async');
var minimatch = require('minimatch');

// don't forget:
// make sure you don't try to flatten the bucket directory
// write your stupid argument acceptor
// implement copying

function flatten (source, dest, accept, ignore, options) {
	function yes () { return true; }
	function no () { return false; }
	var ignore = ignore ? createfilter(ignore) : no;
	var accept = accept ? createfilter(accept) : yes;
	var mode   = options === "duplicate" ? "copy" : "link";
	var sourcename = path.basename(source);
	if (! ignore(sourcename) && accept(sourcename)) {
		fs.readdir(source, function(err, files) {
			files.forEach(function(filename) {
				var workingpath = path.resolve(source,filename);
				async.waterfall([
					function(cb) {
						fs.stat(workingpath, cb);
					},
					function(stats, cb) {
						if (stats.isFile()) {
							fs.readFile(workingpath, cb);
						}
						if (stats.isDirectory()) {
							processfolder(workingpath, dest);
							return;
						}
					},
					function(file, cb) {
						var hash = md5(file)
						if (! masterhashes.has(hash)) {
							masterhashes.add(hash);
							var sourcepath = path.resolve(workingpath);
							var destpath = path.resolve(dest, filename);
							fs.symlink(sourcepath, destpath, cb);
						} else { cb(); }
					}],
					function (err) {
						if (err) {
							console.error('an error occured');
							return;
						}
						return;
					}
			   );
			});
		});
	} else {
		//console.log('ignoring '+sourcename);
	}
}

exports = module.exports = flatten;
exports.createfilter = createfilter;

function createfilter = (patterns) {
	var list;
	if (Array.isArray(patterns)) {
		list = patterns;
	} else if (typeof patterns === 'string') {
		list = patterns.split(',');
		if (list.length === 1) { // arcane way to say the split had no effect
			list = list[0].split('\n');
		}
	}
	
	return function filter (name) {
		list.forEach(function (pattern) {
			if (minimatch(name, pattern))
				return true;
		});
		return false;
	}
}
