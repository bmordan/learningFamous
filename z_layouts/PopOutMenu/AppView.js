define(function(require, exports, module){
  var View = require('famous/core/View')
  var Surface = require('famous/core/Surface')
  var ImageSurface = require('famous/surfaces/ImageSurface')
  var Transform = require('famous/core/Transform')
  var Modifier = require('famous/core/Modifier')
  var Transitionable = require('famous/transitions/Transitionable')
  var EventHandler = require('famous/core/EventHandler')
  var GenericSync = require('famous/inputs/GenericSync')
  var MouseSync = require('famous/inputs/MouseSync')
  var TouchSync = require('famous/inputs/TouchSync')
  GenericSync.register({
    'mouse' : MouseSync,
    'touch' : TouchSync
  })
  
  function AppView(){
    View.apply(this, arguments)
    _createButton.call(this)
  }
  
  AppView.prototype = Object.create(View.prototype)
  AppView.prototype.constructor = AppView
  AppView.prototype.toggle = function(){
    if(this.toggle){
      console.log('close up')
    }else{
      console.log('open out')
    }
    this.toggle = !this.toggle    
  }
  AppView.prototype.openAnimation = function(){
    console.log('inside openAnimation')
  }
  AppView.DEFAULT_OPTIONS = {}
  
  function _createButton(){
    var buttonSurface = new ImageSurface({
      size: [200,220],
      content: './building.png'
    })
    var buttonModifier = new Modifier({
      origin: [0.5,0.5],
      align: [0.5,0.5]
    })
    this.add(buttonModifier).add(buttonSurface);
  }
  
  module.exports = AppView
})