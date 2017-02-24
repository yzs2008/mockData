var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'dateFile', filename: 'log/mock', pattern : '-yyyy-MM-dd.log', "alwaysIncludePattern": true}
    ],
    levels:{
        all:'DEBUG'
    }
});

module.exports = function (loggerName) {
    if (loggerName == undefined || loggerName == null || loggerName == '') {
        return log4js.getLogger();
    }
    return log4js.getLogger(loggerName);
}
