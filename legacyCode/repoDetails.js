(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.modal = {};
  module.showRepoDetails = showRepoDetails;

  var template;
  var modalBody;
  var myModal;

  document.addEventListener("DOMContentLoaded", init, event);

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
        var context = {
          Repo: repo,
        };
        modalBody.innerHTML = template(context);
      })
  }
})();

