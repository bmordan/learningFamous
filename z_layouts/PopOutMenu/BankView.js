define(function(require, exports, module){
  var View = require('famous/core/View')
  var Surface = require('famous/core/Surface')
  var Modifier = require('famous/core/Modifier')
  var ImageSurface = require('famous/surfaces/ImageSurface')
  var Transitionable = require('famous/transitions/Transitionable')
  var Transform = require('famous/core/Transform')
  var Easing = require('famous/transitions/Easing')

  
  function BankView(){
    View.apply(this, arguments)
    _createBankView.call(this)
    _setListeners.call(this)
  }
  
  BankView.DEFAULT_OPTIONS = {}
  BankView.prototype = Object.create(View.prototype)
  BankView.prototype.constructor = BankView
  BankView.prototype.open = function(){
    console.log('open the bank')
    this.bankModifier.setTransform(
      Transform.translate(-100,-100,0),{ duration: 1200, curve: Easing.outBounce }
    )
  }
  BankView.prototype.close = function(){
    console.log('shut the bank')
    this.bankModifier.setTransform(
      Transform.translate(0,0,0),{ duration: 800, curve: Easing.inExpo }
    )
  }
  
  function _createBankView(){
    this.bankSurface = new ImageSurface({
      size: [200,200],
      content: './bank.png',
      cursor: 'pointer'
    })
    this.bankModifier = new Modifier({
      origin: [0.5,0.5],
      transform: Transform.translate(0,0,0)

    })
    this.add(this.bankModifier).add(this.bankSurface)
  }
  function _setListeners(){
    this.bankSurface.on('click', function(){
      this._eventOutput.emit('bankToggle')
    }.bind(this))
    this.bankSurface.pipe(this._eventOutput)
  }
  
  module.exports = BankView
})