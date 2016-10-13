(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.utils = {};
  module.getParamsFromUrl = getParamsFromUrl;
  module.setParamsFromUrl = setParamsFromUrl;


  function getParamsFromUrl() {
    var urlParams = {};
    var urlPairParams = [];

    var hash = window.location.hash.substring(1);
    if (hash) {
      urlPairParams = hash.split('&');
      console.log("urlPairParams", urlPairParams);
      for (var i = 0, pair; i < urlPairParams.length; i++) {
        pair = urlPairParams[i].split('=');
        urlParams[pair[0]] = pair[1];
      }
    }
    return urlParams;
  }

  function setParamsFromUrl(owner, name) {
    console.log("owner, name", owner, name);
    var getParams = getParamsFromUrl();
    if (!window.location.hash) {
      window.location.hash = "query=" + searchTerm.value;
    }
    else {
      if (owner != undefined && name != undefined) {
        console.log("SS ");
        window.location.hash = "query=" + searchTerm.value + "&owner=" + getParams.owner + "&name=" + getParams.name;
      }
    }
  }

})();

