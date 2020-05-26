/* global require, module */
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    cssnano({
      reduceIdents: true,
      mergeIdents: true,
      discardDuplicates: true,
      discardUnused: true,
    }),
    autoprefixer({ grid: true, overrideBrowserslist: ['>1%'] })
  ],
};
