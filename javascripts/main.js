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

  document.observe('dom:loaded', function(e) {
    $$('#header nav ul li a').each(function(anchor) {
      anchor.observe('mouseenter', function(e) {
        e.findElement().morph('background-color: #fff; color: #0af', .2);
      });
      
      anchor.observe('mouseleave', function(e) {
        e.findElement().morph('background-color: #0af; color: #fff', .2);
      });
    });

    new BackgroundLoader();
  });
})();
