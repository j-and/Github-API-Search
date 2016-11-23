(function () {

  window.GAE = window.GAE || {};
  var module = window.GAE.filter = {};
  module.init = init;

  function init(elem) {
    elem.on("submit", debounce(f1, 2000));
    elem.on("keyup", debounce(f1, 2000));
  }

  function f1() {
    $(this).trigger("startSearch")
  }

  function debounce(f, ms) {
    var state = null;
    return function () {
      if (state) {
        clearTimeout(state);
        state = null;
      }
      var context = this,
        args = arguments;
      state = setTimeout(function () {
        state = null;
        f.apply(context, args);
      }, ms);
    }
  }

})();
