(function() {
  var BackgroundLoader = Class.create({
    initialize: function() {
      this.options = {
        element: 'background',
        url: 'http://www.nasa.gov/images/content/494060main_rolloutmoon-lg_full_full.jpg'
      };
      Object.extend(this.options, arguments[0] || {});
      
      this.element = $(this.options.element);
      this.loader = new Image();
      this.loader.onload = this.onImageLoaded.bind(this);
      this.loader.src = this.options.url;
    },
    
    onImageLoaded: function() {
      this.element.setStyle({
        background: 'url(' + this.loader.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'          
      });
      this.element.appear(1);
    }
  });

  var NavEffects = Class.create({
    initialize: function() {
      this.options = {
        selector: '#header nav ul li a',
        onMouseEnter: null,
        onMouseLeave: null
      };
      Object.extend(this.options || arguments[0]);
      
      if ( !this.options.onMouseEnter )
        this.options.onMouseEnter = this.onMouseEnter;
        
      if ( !this.options.onMouseLeave )
        this.options.onMouseLeave = this.onMouseLeave;
        
      $$(this.options.selector).each(function(element) {
        element.observe('mouseenter', this.options.onMouseEnter.bind(this));
        element.observe('mouseleave', this.options.onMouseLeave.bind(this));
      }.bind(this));
    },
    
    onMouseEnter: function(e) {
      var element = e.findElement();
      element.morph('background-color: #fff; color: #0af', .2);
    },
    
    onMouseLeave: function(e) {
      var element = e.findElement();
      element.morph('background-color: #0af; color: #fff', .2);
    }
  });

  document.observe('dom:loaded', function(e) {
    new NavEffects();
    new BackgroundLoader();
  });
})();
