define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine')
    var AppView = require('./AppView')
    var mainContext = Engine.createContext()
    var appView = new AppView();
    mainContext.add(appView)
});
