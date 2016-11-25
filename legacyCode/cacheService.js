(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.cache = {};
  module.getReposFromCache = getReposFromCache;
  module.setReposToCache = setReposToCache;
  module.getReadmeFromCache = getReadmeFromCache;
  module.setReadmeToCache = setReadmeToCache;

  function buildKey(owner, name) {
    return (owner + '|' + name);
  }

  function buildReadmeKey(owner, name) {
    return (owner + '|' + name + 'readme');
  }

  function getReposFromCache(owner, name) {
    var key = buildKey(owner, name);
    try {
      var item = localStorage.getItem(key);
      if (item) {
        var a = JSON.parse(item);
        if (checkTimeValidation(a)) {
          localStorage.removeItem(key);
          console.log("Data is taken from server");
        }
        else {
          console.log("Data is taken from cache");
          return a['responseText'];
        }
      }
    }
    catch (err) {
      console.log("Error!Data from server");
    }
  }

  function setReposToCache(response) {
    var key = buildKey(response.owner.login, response.name);
    var startTime = new Date();
    var sCache = {
      response: response,
      time: startTime
    };
    localStorage.setItem(key, JSON.stringify(sCache));
  }

  function getReadmeFromCache(owner, name) {
    var key = buildKey(owner, name);
    try {
      var item = localStorage.getItem(key);
      if (item) {
        var a = JSON.parse(item);
        if (checkTimeValidation(a)) {
          localStorage.removeItem(key);
          console.log("Readme is taken from server");
        }
        else {
          console.log("Readme is taken from cache");
          return a['readme'];
        }
      }

    }
    catch (err) {
      console.log("Error!Readme from server");
    }
  }

  function setReadmeToCache(owner, name, repoReadme) {
    var key = buildReadmeKey(owner, name);
    var startTime = new Date();
    var readmeCache = {
      readme: repoReadme,
      time: startTime
    };
    localStorage.setItem(key, JSON.stringify(readmeCache));
  }

  function checkTimeValidation(a) {
    var startTime = Date.parse(a.time);
    var finishTime = new Date();
    var delta = (finishTime - startTime);
    console.log("delta", delta);
    return delta >= 10000;
  }

})();



