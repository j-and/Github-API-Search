(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.utils = {};
  module.getParamsFromUrl = getParamsFromUrl;
  module.setParamsToUrl = setParamsToUrl;

  function getParamsFromUrl() {
    var urlParams = {};
    var urlPairParams = [];
    var hash = window.location.hash.substring(1);
    if (hash) {
      urlPairParams = hash.split('&');
      for (var i = 0, pair; i < urlPairParams.length; i++) {
        pair = urlPairParams[i].split('=');
        urlParams[pair[0]] = pair[1];
      }
    }
    return urlParams;
  }

  function setParamsToUrl(params) {
    var getParams = getParamsFromUrl();
    var resultParams = Object.assign(getParams, params);
    var urlArray = [];
    var str;
    for (var key in resultParams) {
      str = key + "=" + resultParams[key];
      urlArray.push(str);
    }
    window.location.hash = urlArray.join('&');
  }

})();

