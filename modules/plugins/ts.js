define(['typescript', './text', './text!../../tsconfig.json'], function(ts, text, conf) {
  const confObj = JSON.parse(conf);
  return {
    load: function load(name, parentRequire, onload, config) {
      var fullName = parentRequire.toUrl(name);
      var fileName = fullName + '.tsx';
      text.load(fileName, parentRequire, function (content) {
        var conf = {};
        Object.keys(confObj).forEach(function (key) {
          conf[key] = confObj[key];
        });
        conf.moduleName = name;
        conf.fileName = fileName;
        var result = ts.transpileModule(content, conf);
        var js = result.outputText;
        var lines = js.split('\n');
        var firstLine = lines[0];
        lines[0] = firstLine.replace(/"(\..*?)"/g, function (match, gr1) {
          return '"plugins/ts!' + gr1 + '"';
        });
        js = lines.join('\n');
        onload.fromText(js);
      }, config);
    }
  };
});