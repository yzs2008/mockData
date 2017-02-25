var mysql = require('mysql');
var Q = require('q');
var logger = require('../common/logger')('mysql');

var pool;

module.exports = {
    insertList: function (table, dataBuf) {
        var deferred = Q.defer();

        var obj = {};
        obj.table = table;
        obj.meta = dataBuf[0];
        var queryStr = makeQueryStr(obj);
        var params = makeParams(dataBuf);

        pool.getConnection(function (err, connection) {
            connection.query(queryStr, params, function (err, results) {
                connection.release();
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(results);
            });
        });

        return deferred.promise;
    },
    initPool: function (config) {
        pool = mysql.createPool(config.dataSource);
    }
};

var makeQueryStr = function (obj) {
    var queryStr = 'insert into ';
    queryStr += obj.table;
    queryStr += " ( ";

    var meta = obj.meta;

    Object.keys(meta).forEach(function (key) {
        queryStr += key;
        queryStr += ',';
    });

    queryStr = queryStr.substring(0, queryStr.length - 1);
    queryStr += ' )';
    queryStr += ' values ?';

    return queryStr;
};

var makeParams = function (params) {
    var paramWrapper = [];
    var result = [];
    for (var i = 0; i < params.length; i++) {
        var item = [];
        var param = params[i];
        Object.keys(param).forEach(function (key) {
            item.push(param[key]);
        });
        result.push(item);
    }
    paramWrapper.push(result);
    return paramWrapper;
};
