(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.modal = {};
  module.showRepoDetails = showRepoDetails;
  module.init = init;

  var template;
  var modalBody;
  var myModal;
  var buttonCloseModal;

  function init() {
    modalBody = document.getElementById("modalBody");
    myModal = document.getElementById("myModal");
    buttonCloseModal = document.getElementById("buttonCloseModal");
    var source = document.getElementById("tableRepoDetails-template").innerHTML;
    template = Handlebars.compile(source);
    buttonCloseModal.addEventListener("click", hideModal);
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
        GAE.utils.setParamsToUrl({
          name: name,
          owner: owner,
        });
      })
  }

  function hideModal() {
    console.log("aaa");
    window.location.hash = "query=" + searchTerm.value;
  }

})();

