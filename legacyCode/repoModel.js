(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.model = {};
  module.Repo = Repo;

  function Repo(items) {
    this.name = items.name;
    this.owner = items.owner;
    this.url = items.clone_url;
    this.description = items.description;
    this.updatedAt = Date.parse(items.updated_at);
    this.id = items.id;
    this.size = items.size;
    this.language = items.language;
    this.forks = items.forks;
  }

  Repo.prototype.getName = function () {
    return this.name;
  };

  Repo.prototype.getOwner = function () {
    return this.owner.login;
  };

  Repo.prototype.getAvatar = function () {
    return this.owner.avatar_url;
  };

  Repo.prototype.getUrl = function () {
    return this.url;
  };

  Repo.prototype.getDescription = function () {
    return this.description;
  };

  Repo.prototype.getUpdatedAt = function () {
    return this.updatedAt;
  };

  Repo.prototype.getId = function () {
    return this.id;
  };

  Repo.prototype.getSize = function () {
    return this.size;
  };

  Repo.prototype.getLanguage = function () {
    return this.language;
  };

  Repo.prototype.getForks = function () {
    return this.forks;
  };

  Repo.prototype.toRawObject = function () {
    return {
      name: this.getName(),
      owner: this.getOwner(),
      avatarUrl: this.getAvatar(),
      url: this.getUrl(),
      description: this.getDescription(),
      updatedAt: this.getUpdatedAt(),
      id: this.getId(),
      size: this.getSize(),
      language: this.getLanguage(),
      forks: this.getForks(),

    };
  }

})();
