define(function(require, exports, module) {
  // import dependencies
  var Engine = require('famous/core/Engine')
  var Surface = require('famous/core/Surface')
  var Modifier = require('famous/core/Modifier')
  var Transform = require('famous/core/Transform')
  
  var Transitionable = require('famous/transitions/Transitionable')
  var SnapTransition = require('famous/transitions/SnapTransition')
  Transitionable.registerMethod('snap', SnapTransition)
  
  var GenericSync = require('famous/inputs/GenericSync')
  var MouseSync = require('famous/inputs/MouseSync')
  var TouchSync = require('famous/inputs/TouchSync')
  
  GenericSync.register({
    'mouse' : MouseSync,
    'touch' : TouchSync
  })
  
  var DISPLACEMENT_LIMIT = 100
  var DISPLACEMENT_PEEK = 50
  var DISPLACEMENT_THRESHOLD = 50
  var VELOCITY_THRESHOLD = 0.2
  var SURFACE_SIZE = [undefined, 100]
  
  var position = new Transitionable(0)
  
  var sync = new GenericSync(
    ['mouse','touch'],
    {direction : GenericSync.DIRECTION_Y}
  )
  var background = new Surface({
    size : SURFACE_SIZE,
    properties : {background : '#3399FF'}
  })
  var draggableSurface = new Surface({
    size: SURFACE_SIZE,
    properties : {background : '#FF9933'}
  });
  draggableSurface.pipe(sync)
  //event listeners
  sync.on('update', function(e){
    var xy = position.get()
    var delta = e.delta;
    if(xy + delta < DISPLACEMENT_LIMIT){
      position.set(xy + delta)
    }else{
      position.set(DISPLACEMENT_LIMIT)
    }
    if(xy + delta < -DISPLACEMENT_PEEK) position.set(-DISPLACEMENT_PEEK)
  })
  sync.on('end', function(e){
    var xy = position.get()
    var v = e.velocity;
    if(xy > DISPLACEMENT_THRESHOLD || v > VELOCITY_THRESHOLD){
      position.set(DISPLACEMENT_LIMIT, {
        method : 'snap',
        period : 200,
        velocity : v
      })
    }else{
      position.set(0,{
        method : 'snap',
        period : 200,
        velocity : v
      })
    }
  })
  //end of event listeners
  var positionModifier = new Modifier({
    transform : function(){
      return Transform.translate(0,position.get(),0)
    }
  })
  var centerModifier = new Modifier({
    size: SURFACE_SIZE,
    origin: [0.5,0],
    align: [0.5,0]
  })
  var rotationModifier = new Modifier({
    size: SURFACE_SIZE,
    origin: [0.5,0.5],
    align: [0.5,0.5],
    transform : function(){
      var angle = Math.PI * (position.get()/DISPLACEMENT_LIMIT);
      return Transform.rotateZ(angle)
    }
  })
  var textSurface = new Surface({
    size: SURFACE_SIZE,
    content: '↑',
    properties:{
      color: '#fff',
      fontSize: '60px',
      lineHeight: SURFACE_SIZE[1] + 'px',
      textAlign: 'center',
      pointerEvents: 'none'
    }
  })
  // create the main context
  var mainContext = Engine.createContext();
  mainContext.add(background);
  
  var moveableNode = mainContext.add(positionModifier);
  moveableNode.add(draggableSurface);
  moveableNode.add(centerModifier).add(rotationModifier).add(textSurface)

});
