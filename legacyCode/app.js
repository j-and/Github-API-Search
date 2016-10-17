(function () {

  var inputForm;
  var list;
  var templateBlock;
  var buttonSearch;
  var searchTerm;
  var loading;
  var message;
  var buttonNext;
  var buttonPrevious;
  var currentPage = 1;
  var pagination;
  var pageElement;
  $(document).on("DOMContentLoaded", init, event );

  function init() {
    inputForm = $('#inputForm')[0];
    buttonSearch = $('#buttonSearch')[0];
    buttonNext = $('#buttonNext')[0];
    buttonPrevious = $('#buttonPrevious')[0];
    pagination = $('#pagination')[0];
    pageElement = $('#pageElement')[0];
    searchTerm = $('#searchTerm')[0];
    loading = $('#loading')[0];
    list = $('#list')[0];
    message = $('#message')[0];
    var sourceBlock = $('#block-template').html();
    $(inputForm).on("submit", enterSearchTerm);
    $(buttonSearch).on("click", clearList);
    $(buttonPrevious).on("click", goToPreviousPage);
    $(buttonNext).on("click", goToNextPage);
    $(searchTerm).on("click", clearPage);

    GAE.modal.init();

    templateBlock = Handlebars.compile(sourceBlock);

    $(list).on("click", "a.show-repo-details", function (event) {
      event.preventDefault();
      var data = this.dataset;
      GAE.modal.showRepoDetails(data.owner, data.name);
    });

    var params = GAE.utils.getParamsFromUrl();
    //console.log("params", params);
    if (params.query) {
      searchTerm.value = params.query;
      if (params.page) {
        currentPage = (+params.page) || 1;
      }
      loadRepoList(params.page);
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
    $(message).html("Loading...");
    GAE.utils.setParamsToUrl({
      query: searchTerm.value,
      page: currentPage
    });
    GAE.services.requestRepos(searchTerm.value, currentPage)
      .then(
        function success(obj) {
          showRepoList(obj);
          if (!obj) {
            $(message).html("No repositories is found");
            $(pagination).addClass("hidden");
          }
          else {
            $(message).html("");
          }
          if (currentPage <= 1) {
            $(buttonPrevious).addClass("disabled");
          }
          if (currentPage >= 2) {
            $(buttonPrevious).removeClass("disabled")
          }
          if (currentPage >= obj.pagesCount) {
            $(buttonNext).addClass("disabled");
          }
          if (currentPage < obj.pagesCount) {
            $(buttonNext).removeClass("hidden");
          }
          $(inputForm).removeClass("start-input");
          $(inputForm).addClass("input");
        },
        function error() {
          $(message).html("Enter correct name");
        }
      );
  }

  function showRepoList(obj) {
    var listContent = "";
    var repos = obj.repos;
    repos.forEach(function (repo) {
      var date = new Date(repo.updatedAt);
      var context = {
        repo: repo.toRawObject(),
        repoDate: date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes(),
      };
      listContent += templateBlock(context);
    });
    $(list).html(listContent);
    $(pagination).removeClass("hidden");
  }

  function clearPage() {
    $(pagination).addClass("hidden");
    clearList();
    searchTerm.value = "";
    window.location.hash = "";
  }

  function clearList() {
    $(list).html("");
  }

  function goToPreviousPage(event) {
    event.preventDefault();
    if (searchTerm.value && (currentPage > 1)) {
      currentPage--;
      loadRepoList();
      setPage();
      $(buttonNext).removeClass("hidden");
    }
  }

  function setPage() {
    $(pageElement).html(currentPage);
  }

  function goToNextPage(event) {
    event.preventDefault();
    if (searchTerm.value) {
      var pageContent = "";
      currentPage++;
      loadRepoList(currentPage);
      setPage(currentPage);
    }
  }

})();

