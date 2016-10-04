(function () {

  var inputForm = document.getElementById("inputForm");
  var buttonSearch = document.getElementById("buttonSearch");
  var searchTerm = document.getElementById("searchTerm");
  var loading = document.getElementById("loading");
  var inputDiv = document.getElementById("inputDiv");
  var RepoList = document.getElementById("list");
  var spanButtonSearch = document.getElementById("spanButtonSearch");

  document.addEventListener("DOMContentLoaded", init, event);

  function init() {
    searchTerm.addEventListener("click", clearPage);
    inputForm.addEventListener("submit", enterSearchTerm);
    buttonSearch.addEventListener("click", clearList);
  }

  function enterSearchTerm(event) {
    event.preventDefault();
    loading.setAttribute("class", "loader loading-position");
    GAE.services.requestRepos(searchTerm)
      .then(
        function success(repos) {
          showRepoList(repos);
          loading.removeAttribute("class", "loader");
          inputForm.removeAttribute("class");
          spanButtonSearch.removeAttribute("class");
          searchTerm.setAttribute("class", "small-input");
          spanButtonSearch.setAttribute("class", "small-buttonSearch");
        },
        function error() {
          Promise.reject("HTTP request is failed");
          loading.innerText = "Error";
        }
      );
  }

  function showRepoList(items) {
    items.forEach(function (repo) {
      var caption = list.appendChild(document.createElement('caption'));
      a = document.createElement('a');
      var date = new Date(Date.parse(repo.updated_at));
      // a.href = repo.url;
      // a.innerHTML = repo.name;
      caption.appendChild(a);
      var source = document.getElementById("block-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = {
        ownerAvatarUrl: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        repoName: repo.name,
        repoDescription: repo.description,
        repoDate: date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes()
      };
      var html = template(context);
      var div = document.createElement("div");
      div.innerHTML = html;
      caption.appendChild(div)
    });
  }

  function clearPage() {
    searchTerm.value = "";
    clearList();
  }

  function clearList() {
    RepoList.innerHTML = '';
  }

})();
