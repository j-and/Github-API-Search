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
    inputForm = document.getElementById("inputForm");
    buttonSearch = document.getElementById("buttonSearch");
    searchTerm = document.getElementById("searchTerm");
    loading = document.getElementById("loading");
    RepoList = document.getElementById("list");
    message = document.getElementById("message");
    var source = document.getElementById("block-template").innerHTML;
    searchTerm.addEventListener("click", clearPage);
    inputForm.addEventListener("submit", enterSearchTerm);
    buttonSearch.addEventListener("click", clearList);

    GAE.modal.init();

    template = Handlebars.compile(source);

    $(list).on("click", "a", function () {
      var data = this.dataset;
      GAE.modal.showRepoDetails(data.owner, data.name);
    });

    var params = GAE.utils.getParamsFromUrl();
    console.log("params", params);

    if (params.query) {
      loadRepoListFrom();
    }
    if (params.owner && params.name) {
      //loadRepoListFromUrl(params.query);
      GAE.modal.showRepoDetails(params.owner, params.name);
    }
    // else {
    //   loadRepoListFromUrl(params.query);
    // }
  }

  function enterSearchTerm(event) {
    event.preventDefault();
    loadRepoList();
  }

  function loadRepoList() {
    message.innerHTML = "Loading...";
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
    window.location.hash = "query=" + searchTerm.value;
   // GAE.utils.setParamsFromUrl();
  }

   function clearPage() {
    searchTerm.value = "";
    GAE.utils.setParamsFromUrl("");
      clearList();
    window.location.hash = "";
  }

  function clearList() {
    RepoList.innerHTML = '';
  }

  function loadRepoListFromUrl(query) {
    searchTerm.value = query;
    loadRepoList();
  }

})();

