'use strict'
const React = require('react')
const { hydrate } = require('react-dom')
const { AppShell } = require('./js/AppShell')

document.addEventListener('DOMContentLoaded', function() {
  // Rehydrate the application
  hydrate(<AppShell/>, document.getElementById('root'))

})
