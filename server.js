var loader = require('./core/loader');
var logger = require('./common/logger')('server');
var config = require('./common/config');


(function () {
    logger.info('start to mock data.');
    var start = process.hrtime();
    var end = process.hrtime(start);
    logger.info('done.  Execution time (hr): %ds %dms',end[0], end[1]/1000000);
})();
