(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.model = {};
  module.Repo = Repo;

  function Repo(items) {
    this.name = items.name;
    this.owner = items.owner;
    this.url = items.clone_url;
  }

  Repo.prototype.getName = function () {
    return this.name;
  };

  Repo.prototype.getOwner = function () {
    return this.owner.login;
  };

  Repo.prototype.getUrl = function () {
    return this.url;
  }

})();
