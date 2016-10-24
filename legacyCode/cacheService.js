(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;

  function getReposFromCache(owner, name) {
    var getKey = owner + '|' + name;
    var a = JSON.parse(localStorage.getItem(getKey));
    try {
      var startTime = Date.parse(a.time);
      var finishTime = new Date();
      var delta = (finishTime - startTime);
      console.log("delta", delta);
      if (delta >= 10000) {
        localStorage.removeItem(getKey);
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
    var setKey = response.owner.login + '|' + response.name;
    var startTime = new Date();
    var sCache = {
      response: response,
      time: startTime
    };
    localStorage.setItem(setKey, JSON.stringify(sCache))
  }

})();



