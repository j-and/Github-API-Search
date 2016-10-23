(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function getReposFromCache(owner, name) {
    var getKey = owner + '|' + name;
    var a = localStorage.getItem(getKey);
    if (a != null) {
      var startTime = Date.parse(localStorage.getItem(getKey).split('}').slice(-1));
      var finishTime = new Date();
      var delta = (finishTime - startTime);
      console.log("delta", delta);
      if (delta >= 10000) {
        console.log("clear");
        localStorage.clear()
      }
      return localStorage.split('}').splice(0, 32);
    }
  }

  function setReposToCache(response) {
    var setKey = response.owner.login + '|' + response.name;
    var startTime = new Date();
    var sCache = JSON.stringify(response) + startTime;
    localStorage.setItem(setKey, sCache);
  }

})();



