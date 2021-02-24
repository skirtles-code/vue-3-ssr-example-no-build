const path = require('path')
const { readFile } = require('fs/promises')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const express = require('express')
const server = express()

const initApp = require('./app.js')

server.get('/js/vue.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/vue/dist/vue.global.js'))
})

server.get('/js/app.js', async (req, res) => {
  const app = await readFile(path.join(__dirname, 'app.js'))

  res.end(
    `
      (function() {
        const module = {};
        ${app}
        ;module.exports(Vue.createSSRApp).mount('#app')
      })()
    `
  )
})

server.get('/', async (req, res) => {
  const app = initApp(createSSRApp)

  const appContent = await renderToString(app)

  const html = `
    <html>
      <body>
        <h1>My First Heading</h1>
        <div id="app">${appContent}</div>
      </body>
      <script src="/js/vue.js"></script>
      <script src="/js/app.js"></script>
    </html>
  `

  res.end(html)
})

const port = 8080

server.listen(port)

console.log(`Server running on port ${port}`)
