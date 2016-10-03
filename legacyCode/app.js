(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.services = {};

  var inputForm = document.getElementById("inputForm");
  var buttonSearch = document.getElementById("buttonSearch");
  var searchTerm = document.getElementById("searchTerm");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var inputDiv = document.getElementById("inputDiv");
  var RepoList = document.getElementById("list");

  window.onload = function () {
    init();
  };

  function init() {
    searchTerm.addEventListener("click", clearPage);
    inputForm.addEventListener("submit", enterSearchTerm);
    buttonSearch.addEventListener("click", clearList);
  }

  function enterSearchTerm(event) {
    event.preventDefault();
    loading.innerText = "Loading...";
    GAE.services.requestRepos(searchTerm)
      .then(
        function success(repos) {
          showRepoList(repos)
        },
        function error() {
          Promise.reject("HTTP request is failed");
          loading.innerText = "Error";
        }
      );
    title.removeAttribute("class");
    inputForm.removeAttribute("class");
  }

  function showRepoList(items) {
    loading.innerText = "";
    items.forEach(function (repo) {
      var li = list.appendChild(document.createElement('li'));
      a = document.createElement('a');
      a.href = repo.clone_url;
      a.innerHTML = repo.name;
      li.appendChild(a);
    });
  }

  function clearPage() {
    searchTerm.value = "";
    RepoList.parentNode.removeChild(RepoList);
    title.removeAttribute("class");
    inputForm.removeAttribute("class");
    location.reload();
  }

  function clearList() {
    if (RepoList.hasChildNodes() == true) {
      RepoList.innerHTML = '';
    }
  }
})();
