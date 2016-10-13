(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.modal = {};
  module.showRepoDetails = showRepoDetails;
  module.init = init;

  var template;
  var modalBody;
  var myModal;

  //document.addEventListener("DOMContentLoaded", init, event);

  function init() {
    modalBody = document.getElementById("modalBody");
    myModal = document.getElementById("myModal");
    var source = document.getElementById("tableRepoDetails-template").innerHTML;
    template = Handlebars.compile(source);
  }

  function showRepoDetails(owner, name) {
    $(myModal).modal('show');
    GAE.services.getRepoDetails(owner, name)
      .then(function (repo) {
        //console.log(repo)
        var context = {
          repo: repo.toRawObject(),
        };
        modalBody.innerHTML = template(context);
        window.location.hash = "query=" + searchTerm.value+"&owner=" + owner + "&name=" + name;
        GAE.utils.setParamsFromUrl();

      })
  }


})();

