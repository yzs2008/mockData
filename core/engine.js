var loader = require('./loader');
var logger = require('../common/logger')('engine');
var config = require('../common/config');
var mysql = require('../mysql/mysqlService');


module.exports = {
    start: function () {
        var providerConfig = initConfig();
        var provider = loadProvider(providerConfig.name);

        var times = providerConfig.times;
        var startTime = new Date();
        prepareDataSource(providerConfig);

        for (var i = 0; i < times; i++) {
            var buffer = prepareData(provider, providerConfig.size);
            bulkInsert(providerConfig.table, buffer).then(function (data) {
                logger.info('done', (new Date() - startTime)/ 1000 ,'s');
            }).fail(function (err) {
                logger.error('error occur', err);
            });
        }
    }
};

var initConfig = function () {
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

var loadProvider = function (providerName) {
    var provider = loader.load(providerName);
    return provider;
};

var prepareData = function (provider, size) {
    var buffer = [];
    for (var i = 0; i < size; i++) {
        buffer[i] = provider();
    }
    return buffer;
};

var prepareDataSource = function (providerConfig) {
    mysql.initPool(providerConfig);
};

var bulkInsert = function (table, buffer) {
    return mysql.insertList(table, buffer);
};