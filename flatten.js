var fs        = require('fs');
var path      = require('path');
var async     = require('async');
var minimatch = require('minimatch');

function flatten (source, dest, _ignore) {

	var ignore = _ignore || [];
	var shouldIgnore = function (name) {
		var matched = false;
		ignore.forEach(function (pattern) {
			if (minimatch(name, pattern)) {
				matched = true;
			}
		});
		return matched;
	};

	flatten_dir(source);

	function flatten_dir (directory) {
		var dirname = path.basename(directory);
		console.log(dirname);
		if (! shouldIgnore(dirname)) {
			fs.readdir(directory, function(err, files) {
				files.forEach(function(filename) {
					var workingpath = path.resolve(directory,filename);
					async.waterfall([
						function(cb) {
							fs.stat(workingpath, cb);
						},
						function(stats, cb) {
							if (stats.isFile()) {
								fs.readFile(workingpath, cb);
							}
							if (stats.isDirectory()) {
								flatten_dir(workingpath);
								return;
							}
						},
						function(file, cb) {
							var sourcepath = path.resolve(workingpath);
							var destpath = path.resolve(dest, filename);
							fs.symlink(sourcepath, destpath, cb);
						}],
						function (err) {
							if (err) {
								console.error(err);
								return;
							}
							return;
						}
				   );
				});
			});
		} else {
			console.log('ignore directory ' + dirname);
		}
	}
}

exports = module.exports = flatten;
