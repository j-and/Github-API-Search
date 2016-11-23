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
  var pageContent;
  var pagination;
  var pageElement;
  $(document).on("DOMContentLoaded", init, event);

  var overlay;


  function init() {
    inputForm = $('#inputForm');
    buttonSearch = $('#buttonSearch');
    buttonNext = $('#buttonNext');
    buttonPrevious = $('#buttonPrevious');
    pagination = $('#pagination');
    pageElement = $('#pageElement');
    searchTerm = $('#searchTerm');
    loading = $('#loading');
    list = $('#list');
    message = $('#message');
    var sourceBlock = $('#block-template').html();
    buttonSearch.on("click", clearList);
    buttonPrevious.on("click", goToPreviousPage);
    buttonNext.on("click", goToNextPage);
    searchTerm.on("click", clearPage);
    GAE.filter.init(inputForm);
    inputForm.on("startSearch", enterSearchTerm);

    totalCount = $('#totalCount');
    totalCountLabel = $('#totalCountLabel');
    overlay = $('#overlay');
    GAE.modal.init();
    templateBlock = Handlebars.compile(sourceBlock);

    Handlebars.registerHelper('dateFormat', function (date) {
      return date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes();
    });


    list.on("click", "a.show-repo-details", function (event) {
      event.preventDefault();
      var data = this.dataset;
      GAE.modal.showRepoDetails(data.owner, data.name);
    });

    var params = GAE.utils.getParamsFromUrl();
    if (params.query) {
      searchTerm.val(params.query);
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
    message.html("Loading...");
    showBackground();

    GAE.utils.setParamsToUrl({
      query: searchTerm.val(),
      page: currentPage
    });
    GAE.services.requestRepos(searchTerm.val(), currentPage)
      .then(
        function success(obj) {
          showRepoList(obj);
          if (obj['repos'].length == 0) {
            message.html("No repositories is found");
            pagination.addClass("hidden");
          }
          else {
            message.html("");
            hideBackground();
            totalCountLabel.html("Total Count");
            totalCount.html(obj['pagesCount']);
          }
          if (currentPage <= 1) {
            buttonPrevious.addClass("disabled");
          }
          if (currentPage >= 2) {
            buttonPrevious.removeClass("disabled")
          }
          if (currentPage >= obj.pagesCount) {
            buttonNext.addClass("disabled");
          }
          else {
            buttonNext.removeClass("disabled");
          }
          inputForm.removeClass("start-input");
          inputForm.addClass("input");
          setPage(currentPage);

        },
        function error() {
          message.html("Enter correct name");
        }
      );
  }

  function showRepoList(obj) {
    var listContent = "";
    var repos = obj.repos;
    repos.forEach(function (repo) {
      var context = {
        repo: repo.toRawObject()
      };
      listContent += templateBlock(context);

    });

    list.html(listContent);
    pagination.removeClass("hidden");
    hideBackground();
  }


  function clearPage() {
    pagination.addClass("hidden");
    clearList();
    searchTerm.val("");
    window.location.hash = "";
    totalCountLabel.html("");
    totalCount.html("");
  }

  function clearList() {
    list.html("");
  }

  function goToPreviousPage(event) {
    event.preventDefault();
    if (searchTerm.val() && (currentPage > 1)) {
      currentPage--;
      loadRepoList(currentPage);
      buttonNext.removeClass("disabled");
      scroll(0, 0);
      return false;
    }
  }

  function setPage(currentPage) {
    pageElement.html(currentPage);
  }

  function goToNextPage(event) {
    event.preventDefault();
    if (searchTerm.val()) {
      pageContent = "";
      currentPage++;
      loadRepoList(currentPage);
      scroll(0, 0);
      return false;
    }
  }

  function hideBackground() {
    overlay.removeClass("background-window");
  }


  function showBackground() {
    overlay.addClass("background-window");
  }

})
();

