(function () {

  var cache = {};

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function getReposFromCache(owner, name) {
    var getKey = owner + '|' + name;
         return cache[getKey]||null;


  }
  function setReposToCache(repoModel) {
    var setKey = repoModel.owner.login + '|' + repoModel.name;
       cache[setKey] = repoModel;
    console.log("cache",cache)
         }

})();
