define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine')
    var Surface = require('famous/core/Surface')
    var Modifier = require('famous/core/Modifier')
    var View = require('famous/core/View')
    var Transform = require('famous/core/Transform')
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout')
    var GridLayout = require('famous/views/GridLayout')
    
    var mainContext = Engine.createContext()
    var layout;
    
    createLayout()
    addHeader()
    addContent()
    addFooter()
    
    function createLayout(){
      layout = new HeaderFooterLayout({
        headerSize: 120,
        footerSize: 0
      })
      mainContext.add(layout)
    }
    function addHeader(){
      layout.header.add(new Surface({
        content: '<h1>Box Pants</h1>',
        properties: {
          lineHeight: '120px',
          textAlign: 'center',
          background: '#FF8D11'
        }
      }))
    }
    function addFooter(){
      layout.footer.add(new Surface({}))
    }
    function addContent(){
      var grid = new GridLayout({
        dimensions: [1,2]
      })
      var views = []
      grid.sequenceFrom(views)
      for(var i=0;i<2;i++){
        var view = new View()
        var centerModifier = new Modifier({
          origin: [0,0.5]
        })
        var surface = new Surface({
          content: 'Item ' + i,
          size: [55,40],
          properties: {
            background: '#50ADD0',
            textAlign: 'center',
            lineHeight: '40px'
          }
        })
        view.add(centerModifier).add(surface)
        views.push(view)
      }
      layout.content.add(grid)
    }
})
