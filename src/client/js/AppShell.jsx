'use strict'
const React = require('react')
const routes = require('../routes')

const Component = routes[0].component

module.exports = function AppShell({ ssrPreloading }) {
  return (
    <Component ssrPreloading={ssrPreloading} />
  )
}