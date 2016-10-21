(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function getReposFromCache(owner, name) {
    var getKey = owner + '|' + name;
    var retCache = JSON.parse(localStorage.getItem(getKey));
    console.log("retCache", retCache);
    return retCache;

  }

  function setReposToCache(response) {
    var setKey = response.owner.login + '|' + response.name;
    var sCache = JSON.stringify(response);
    localStorage.setItem(setKey, sCache)
  }

})();
