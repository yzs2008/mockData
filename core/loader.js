var fs = require('fs');
var path = require('path');
var logger = require('../common/logger')('loader');


module.exports = {
    load: function (provider) {

        var pathPrefix = 'provider/';

        fs.readdirSync(pathPrefix).forEach(function (fileName) {
            var fname = path.basename(fileName, '.js');
            if (fname === provider) {
                logger.info('load provider', provider);
                return require(fileName);
            }
        });

        logger.info('can not find provider', provider);
        return null;
    }
};

