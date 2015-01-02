(function ( $, window, document, undefined ) {
    var pluginName = 'inputify',
    defaults = {
     	containerElem : 'div',
			containerClass : 'inputify-select',
			searchInputClass : 'inputify-select-search',
			searchResultsContainer : 'ul',
			searchResultsClass : 'inputify-select-search-results',
			searchResultClass : 'inputify-select-search-result',
			searchResultContainer : 'li'
    };
    function Plugin( element, options ) {
        this.element = $(element);
        this.options = $.extend( {}, defaults, options) ;        
        this._defaults = defaults;
        this._name = pluginName;
        this.selectedId = null;
        this.selectOptions = {};
        this.serializedOptions = {};
        this.container = null;
        this.inputField = null; 
        this.resultContainer = null;   
        this.init();
    }

    Plugin.prototype.init = function () {
        var tagName = this.element.prop('tagName');
        if(tagName != 'SELECT'){
            console.log("Element should be of type 'select'")
        } else {
            this.element.hide();
            this.selectOptions = this.element.prop('options');
            this.setSerializedOptions();
            this.initializeDOMElems();
            this.initializeMouseUpOnDoc();
            this.selectOption();
        }

    };

    Plugin.prototype.setSerializedOptions = function () {
        for (var i = 0 ; i < this.selectOptions.length ; i++){
            var option = this.selectOptions[i];
            var id = $(option).attr('value');
            var name = $(option).html();
            if (this.selectedId == null)
            	this.selectedId = (option.selected) ? id : null;
            this.serializedOptions[id] = {'name' : name};
        }
    }

    Plugin.prototype.initializeDOMElems = function() {
        this.container = document.createElement(this.options.containerElem);
        $(this.container).addClass(this.options.containerClass)
        this.container.style.position = 'relative';
        this.inputField = document.createElement('input');
        this.container.appendChild(this.inputField);
        $(this.inputField).addClass(this.options.searchInputClass);
        this.bindKeyUpOnInput();
        this.element.before($(this.container));
    }

    Plugin.prototype.bindKeyUpOnInput = function (){
        var that = this;
        $(this.inputField).keyup(function(){
            that.search($(this));
        })
    }

    Plugin.prototype.search = function(field) {
        this.prepareResultContainer();
        q = field.val().toLowerCase();
        if(q != ''){
            var results = {};
            for (var id in this.serializedOptions){
                var name = this.serializedOptions[id].name.toLowerCase();
                if(name.indexOf(q.toLowerCase()) > -1){
                    results[id] = this.serializedOptions[id]
                }
            }
            this.renderSearchResults(results);
        }
    }

    Plugin.prototype.renderSearchResults = function(results){
        for (id in results){
            var that = this;
            var searchResult = this.getSearchResultElem(id, results[id].name);
            $(searchResult).click(function(){
                that.selectedId = $(this).attr('data-value-id');
                that.selectOption();
            })
            this.resultContainer.appendChild(searchResult);
        }
    }

    Plugin.prototype.initializeMouseUpOnDoc = function() {
        var that = this;
        $(document).mouseup(function (e){
            if (!$(that.resultContainer).is(e.target) && $(that.resultContainer).has(e.target).length === 0){
              that.selectOption();
            }
        });
    }

    Plugin.prototype.prepareResultContainer = function() {
        if(this.resultContainer == null)
            this.resultContainer = document.createElement(this.options.searchResultsContainer);
        $(this.resultContainer).html('');
        $(this.resultContainer).addClass(this.options.searchResultsClass);
        this.resultContainer.style.position = 'absolute';
        this.resultContainer.style.margin = '0px';
        this.container.appendChild(this.resultContainer);
    }

    Plugin.prototype.getSearchResultElem = function (id, name) {
        var searchResult = document.createElement(this.options.searchResultContainer);
        $(searchResult).addClass(this.options.searchResultClass);
        $(searchResult).attr('data-value-id', id);
        $(searchResult).html(name);
        return searchResult;
    }

    Plugin.prototype.selectOption = function () {
        if(this.selectedId){
            var name = this.serializedOptions[this.selectedId].name;
            $(this.inputField).val(name);
            $(this.element).val(this.selectedId);
        }
        this.flushResultContainer();
    }

    Plugin.prototype.flushResultContainer = function(){
        $(this.resultContainer).remove();
        this.resultContainer = null
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );