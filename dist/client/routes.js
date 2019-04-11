'use strict';

const pageFactory = require('./js/components/Page');

module.exports = [{
  path: '/',
  exact: true,
  component: pageFactory('top')
}];