define(function(require, exports, module){
  var View = require('famous/core/View')
  var Surface = require('famous/core/Surface')
  var Modifier = require('famous/core/Modifier')
  var ImageSurface = require('famous/surfaces/ImageSurface')
  var Transitionable = require('famous/transitions/Transitionable')
  
  function SnackView(){
    View.apply(this, arguments)
    _createSnackView.call(this)
    _setListeners.call(this)
  }
  
  SnackView.DEFAULT_OPTIONS = {}
  SnackView.prototype = Object.create(View.prototype)
  SnackView.prototype.constructor = SnackView
  
  function _createSnackView(){
    this.snackSurface = new ImageSurface({
      size: [180,180],
      content: './snack.png',
      cursor: 'pointer'
    })
    var snackModifier = new Modifier({
      align: [0.5,0.5],
      origin: [0.5,0.5]
    })
    this.add(snackModifier).add(this.snackSurface)
  }
  function _setListeners(){
    this.snackSurface.on('click', function(){
      this._eventOutput.emit('snackToggle')
    }.bind(this))
    this.snackSurface.pipe(this._eventOutput)
  }
  
  module.exports = SnackView
})