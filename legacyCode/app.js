(function () {

  var inputForm;
  var list;
  var template;
  var buttonSearch;
  var searchTerm;
  var loading;
  var message;
  document.addEventListener("DOMContentLoaded", init, event);

  function init() {
    inputForm = document.getElementById("inputForm");
    buttonSearch = document.getElementById("buttonSearch");

    searchTerm = document.getElementById("searchTerm");
    loading = document.getElementById("loading");
    list = document.getElementById("list");
    message = document.getElementById("message");
    var source = document.getElementById("block-template").innerHTML;
    searchTerm.addEventListener("click", clearPage);
    inputForm.addEventListener("submit", enterSearchTerm);
    buttonSearch.addEventListener("click", clearList);


    GAE.modal.init();

    template = Handlebars.compile(source);

    $(list).on("click", "a.show-repo-details", function (event) {
      event.preventDefault();

      var data = this.dataset;
      GAE.modal.showRepoDetails(data.owner, data.name);
    });

    var params = GAE.utils.getParamsFromUrl();
    //console.log("params", params);

    if (params.query) {
      searchTerm.value = params.query;
      loadRepoList();
    }
    if (params.owner && params.name) {
      GAE.modal.showRepoDetails(params.owner, params.name);
    }
  }

  function enterSearchTerm(event) {
    event.preventDefault();
    loadRepoList();
  }

  function loadRepoList() {
    message.innerHTML = "Loading...";
    GAE.utils.setParamsToUrl({
      query: searchTerm.value,
    });
    GAE.services.requestRepos(searchTerm.value)
      .then(
        function success(repos) {
          showRepoList(repos);
          message.innerHTML = "";
          if (repos.length == 0) {
            message.innerText = "No repositories is found";
          }
          inputForm.removeAttribute("class", "start-input");
          inputForm.setAttribute("class", "input");
        },
        function error() {
          message.innerText = "Enter correct name";
        }
      );
  }

  function showRepoList(repos) {
    var listContent = "";
    repos.forEach(function (repo) {
      var date = new Date(repo.updatedAt);
      var context = {
        repo: repo.toRawObject(),
        repoDate: date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes(),
      };
      listContent += template(context);
    });
    list.innerHTML = listContent;

  }

  function clearPage() {
    searchTerm.value = "";
    window.location.hash = "";
    clearList();
  }

  function clearList() {
    list.innerHTML = '';
  }

})();

