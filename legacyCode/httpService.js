(function () {

    var BASE_URL = 'https://api.github.com/';

    window.GAE = window.GAE || {};
    var module = window.GAE.services = {};
    module.requestRepos = requestRepos;
    module.getRepoDetails = getRepoDetails;

    function requestRepos(searchTerm) {
      var url = BASE_URL + "search/repositories?q=" + encodeURIComponent(searchTerm) + "+language:javascript&sort=stars&order=desc";
      var x = new XMLHttpRequest();
      return new Promise(function (resolve, reject) {
        x.onload = function () {
          if (this.status == 200) {
            var items = JSON.parse(x.responseText).items;
            resolve(parseItems(items))
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

    function getRepoDetails(owner, name) {
      var url = BASE_URL + "repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(name);
      console.log(url);
           var x = new XMLHttpRequest();
            return new Promise(function (resolve, reject) {
          x.onload = function () {
            if (this.status == 200) {
            var repoDetails = JSON.parse(x.responseText);
             resolve(new GAE.model.Repo(repoDetails));

          } else{
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

