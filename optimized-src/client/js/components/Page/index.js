'use strict'
const esx = require('esx')()
const Stories = require('../Stories')
esx.register({ Stories })
const data = require('./data')
function pageFactory(type) {
  function Page({ navigationVisible }) {
    return esx `<main
        role="main"
        id="content"
        tabIndex="-1"
        aria-hidden=${navigationVisible}
      >
        <Stories data=${data} />
      </main>`
    
  }

  return Page
}

module.exports = pageFactory
