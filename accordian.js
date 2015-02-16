(function ( $, window, document, undefined ) {

  var pluginName = 'customAccordian',

  defaults = {
    default_index : 0,
  };

	function Plugin( element, options ) {
    this.element = $(element);
    this.options = $.extend( {}, defaults, options) ;        
    this._defaults = defaults;
    this._name = pluginName;
    this.current_index = this.options.default_index;
    this.panels = [];
    this.init();
  }

  Plugin.prototype.init = function () {
    this.setUpPanels();
    this.expandDefault();
  };

  Plugin.prototype.setUpPanels = function(){
    var that = this;
    var panels = this.element.find('.accordian-panel');
    for(var i = 0 ; i < panels.length ; i++){
      var panel = $(panels[i]);
      panel.find('.body').hide();
      panel.addClass('collapsed');
      panel.find('.head').attr('data-panel-index', i);
      panel.find('.head').click(function(event) {
        that.togglePanel(event);
      })
      this.panels.push(panel);
      
    }
  };

  Plugin.prototype.expandDefault = function(){
    this.expand(this.current_index);
  };

  Plugin.prototype.togglePanel = function(ev){
    var target = $(ev.target);
    if(!$(ev.target).hasClass('head'))
      target = target.closest('.head');
    var index = target.attr('data-panel-index');
    if(index != this.current_index){
      this.collapse(this.current_index);
      this.expand(index);
    } 
  };

  Plugin.prototype.expand = function(index){
    var panel = this.panels[index];
    panel.addClass('expanded');
    panel.removeClass('collapsed');
    panel.find('.body').slideDown();
    this.current_index = index;
  };

  Plugin.prototype.collapse = function(index){
    var panel = this.panels[index];
    panel.removeClass('expanded');
    panel.addClass('collapsed');
    panel.find('.body').slideUp();
  };
  
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, 
            new Plugin( this, options ));
        }
    });
  }
})( jQuery, window, document );
