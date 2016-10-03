(function () {

  var inputForm = document.getElementById("inputForm");
  var buttonSearch = document.getElementById("buttonSearch");
  var searchTerm = document.getElementById("searchTerm");
  var loading = document.getElementById("loading");
  var title = document.getElementById("title");
  var inputDiv = document.getElementById("inputDiv");
  var RepoList = document.getElementById("list");

  document.addEventListener("DOMContentLoaded", init(), event);

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
          showRepoList(repos);
          loading.innerText = "";
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
    items.forEach(function (repo) {
      var li = list.appendChild(document.createElement('li'));
      a = document.createElement('a');
      a.href = repo.url;
      a.innerHTML = repo.name;
      li.appendChild(a);
    });
  }

  function clearPage() {
    searchTerm.value = "";
    clearList();
    title.removeAttribute("class");
    inputForm.removeAttribute("class");
  }

  function clearList() {
    RepoList.innerHTML = '';
  }
})();
