(function () {

  var BASE_URL = 'https://api.github.com/';
  var per_page = 2;

  window.GAE = window.GAE || {};
  var module = window.GAE.services = {};
  module.requestRepos = requestRepos;
  module.getRepoDetails = getRepoDetails;
  module.getPagesCount = getPagesCount;
  module.getRepoReadme = getRepoReadme;

  function requestRepos(searchTerm, page) {
    var url = BASE_URL + "search/repositories?q=" + encodeURIComponent(searchTerm) + "&page=" + page + "&per_page=" + per_page;
    var x = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      x.onload = function () {
        if (this.status == 200) {
          var response = JSON.parse(x.responseText);
          var items = response.items;
          var obj = {
            repos: parseItems(items),
            currentPage: page,
            pagesCount: getPagesCount(response)
          };
          resolve(obj);
         // console.log('items', items);
          return (response)
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
    // console.log(repos) //to show properties of response (Object)
    return repos;
  }

  function getPagesCount(response) {
    return Math.ceil(response.total_count / per_page);
  }

  function getRepoDetails(owner, name) {
    var cachedRepo = GAE.cache.getReposFromCache(owner, name);
    if (cachedRepo) {
      return Promise.resolve(new GAE.model.Repo(cachedRepo))
    }
    else {
      var url = BASE_URL + "repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(name);
      var x = new XMLHttpRequest();
      return new Promise(function (resolve, reject) {
          x.onload = function () {
            if (this.status == 200) {
              var repoDetails = JSON.parse(x.responseText);
              var repoModel = new GAE.model.Repo(repoDetails);
              GAE.cache.setReposToCache(repoDetails);
              resolve(repoModel);
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
          x.send()
        }
      )
    }
  }


  function getRepoReadme(owner, name) {
    var cachedReadme = GAE.cache.getReadmeFromCache(owner, name);
    if (cachedReadme) {
      return Promise.resolve(cachedReadme)
    }
    else {
      var url = BASE_URL + "repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(name) + '/readme';
      var x = new XMLHttpRequest();
      return new Promise(function (resolve, reject) {
          x.onload = function () {
            if (this.status == 200) {
              var repoReadme = (x.responseText);
              GAE.cache.setReadmeToCache(owner, name, repoReadme);
              resolve(repoReadme);
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
          x.setRequestHeader('Accept', 'application/vnd.github.html+json');
          x.send()
        }
      )
    }
  }
})();
