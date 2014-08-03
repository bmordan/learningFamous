define(function(require, exports, module){
  var View = require('famous/core/View')
  var Surface = require('famous/core/Surface')
  var ImageSurface = require('famous/surfaces/ImageSurface')
  var Modifier = require('famous/core/Modifier')
  var Transform = require('famous/core/Transform')
  var Transitionable = require('famous/transitions/Transitionable')
  var BankView = require('BankView')
  var SnackView = require('SnackView')
  var bankState = true
  var snackState = true
  
  function MapView(){
    View.apply(this, arguments)
    _createMap.call(this)
    _addBank.call(this)
    _addSnack.call(this)
    _addBankListener.call(this)
    _addSnackListener.call(this)
  }
  
  MapView.prototype = Object.create(View.prototype)
  MapView.prototype.constructor = MapView;
  MapView.prototype.bankToggle = function(){
    if(bankState){
      this.bankView.open()
    }else{
      this.bankView.close()
    }
    bankState = !bankState
  }
  MapView.prototype.snackToggle = function(){
    if(snackState){
      console.log('open the snackbar')
    }else{
      console.log('close the snackbar. go home')
    }
    snackState = !snackState
  }
  
  function _createMap(){
    var mapSurface = new ImageSurface({
      size: [undefined,undefined],
      content: './map.png'
    })
    var mapModifier = new Modifier({
      origin: [0.5,0.5],
      align: [0.5,0.5]
    })
    this.add(mapModifier).add(mapSurface)
  }
  function _addBank(){
    this.bankView = new BankView()
    var bankViewModifier = new Modifier({
      origin: [0.5,0.5],
      align: [0.5,0.5],
      transform: Transform.translate(190,-119,0)
    })
    this.add(bankViewModifier).add(this.bankView)
  }
  function _addSnack(){
    this.snackView = new SnackView()
    var snackViewModifier = new Modifier({
      origin: [0.5,0.5],
      align: [0,0],
      transform: Transform.translate(-240,-60,0)
    })
    this.add(snackViewModifier).add(this.snackView)
  }  
  function _addBankListener(){
    this.bankView.on('bankToggle', this.bankToggle.bind(this))
  }
  function _addSnackListener(){
    this.snackView.on('snackToggle', this.snackToggle.bind(this))
  }

  module.exports = MapView
})