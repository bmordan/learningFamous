define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine')
    var MapView = require('MapView')
    var BankView = require('BankView')
    // create the main context
    var mainContext = Engine.createContext()
    var mapView = new MapView
    
    mainContext.add(mapView)

});
