WebFontConfig = {
  google: { families: [ 'Yanone Kaffeesatz' ] }
};

var Site = { };

Site.BackgroundLoader = Class.create({
  initialize: function(options) {
    this.options = {
      element: 'background',
      url: 'http://www.nasa.gov/images/content/473675main_473530main_f_211_193_171-orig_full_full.jpg'
    };
    
    this.element = null;
    
    this.loader = new Image();
    this.loader.observe('load', this.onImageLoaded.bind(this));
    
    this.load(options);
  },
  
  load: function(options) {
    if ( typeof options == 'string' )
      Object.extend(this.options, {url: options});
    else
      Object.extend(this.options, options || {});
      
    if ( !this.options.url ) return;
    if ( this.options.url.strip() == '' ) return;

    this.element = $(this.options.element);
    if ( !this.element ) return;
    
    this.loader.src = this.options.url;
  },
  
  onImageLoaded: function(e) {
    this.element.setStyle({
      background: 'url(' + this.loader.src + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'          
    });
    this.element.appear(1);    
  }
});

Object.extend(Site.BackgroundLoader, {
  load: function(onElement, fromUrl) {
    return new Site.BackgroundLoader({
      element: onElement,
      url: fromUrl
    });
  },
  
  fromJSONP: function(jsonp) {
    if ( typeof jsonp['url'] !== 'undefined' )
      return Site.BackgroundLoader.load('background', jsonp['url']);
  }
});

Site.LazyScriptLoader = Class.create({
  load: function(url, options) {
    var opts = {
      type: 'text/javascript',
      async: true,
      position: 'last',
      onLoad: Prototype.emptyFunction      
    };
    Object.extend(opts, options || {});
    
    var script = new Element('script', {
      src: url, 
      type: opts.type, 
      async: opts.async
    });
    script.observe('load', opts.onLoad);
    
    if ( opts.position == 'first' )
      $$('script').first().insert({before: script});
    else 
      $$('script').last().insert({after: script});
  }
});

(function() {
  var loader = new Site.LazyScriptLoader();
  
  document.observe('dom:loaded', function(e) {
    // lazily-load webfonts from google
    loader.load('http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', {
      position: 'first'
    });
    
    // load NASA image of the day
    loader.load('http://nimod-jsonp.heroku.com/?callback=Site.BackgroundLoader.fromJSONP');
    
    // add nice hover effect to nav links
    $$('#header nav ul li a').each(function(anchor) {
      anchor.observe('mouseenter', function(e) {
        e.findElement().morph('background-color: #fff; color: #0af', .2);
      });
      
      anchor.observe('mouseleave', function(e) {
        e.findElement().morph('background-color: #0af; color: #fff', .2);
      });
    });
  });  
})();
