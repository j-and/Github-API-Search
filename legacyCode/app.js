(function () {

  var inputForm;
  var RepoList;
  var template;
  var buttonSearch;
  var searchTerm;
  var loading;
  var message;

  document.addEventListener("DOMContentLoaded", init, event);

  function init() {
    message = document.getElementById("message");
    inputForm = document.getElementById("inputForm");
    buttonSearch = document.getElementById("buttonSearch");
    searchTerm = document.getElementById("searchTerm");
    loading = document.getElementById("loading");
    RepoList = document.getElementById("list");
    var source = document.getElementById("block-template").innerHTML;
    searchTerm.addEventListener("click", clearPage);
    inputForm.addEventListener("submit", enterSearchTerm);
    buttonSearch.addEventListener("click", clearList);
    template = Handlebars.compile(source);

    $(list).on("click", "a", function () {
      var data = this.dataset;
      GAE.modal.showRepoDetails(data.owner, data.name);
    });
  }

  function enterSearchTerm(event) {
    event.preventDefault();
    loading.setAttribute("class", "loader loading-position");
    GAE.services.requestRepos(searchTerm)
      .then(
        function success(repos) {
          showRepoList(repos);
          loading.removeAttribute("class", "loader");
          inputForm.removeAttribute("class", "start-input");
        },
        function error() {
          loading.removeAttribute("class", "loader");
          message.innerText = "No repositories is found";
        }
      );
  }

  function showRepoList(repos) {
    var listContent = "";
    repos.forEach(function (repo) {
      var date = new Date(repo.updatedAt);
      var context = {
        Repo: repo,
        repoDate: date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes()
      };
      listContent += template(context);
    });
    list.innerHTML = listContent;
  }

  function clearPage() {
    searchTerm.value = "";
    clearList();
  }

  function clearList() {
    RepoList.innerHTML = '';
  }
})();
