var fs = require('fs');
var path = require('path');
var logger = require('../common/logger')('loader');


module.exports = {
    load: function (provider) {
        logger.info('load provider', provider);
        return require('../provider/' + provider);
    }
};

