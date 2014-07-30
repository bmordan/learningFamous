define(function(require, exports, module) {
  // import dependencies
  var Engine = require('famous/core/Engine');
  var Transform = require('famous/core/Transform');
  var Surface = require('famous/core/Surface');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout')
  var GridLayout = require('famous/views/GridLayout')
  // init
  var mainContext = Engine.createContext()
  var layout;
  var colours = ['#50ADD0','#FFCC11','#412BE3','#FF8D11'];
  
  createLayout()
  addHeader()
  addContent()
  addFooter()
  
  // functions
  function createLayout(){
    layout = new HeaderFooterLayout({
      headerSize: 55,
      footerSize: 23
    })
    mainContext.add(layout)
  }
  function addHeader(){
    layout.header.add(new Surface({
      content: '<h2>Clothes Horse</h2>',
      properties: {
        background: colours[4],
        textAlign: 'center',
        paddingTop: '20'
      }
    }))
  }
  function addContent(){
    layout.content.add(createSections( 'Cloths', [2, 1] ))
  }
  function addFooter(){
    layout.footer.add(createSections( 'Bargins', [4, 1] ))
  }
  function createSections( section , dims ){
    var grid = new GridLayout({
      dimensions: dims
    })
    var surfaces = [];
    grid.sequenceFrom(surfaces);
    for(var i=0;i < dims[0];i++){
      surfaces.push(new Surface({
        content: section + ' ' + (i+1),
        size: [undefined,undefined],
        properties: {
          background: colours[i],
          textAlign: 'center',
          padding: '3'
        }
      }))
    }
    return grid
  }
  //fire and send to HTML5 browser

});
