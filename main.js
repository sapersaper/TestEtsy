/* ========================================================
 * main.js v0.0.1
 *
 * @Class App
 * Class implemented with the module pattern
 * This class defines the main module in order to make the app work.
 *
 * @author: Sebastian Battistelli - sebastianbattistelli@gmail.com
 * ======================================================== */
var App = (function() {
  return {
    /**
      @Attribute ui - This object defines the main ui selectors
    **/
    ui: {
      searchBtn: '.js-search-btn',
      searchTxt: '.js-search-txt',
      itemTemplate: '.js-itemTemplate',
      orderSelect: '.js-orderSelect',
      loader: '.js-loader',
      notMatch: '.js-not-match'
    },
    /**
      @Attribute events - This object defines the main events and binds the selectors with methods
    **/
    events: {
      'click .js-search-btn': 'searchBtnHandler',
      'keypress .js-search-txt': 'searchTxtHandler',
      'change .js-orderSelect': 'searchBtnHandler',
      'click .js-add-favorite': 'addFavoritesHandler',
      'click .js-remove-item': 'removeItemHandler',
      'click .js-view-more-item': 'viewMoreHandler'
    },
    /**
      @method initialize - This method handles the initialization of the app
    **/
    initialize: function() {
      var ui = Utils.ui(this),
        events = Utils.events(this);
    },
    /**
      @method searchBtnHandler - This method is used to search results after the user clicks on search ui button
    **/
    searchBtnHandler: function() {
      this.searchResult();
    },
    /**
      @params {Object} e - Default jquery event
      @method searchTxtHandler - This method is used to search results after the user hit the enter button
    **/
    searchTxtHandler: function(e) {
      if (e.keyCode == 13) {
        this.searchResult();
      }
    },
    /**
      @params {Object} e - Default jquery event
      @method addFavoritesHandler - This method is used to add a product to favorites
    **/
    addFavoritesHandler: function(e) {
      e.preventDefault();
      $el = $(e.currentTarget);

      EtsySearch.addToFavorites($el.data().listingid);
    },
    /**
      @method searchResult - This method is used search results on the ETSY API
    **/
    searchResult: function() {
      var self = this;

      this.ui.notMatch.hide()
      this.ui.loader.show();
      EtsySearch.search({
        keywords: this.ui.searchTxt.val(),
        sort: this.ui.orderSelect.val()
      }, function(response) {
        self.populateItems(response);
        response.count ? self.ui.notMatch.hide() : self.ui.notMatch.show();
      });
    },
    /**
      @params {Object} e - Default jquery event
      @method removeItemHandler - This method is used to remove the items from the results (It uses local storage to keep 
                                  the data clean)
    **/
    removeItemHandler: function(e) {
      var $el = $(e.currentTarget),
        key = $el.data().listingid;

      e.preventDefault();

      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, 'deleted');
      }

      $el.closest('#item_' + key).remove();
    },
    /**
      @params {Object} e - Default jquery event
      @method viewMoreHandler - This method is used search results on the ETSY API
    **/
    viewMoreHandler: function(e) {
      var $el = $(e.currentTarget),
        key = $el.data().listingid,
        $elItem = $el.closest('#item_' + key);

      e.preventDefault();

      $el.toggleClass('icon-minus');
      $elItem.find('.item-more-info').toggle();
    },
    /**
      @method hideItemsDeleted - This method is used to hide the removed events from the results when the page is refreshed
    **/
    hideItemsDeleted: function() {
      $.each(localStorage, function(key, val) {
        $('#item_' + key).remove();
      });
    },
    /**
      @params {Object} data - Default data returned by the ETSY API
      @method populateItems - This method is used to populate the data returned by the ETSY API (It uses handlebars to render)
    **/
    populateItems: function(data) {
      var self = this;
      Utils.getTemplate('module.html', function(templates) {
        var template = Handlebars.compile(templates);
        self.ui.itemTemplate.html(template(data));
        self.hideItemsDeleted();
        self.ui.loader.hide();
      });
    }
  };
})();