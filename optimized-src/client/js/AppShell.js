'use strict'
const esx = require('esx')()

const routes = require('../routes')

const Component = routes[0].component
esx.register({ Component })

module.exports = function AppShell({ ssrPreloading }) {
  return esx `<Component ssrPreloading=${ssrPreloading} />`
}