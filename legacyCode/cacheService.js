(function () {

  var cache = {};

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function getReposFromCache(owner, name) {
    var getKey = owner + '|' + name;
    console.log("getKey", getKey);
   // if (getKey == setKey) {
      var cachedRepo = cache|| null;
      console.log("cachedRepo", cachedRepo);
   // }
  }

  function setReposToCache(repoModel) {
    var setKey = repoModel.owner.login + '|' + repoModel.name;
    console.log("setKey", setKey);
    cache.setKey = repoModel;
    console.log("cache", cache);
  }

})();
