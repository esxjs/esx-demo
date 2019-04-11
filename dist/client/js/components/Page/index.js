'use strict';

const React = require('react');

const Stories = require('../Stories');

const data = require('./data');

function pageFactory(type) {
  function Page({
    navigationVisible
  }) {
    return React.createElement("main", {
      role: "main",
      id: "content",
      tabIndex: "-1",
      "aria-hidden": navigationVisible
    }, React.createElement(Stories, {
      data: data
    }));
  }

  return Page;
}

module.exports = pageFactory;