const fs = require('fs');
var dir = 'data_out_test';
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    compareJSON(file.slice(0,-5)); // remove ".json" extension
  }
})

// compares equality of 2 json files in data_out and data_out_test
function compareJSON(f) {
  fs.readFile('data_out/'+f+'.json', (err1, data_out) => {
    if (err1) throw err1;
    fs.readFile('data_out_test/'+f+'.json', (err2, data_out_test) => {
      if (err2) throw err2;
      console.log(areBuffersEqual(data_out,data_out_test),f);
    });
  });
}

// took this from https://stackoverflow.com/questions/30701220/how-to-compare-buffer-objects-in-nodejs
function areBuffersEqual(bufA, bufB) {
    var len = bufA.length;
    if (len !== bufB.length) {
        return false;
    }
    for (var i = 0; i < len; i++) {
        if (bufA.readUInt8(i) !== bufB.readUInt8(i)) {
            return false;
        }
    }
    return true;
}
