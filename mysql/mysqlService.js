var mysql = require('mysql');
var Q = require('q');


module.exports = {
    insertList: function (config, dataBuf) {
        var deferred = Q.defer();

        var pool = mysql.createPool(config.dataSource);
        var obj = {};
        obj.table = config.table;
        obj.meta = dataBuf[0];
        var queryStr = makeQueryStr(obj);

        pool.getConnection(function (err, connection) {
            connection.query(queryStr, dataBuf, function (err, results) {
                connection.release();
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(results);
            });
        });

        return deferred.promise;
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

    queryStr.substring(0, queryStr.length - 1);
    queryStr += ' )';
    queryStr += '  ';

    return queryStr;
};
