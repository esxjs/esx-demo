'use strict';

const React = require('react');

module.exports = function Stories({
  data: stories,
  location
}) {
  if (stories) {
    if (stories.length === 0) {
      return React.createElement("div", null, "No further items to display.");
    }

    const startingNumber = 0;
    return React.createElement("div", {
      start: startingNumber
    }, stories.filter(Boolean).map((story, index) => {
      const count = index === 0 ? startingNumber : index + startingNumber;
      return React.createElement("article", {
        key: story.id
      }, React.createElement("div", null, count), React.createElement("h2", null, React.createElement("a", {
        href: story.url
      }, story.title)), React.createElement("div", {
        suppressHydrationWarning: true
      }, story.score, " points by ", story.by.id));
    }));
  }
};