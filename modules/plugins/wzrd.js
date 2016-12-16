define([], function() {
  return {
    load: function load(name, parentRequire, onload, config) {
      var url = 'https://wzrd.in/standalone/' + name;
      parentRequire(['./text!' + url], function (js) {
        onload(js);
      });
    }
  };
});