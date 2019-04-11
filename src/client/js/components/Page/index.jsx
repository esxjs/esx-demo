'use strict'
const React = require('react')
const Stories = require('../Stories')
const data = require('./data')
function pageFactory(type) {
  function Page({ navigationVisible }) {
    return (<main
        role="main"
        id="content"
        tabIndex="-1"
        aria-hidden={navigationVisible}
      >
        <Stories data={data} />
      </main>
    )
  }

  return Page
}

module.exports = pageFactory
