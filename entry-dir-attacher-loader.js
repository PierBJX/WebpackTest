const path = require('path');

function recursiveIssuer(m) {
  if (m.issuer && m.issuer.context) {
    return recursiveIssuer(m.issuer);
  } else if (m.context) {
    return m.context;
  } else {
    return false;
  }
}

module.exports = function (content) {
  const entry = recursiveIssuer(this._module);
  const entryRelativePath = path.relative(this.rootContext, entry).replace('src/', '');
  this.resourceQuery = `?entryDir=${entryRelativePath}`;
  return content;
};
