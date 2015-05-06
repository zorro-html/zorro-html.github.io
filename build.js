// read all doc
// get all info
// save as a json file

var docsMaker = require('./docs-maker/docs-maker');
var ZorroInfo = docsMaker.ZorroInfo;
var writeFile = docsMaker.writeFile;

var COMPONENT_KEY_LIST = [
  'z-typo',
  'z-table',
  'z-icon',
  'z-btn',
  'z-menu',
  'z-dropdown',
  'z-btn-group',
  'z-nav',
  'z-panel',
  'z-breadcrumb',
  'z-pagination',
  'z-dock',
  'z-grid',
  'z-bar',
  'z-input',
  'z-progress',
  'z-rmb',
  'z-tag',
  'z-time',
  'z-note',
  'z-phone',
  'z-dialog',
  'z-tooltip',
  'z-mask'
];

function getInfo(name, done) {
  var maker = new ZorroInfo(name, name + '/' + name + '.html');
  maker.ready = function () {
    done(this.info);
  };
}

function build(done) {
  var length = COMPONENT_KEY_LIST.length;
  var counter = 0;
  var result = {};

  COMPONENT_KEY_LIST.forEach(function (name) {
    getInfo(name, function (info) {
      result[name] = info[0];
      counter++;
      if (counter === length) {
        writeFile('info.js', 'var COMPONENT_INFO_MAP = ' + JSON.stringify(result), done);
      }
    });
  })
}

build(function () {
  console.log('done');
});
