define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine')
    var Surface = require('famous/core/Surface')
    var Modifier = require('famous/core/Modifier')
    var Transform = require('famous/core/Transform')
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var GridLayout = require('famous/views/GridLayout')

    // create the main context
    var mainContext = Engine.createContext()

    var starsImageSurface = new ImageSurface({
        size: [undefined, undefined],
        content: 'bg.jpg'
    })
    
    var titleModifier = new Modifier({
      align: [0.5,0.5],
      origin: [0.5,0.5]
    })
    var title = new Surface({
      content: '<span id="title">Bernie is Famo.us</span>',
      size: [undefined,100],
      properties: {
        textAlign: 'center'
      }
    })
    //navigation icons
    var images = ['email.png','grid.png','grids.png','nodes.png']
    var nav = createNav(images)
    var navModifier = new Modifier({
      align: [1,0],
      origin: [1,0],
      size: [200,50]
    })
    function createNav(images){
      var grid = new GridLayout({
        dimensions: [images.length,1]
      })
      var navItems = []
      grid.sequenceFrom(navItems)
      for(i=0;i<images.length;i++){
        navItems.push(new ImageSurface({
            content: images[i],
            properties: {
              margin: '12px 0px 0px -12px'
            }
        }))
      }
      return grid
    }
    
    mainContext.add(starsImageSurface)
    mainContext.add(titleModifier).add(title)
    mainContext.add(navModifier).add(nav)
    
})
