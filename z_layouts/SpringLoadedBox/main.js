define(function(require, exports, module) {
    // import dependencies
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var MouseSync = require('famous/inputs/MouseSync');
  var TouchSync = require('famous/inputs/TouchSync');
  var ScrollSync = require('famous/inputs/ScrollSync');
  var GenericSync = require('famous/inputs/GenericSync');
  GenericSync.register({
    'mouse' : MouseSync,
    'touch' : TouchSync,
    'scroll': ScrollSync
  })
  var Transitionable = require('famous/transitions/Transitionable');
  var SnapTransition = require('famous/transitions/SnapTransition');
  Transitionable.registerMethod('spring', SnapTransition)

  var position = new Transitionable([0,0]);
  var sync = new GenericSync({
    'mouse' : {},
    'touch' : {},
    'scroll': {scale : .5}
  });
  var surface = new Surface({
    size : [200,200],
    properties : {
      background: '#fff'
    }
  });
  //event listeners
  surface.pipe(sync);
  
  sync.on('update', function(e){
    console.log('mouse:'+sync._syncs.mouse._down);
    console.log('scroll:'+sync._syncs.scroll._inProgress);
    if(sync._syncs.touch._position != null){
      console.log('touch:'+sync._syncs.touch._position[0]+','+sync._syncs.touch._position[1]);
    }else{
      console.log('touch:false');
    }
    
    var currentPosition = position.get();
        position.set([
            currentPosition[0] + e.delta[0],
            currentPosition[1] + e.delta[1]
        ]);  
  });
  sync.on('end', function(e){
    var velocity = e.velocity;
    position.set([0,0], {
      method: 'spring',
      period: 300,
      velocity: velocity
    })
  });
  
  var positionModifier = new Modifier({
    
    transform: function(){
      var currentPosition = position.get();
      return Transform.translate(currentPosition[0],currentPosition[1],0)
    }
  });
  var centerModifier = new Modifier({origin : [0.5,0.5]});
  
  // create the main context
  var mainContext = Engine.createContext();
  mainContext.add(centerModifier).add(positionModifier).add(surface)
});
