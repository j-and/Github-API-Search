(function () {

  var BASE_URL = 'https://api.github.com/';
  var per_page = 2;

  window.GAE = window.GAE || {};
  var module = window.GAE.services = {};
  module.requestRepos = requestRepos;
  module.getRepoDetails = getRepoDetails;
  module.getPagesCount = getPagesCount;

  function requestRepos(searchTerm, page) {
    var url = BASE_URL + "search/repositories?q=" + encodeURIComponent(searchTerm) + "&page=" + page + "&per_page=" + per_page;
    var x = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      x.onload = function () {
        if (this.status == 200) {
          var items = JSON.parse(x.responseText).items;
          //var response = x.responseText;
          var response = JSON.parse(x.responseText);

          var obj = {
            repos: parseItems(items),
            currentPage: page,
            pagesCount: getPagesCount(response)
          };
          resolve(obj);
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
      var repo = repos[i];
    }
    //console.log(repos) //to show properties of response (Object)
    return repos;
  }

  function getPagesCount(response) {
    console.log("response.total_count", response.total_count);
    var pagesCount = Math.ceil(response.total_count / per_page);
    console.log("pagesCount", pagesCount);
    return pagesCount;
  }

  function getRepoDetails(owner, name) {
    var url = BASE_URL + "repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(name);
    var x = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        x.onload = function () {
          if (this.status == 200) {
            var repoDetails = JSON.parse(x.responseText);
            resolve(new GAE.model.Repo(repoDetails));

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
})();
