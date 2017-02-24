var loader = require('./loader');
var logger = require('../common/logger')('engine');
var config = require('../common/config');
var mysql = require('../mysql/mysqlService');


module.exports = {
    start: function () {
        var providerConfig = init();
        var times = providerConfig.times;

        for (var i = 0; i < times; i++) {
            var buffer = prepareData();
            bulkInsert(buffer);
        }
    }
};

var init = function () {
    var providerConfig = {};
    var name = config.cur;
    var providers = config.providers;
    for (var i = 0; i < providers.length; i++) {
        if (providers[i].name == name) {
            providerConfig = providers[i];
            break;
        }
    }
    return providerConfig;
};

var load = function () {
    var providerConfig = init();
    var provider = loader.load(providerConfig.name);
    return provider;
};

var prepareData = function () {
    var provider = load();
    var providerConfig = init();
    var size = providerConfig.size;
    var buffer = [];
    for (var i = 0; i < size; i++) {
        buffer[i] = provider();
    }
    return buffer;
};


var bulkInsert = function (buffer) {
    mysql.insertList(buffer);
};