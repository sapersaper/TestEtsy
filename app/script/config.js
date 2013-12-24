/*jshint unused:false*/
'use strict';
/**
	@Object urlConst - This object is used to config the url
**/
var urlConst = {
  template: 'template/',
  script: 'script/'
},
  /**
	@Object EtsyAPI - This object is used to config the ETSY API
**/
  EtsyAPI = {
    key: 'dtleuaslkd6qxspmwfwzmgmq',
    urlSearch: 'https://openapi.etsy.com/v2/listings/{listingStates}.js?api_key={key}',
    urlFavorites: 'https://www.etsy.com/api/v2/ajax/collections/{key}/listings/{idItem}'
  };