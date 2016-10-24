(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function buildKey(owner, name) {
   return (owner + '|' + name) ;
  }

  function getReposFromCache(owner, name) {
    var key=buildKey(owner, name);
    try {
      var a = JSON.parse(localStorage.getItem(key));
      var startTime = Date.parse(a.time);
      var finishTime = new Date();
      var delta = (finishTime - startTime);
      console.log("delta", delta);
      if (delta >= 10000) {
        localStorage.removeItem(key);
        console.log("Data is taken from server");
      }
      else {
        console.log("Data is taken from cache");
        return a['response'];
      }
    }
    catch (err) {
      console.log("Data is taken from server");
    }
  }

  function setReposToCache(response) {
    var key=buildKey(response.owner.login, response.name);

    var startTime = new Date();
    var sCache = {
      response: response,
      time: startTime
    };
    localStorage.setItem(key, JSON.stringify(sCache));
  }

})();



