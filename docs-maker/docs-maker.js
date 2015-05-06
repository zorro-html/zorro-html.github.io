/**
 * # Zorro Docs Maker
 * 
 * 1. read `@element` comment block in `z-*.html`
 *     - find `@attribute`, `@property`, `@method`, `@event`, `@example`
 * 2. generate demo page
 *     - convert description to markdown
 *     - show name, demo and code of each example
 */




(function (global) {
  var inNode = typeof module !== 'undefined' && module.exports;

  if (typeof DocsParser === 'undefined') {
    DocsParser = require('../docs-parser/docs-parser');
  }

  function trimEmptyLines(text) {
    return text.replace(/^([\n\r]+)|([\n\r]+)$/g, '');
  }

  function readFile(path, done) {

    function loadend(e) {
      done(null, this.response || '');
    }

    if (inNode) {
      require('fs').readFile(path, {encoding: 'utf8'}, done);
    }
    else {
      var request = new XMLHttpRequest();
      request.responseType = 'text';
      request.addEventListener('loadend', loadend);
      request.open("GET", path);
      request.send();
    }
  }

  function writeFile(path, data, done) {
    if (inNode) {
      require('fs').writeFile(path, data, {encoding: 'utf8'}, done);
    }
  }




  function ZorroInfo(name, path) {
    var encodedName = encodeURIComponent(name);
    this.name = name || '';
    this.path = path || '../' + encodedName + '/' + encodedName + '.html';
    this.init();
  };

  ZorroInfo.prototype.init = function() {
    this.readInfo(function (err, data) {
      if (data) {
        this.info = DocsParser.parse(data);
      }
      this.ready && this.ready();
    }.bind(this));
  };

  ZorroInfo.prototype.readInfo = function(done) {
    readFile(this.path, done);
  };

  ZorroInfo.prototype.genInfo = function () {
    return JSON.parse(JSON.stringify(this.info));
  };

  ZorroInfo.prototype.genREADME = function () {
    var info = this.info[0];
    var readmeResult = trimEmptyLines(info.description);
    var exampleResult;

    exampleResult = info.examples.map(function (example) {
      var title = '';
      if (example.name !== 'default') {
        title = '### ' + example.name + '\n\n';
      }
      return title + '```\n' + trimEmptyLines(example.description) + '\n```\n';
    }).join('\n');

    if (exampleResult) {
      readmeResult = readmeResult + '\n\n## Examples\n\n' + exampleResult;
    }

    return readmeResult;
  };




  if (inNode) {
    exports.ZorroInfo = ZorroInfo;
    exports.readFile = readFile;
    exports.writeFile = writeFile;
  }
  else {
    global.ZorroInfo = ZorroInfo;
    global.trimEmptyLines = trimEmptyLines;
  }
}(this));
