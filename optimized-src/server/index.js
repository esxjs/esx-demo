const fastify = require('fastify')
const { existsSync, readFileSync } = require('fs')
const nodeFetch = require('node-fetch')
const { resolve } = require('path')
const routes = require('../client/routes')
const renderPage = require('./page.html.js')

function unhandledRejectionHandler(error) {
  console.error(error)
  process.exit(1)
}

function detectHttps() {
  const certPath = resolve(process.cwd(), 'ssl/certificate.pem')
  const keyPath = resolve(process.cwd(), 'ssl/private-key.pem')
  if (!existsSync(certPath) || !existsSync(keyPath)) return {}

  return { https: { key: readFileSync(keyPath), cert: readFileSync(certPath) }, http2: true }
}

function setupFetch(server) {
  global.fetch = async function(url, params) {
    // External call, just use node-fetch
    if (!url.startsWith('/api')) return nodeFetch(url, params)

    // Local fetching, serve with fastify.inject
    const response = await server.inject({ method: 'GET', url, ...params })

    response.status = response.statusCode
    response.statusText = response.statusMessage
    return new nodeFetch.Response(response.payload, response)
  }
}

async function main() {
  // Create the instance
  const server = fastify({ logger: { prettyPrint: process.env.NODE_ENV !== 'production' }, ...detectHttps() })

  // Add routes
  for (const { path, component } of routes) {
    for (const suffix of ['', '/page/:page']) {
      server.route({
        method: 'GET',
        url: `${path}${path === '/' && suffix ? suffix.substr(1) : suffix}`,
        handler: renderPage,
        config: {
          component,
        },
      })
    }
  }

  server.register(require('./api'))

  // Add application assets and manifest.json serving
  server.register(require('fastify-static'), { root: resolve(__dirname, '..', 'client'), prefix: '/' })
  server.register(require('fastify-compress'))
  server.decorateRequest('apiCache', require('memory-cache'))

  // Add server side support for fetch
  setupFetch(server)

  // Run the server!
  await server.listen(3000, '0.0.0.0')

  return server
}

process.on('unhandledRejection', unhandledRejectionHandler)
main().catch(unhandledRejectionHandler)
