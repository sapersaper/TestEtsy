/* ========================================================
 * utils.js v0.0.1
 *
 * @Class Utils
 * Class implemented with the module pattern
 * This class defines the core used by the main class (provides core functionallity)
 *
 * @author: Sebastian Battistelli - sebastianbattistelli@gmail.com
 * ======================================================== */
var Utils = (function() {
  /**
    @params {Object} scope - Default main object
    @method _ui - This method is used to parse and assign the ui attribute provided in main class to the selectors (data-binding)
    @private
  **/
  var _ui = function(scope) {
    $.each(scope.ui, function(key, val) {
      scope.ui[key] = $(val);
    });

    return scope.ui;
  };
  /**
    @params {Object} scope - Default main object
    @method _events - This method is used to parse and assign the events attribute provided in main class to the selectors (data-binding)
    @private
  **/
  var _events = function(scope) {
    $.each(scope.events, function(key, val) {
      $('body').on(key.split(' ')[0], key.split(' ')[1], function(event) {
        scope[val](event);
      });
    });

    return;
  };
  /**
    @method _getBaseUrl - This method is used to get the root location
    @private
  **/
  var _getBaseUrl = function() {
    var url = window.location.host + window.location.pathname;
    return url;
  };
  /**
    @method _getTemplate - This method is used to get the template object
    @params {String} fileUrl - template url
            {function} callback - default function used as callback
    @private

    @NOTE: this jquery method $.get() requires to be run in server 
   **/
  var _getTemplate = function(fileUrl, callback) {
    var url = urlConst.template + fileUrl;

    $.get(url, function(templates) {
      callback(templates);
    });

    return;
  };
  // Returns an object with the objects needed in the main class
  return {
    ui: _ui,
    events: _events,
    getBaseUrl: _getBaseUrl,
    getTemplate: _getTemplate
  };
})();

/* ========================================================
 * EtsySearch.js v0.0.1
 *
 * @Class EtsySearch
 * Class implemented with the module pattern
 * This class defines the main methods needed by the ETSY API.
 *
 * @author: Sebastian Battistelli - sebastianbattistelli@gmail.com
 * ======================================================== */
var EtsySearch = (function() {
  /**
    @params {String} listingStates - configure url params
    @method _getUrlEtsySearch - This method is used to get url configured ready to fetch data
    @private
  **/
  var _getUrlEtsySearch = function(listingStates) {
    var url = EtsyAPI.urlSearch;

    return url.replace('{listingStates}', listingStates).replace('{key}', EtsyAPI.key);
  };
  /**
    @params {String} listingStates - configure url params
    @params {Integer} itemId - the selected item id
    @method _getUrlEtsyFavorites - This method is used to get url configured ready to add an item as favorite
    @private
  **/
  var _getUrlEtsyFavorites = function(listingStates, itemId) {
    var url = EtsyAPI.urlFavorites;

    return url.replace('{listingStates}', listingStates).replace('{key}', EtsyAPI.key).replace('{idItem}', itemId);
  };
  /**
    @params {Object} options - configure url params
    @params {Object} callback - method used to render the data after the request is successed
    @method _search - This method is used to make a request (GET) by ajax to the ETSY API
    @private
  **/
  var _search = function(options, callback) {
    var includes = '&includes=Images,ShippingInfo,Shop,Section,User,PaymentInfo',
      keywords = '&keywords=' + options.keywords,
      sortOn = '&sort_on=' + options.sort,
      url = _getUrlEtsySearch('active') + includes + keywords + sortOn;

    if (options.keywords) {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(response) {
          if (response) {
            callback(response);
          } else {
            callback(null);
          }
        },
        error: function() {
          callback(null);
        }
      });
    }
  };

  /**
    @params {Integer} itemId - the selected item id
    @method _addToFavorites - This method is used in order to call the service for add item to favorite list
    @private
    *
    *@NOTE: This functionallity was not implemente because the API requires too much information to be used 
    *       and I did not got the needed data by now.
  **/
  var _addToFavorites = function(idItem) {

    var url = _getUrlEtsyFavorites('active', idItem);
    console.log(url);
    console.log('@TODO: find API for add and remove items from favorites');
    // @TODO: find API for add and remove items from favorites

    /*$.post(url, {
          //"_nnc": "NzNkMmIyNTk2YmMwZTI0ZjNjODNiZDMwNTIwZjc5NDI3MTUyNzk2ZWNlY2Q0NjkyNmNiYmEyZmNjNmFlODA5ZCw3N2U2MTI4NmRkMWY0MmJmNzcyM2Q0OTM4ZjlkMzI0NDJkYWY0ZDQ0MzQwZjNlZWJiOGY1ODllNzdlZGJhMmY3LDE,",
          "is_fetching": false,
          "listing_id": 158730042,
          "collection": {
            "is_fetching": false,
            "id": 0,
            "key": EtsyAPI.key,
            //"collection_key": "MHw0MjAzNDg2Mg",
            //"name": "Artículos que me encantan",
            "privacy_level": "public",
            //"create_date": 1387579241,
            //"update_date": 1387579241,
            "is_favorites": true,
            "type": "favorites",
            //"relative_url": "/people/sebastianbattistelli/favorites/items-i-love",
            "context_enabled": false,
            //"_nnc": "NzNkMmIyNTk2YmMwZTI0ZjNjODNiZDMwNTIwZjc5NDI3MTUyNzk2ZWNlY2Q0NjkyNmNiYmEyZmNjNmFlODA5ZCw3N2U2MTI4NmRkMWY0MmJmNzcyM2Q0OTM4ZjlkMzI0NDJkYWY0ZDQ0MzQwZjNlZWJiOGY1ODllNzdlZGJhMmY3LDE,"
          },
          "collection_type": "favorites"
        },
        function(data, status) {
          console.log("Data: " + data + "\nStatus: " + status);
        });*/

    return;
  };
  // Returns the object needed by ...
  return {
    search: _search,
    addToFavorites: _addToFavorites
  };
})();
// If the DOM is ready, the let's go for it !
$(document).ready(App.initialize());