var mysql = require('mysql');
var Q = require('q');
var logger = require('../common/logger')('mysql');


module.exports = {
    insertList: function (config, dataBuf) {
        var deferred = Q.defer();

        var pool = mysql.createPool(config.dataSource);
        var obj = {};
        obj.table = config.table;
        obj.meta = dataBuf[0];
        var queryStr = makeQueryStr(obj);
        var params = makeParams(dataBuf);
/*        var test = [[['c1bc6e8c-aca6-46ef-b668-60ee60a5efd2', '41142319840322451X', '黄建博', '6228480405925338270', '18551276587', '200604000000445', '30', '0103', '农业银行', '0', '未处理', 'data'],
            ['d1bc6e8c-aca6-46ef-b668-60ee60a5efd2', '41142319840322451X', '黄建博', '6228480405925338270', '18551276587', '200604000000445', '30', '0103', '农业银行', '0', '未处理', 'data']]];
        var str = mysql.format(queryStr,test);*/
        //var str = mysql.format(queryStr, params);
        //logger.info(str);

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
    for(var i =0; i< params.length; i++){
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
