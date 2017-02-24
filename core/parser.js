var fs = require('fs');
var Regex = require('regex');

var parser = function () {

    var data = fs.readFileSync('config.ejson', 'utf-8');

    console.log(data);
    var total =  data.match(/(?:total\:)[\s]*[\d]+[\s]*(?=,)/);
    console.log(total);
};

parser();