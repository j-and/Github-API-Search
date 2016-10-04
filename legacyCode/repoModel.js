(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.model = {};
  module.Repo = Repo;

  function Repo(items) {
    this.name = items.name;
    this.owner = items.owner;
    this.url = items.clone_url;
    this.description = items.description;
    this.updated_at=items.updated_at;
    }

  Repo.prototype.getName = function () {
    return this.name;
  };

  Repo.prototype.getOwner = function () {
    return this.owner.login;
  };

  Repo.prototype.getAvatar = function () {
    return this.owner.avatar_owner;
  };

  Repo.prototype.getUrl = function () {
    return this.url;
  }

  Repo.prototype.getDescription = function () {
    return this.description;
  }

  Repo.prototype.getUpdated_at = function () {
        return this.updated_at;
  }

  })();
