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
    modalBody = $('#modalBody');
    myModal = $('#myModal');
    buttonCloseModal = $('#buttonCloseModal');
    var source = $('#tableRepoDetails-template').html();
    template = Handlebars.compile(source);
    buttonCloseModal.on("click", hideModal);
  }

  function showRepoDetails(owner, name) {
    myModal.modal('show');
    GAE.services.getRepoDetails(owner, name)
      .then(function (repo) {
        //console.log(repo)
        var context = {
          repo: repo.toRawObject()
        };
        modalBody.html(template(context));
        GAE.utils.setParamsToUrl({
          name: name,
          owner: owner
        });
      })
  }

  function hideModal() {
    GAE.utils.setParamsToUrl({
      name: null,
      owner: null
    });
  }

})();

