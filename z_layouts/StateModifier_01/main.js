define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');
    var transitionable = new Transitionable(0);
    // create the main context
    var mainContext = Engine.createContext()
    var surface = new Surface({
      content: 'Hi Boys',
      properties: {
        background: '#11007A',
        lineHeight: '200px',
        textAlign: 'center'
      }
    })
    var modifier = new Modifier({
      size: [200, 200],
      origin: [0.5,0.5],
      align: [0.5,0.5],
      transform: function(){
        var scale = transitionable.get()
        return Transform.scale(scale,scale,1)
      },
      opacity: function(){
        return transitionable.get()
      }
    })
    mainContext.add(modifier).add(surface)
    
    transitionable.set(1,
      {duration: 2000, curve: Easing.outElastic}
    )
})
