'use strict'
const net = require('net')
const { promisify } = require('util')
const { spawn } = require('child_process')
const autocannon = require('autocannon')
const args = process.argv.slice(2)

const up = promisify(function up (port, cb) {
  const socket = net.connect(port)
    .on('error', () => setTimeout(up, 300, port, cb))
    .on('connect', () => {
      socket.end()
      cb()
    })
})

const when = () => {
  var _cb = null
  const fn = () => _cb()
  fn.done = promisify((cb) => _cb = cb) 
  return fn
}

run(args) // <-- main

async function run (args) {
  if (args.length === 0) args = ['unoptimized', 'optimized']
  for (const cmd of args) {
    await bench(cmd)
  }
}

async function bench (cmd) {

  process.stdout.write(`
======================= Benchmarking ${cmd} server =============================
  
`)

  const sp = spawn('npm', ['run', cmd], {stdio: ['ignore', 'ignore', 'inherit']})

  await up(3000)

  const benching = when()

  const instance = autocannon({
    url: 'http://localhost:3000',
    duration: 5
  }, benching)
  
  // this is used to kill the instance on CTRL-C
  process.once('SIGINT', () => {
    instance.stop()
  })
  
  // just render results
  autocannon.track(instance, {renderProgressBar: true})

  await benching.done()

  sp.kill()

  const closing = when()

  sp.once('close', closing)

  await closing.done()
  console.log('')
}