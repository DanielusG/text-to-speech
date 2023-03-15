let listLines =[];
const f = require('fs');
  const readline = require('readline');
  var user_file = './train/Dataset.txt';
  var r = readline.createInterface({
      input : f.createReadStream(user_file)
  });
  r.on('line', function (text) {
      listLines.push(text);
      console.log(text);
  });