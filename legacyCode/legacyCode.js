function enterSearchTerm(event) {
  event.preventDefault();
  var searchTerm = document.getElementById("searchTerm");
  requestRepos(searchTerm);
}

function requestRepos(searchTerm) {
  var BASE_URL = 'https://api.github.com/';
  var url = `${BASE_URL}search/repositories?q=${searchTerm.value}+language:javascript&sort=stars&order=desc`;
  var x = new XMLHttpRequest();
  x.onreadystatechange = function () {
    if (x.readyState == XMLHttpRequest.DONE) {
      if (x.status != 200) {
        console.log("Error: x.status=" + x.status + ': ' + x.statusText); // пример вывода: 404: Not Found
        document.getElementById("loading").innerText = "Error";
      }
      var items = JSON.parse(x.responseText).items;
      parseItems(items);
    }

    function parseItems(items) {
      var repos = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        repos.push(new Repo(item));
      }
      showRepoList(items);
    }
  };
  x.open("GET", url, true);
  x.send();
  document.getElementById("loading").innerText = "Loading...";
}

function showRepoList(items) {
  document.getElementById("loading").innerText = "";
  items.forEach(function (repo) {
    var li = list.appendChild(document.createElement('li'));
    a = document.createElement('a');
    a.href = repo.clone_url;
    a.innerHTML = repo.name;
    li.appendChild(a);
  });
}

function clearPage() {
  document.getElementById("searchTerm").value = "";
  var RepoList = document.getElementById("list");
  RepoList.parentNode.removeChild(RepoList);
  location.reload();
}

function clearList() {
  var RepoList = document.getElementById("list");
  if (RepoList.hasChildNodes() == true) {
    RepoList.innerHTML = '';
  }
}

var Repo = function (items) {
  this.name = items.name;
  this.getName = this.getName();

  this.owner = items.owner;
  this.getOwner = this.getOwner();

  this.url = items.clone_url;
  this.getUrl = this.getUrl();
};
Repo.prototype.getName = function () {
  return this.name;
};

Repo.prototype.getOwner = function () {
  console.log("this.owner.login", this.owner.login)
  return this.owner.login;
};

Repo.prototype.getUrl = function () {
  return this.url;
};
