(function () {

  var BASE_URL = 'https://api.github.com/';

  window.GAE = window.GAE || {};
  var module = window.GAE.services = {};
  module.requestRepos = requestRepos;

  function requestRepos(searchTerm) {
    var url = BASE_URL + "search/repositories?q=" + searchTerm.value + "+language:javascript&sort=stars&order=desc";
    var x = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      x.onload = function () {
        if (this.status == 200) {
          var items = JSON.parse(x.responseText).items;
          resolve(parseItems(items));
        } else {
          var error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };

      x.onerror = function () {
        reject("HTTP request is failed");
      };
      x.open('GET', url, true);
      x.send();
    })
  }

  function parseItems(items) {
    var repos = [], item;
    for (var i = 0; i < items.length; i++) {
      item = items[i];
      repos.push(new GAE.model.Repo(item));
    }
    console.log(items) //to show properties of response (Object)
    return repos;
  }
})();
