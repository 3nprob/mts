/* eslint no-console: 0 */
import path from 'path'
import fs from 'fs-extra'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { renderToString } from 'react-dom/server'
import winston from 'winston'
import expressWinston from 'express-winston'
import { serverAppStore } from '../../client/src/store/server'

async function handleRender(req, res) {
  const { App } = await import('../../client/src/serverRenderApp')

  const html = renderToString(<App location={req.url} />)

  const finalState = serverAppStore.getState()

  return fs.readFile(path.resolve(__dirname, './mts/index.html'), 'utf8', (err, data) => {
    const hrefStart = data.search('<link href="')
    const hrefEnd = data.search('.css')
    const cssFileName = data.substring(hrefStart + 13, hrefEnd + 4)

    let replacedData

    return fs.readFile(path.resolve(__dirname, cssFileName), 'utf8', (cssErr, cssData) => {
      if (err) {
        console.error(err)
        return res.status(500).send('An error occurred')
      }

      replacedData = data.replace(
        '<div id="app"></div>',
        `<div id="app">${html}</div><script>window.appDefaultState = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}</script>`,
      )

      replacedData = replacedData.replace('<title>MTS Client</title>', `<title>MTS Server</title><style type="text/css">${cssData}</style>`)

      return res.send(replacedData)
    })
  })
}

async function copyFiles() {
  try {
    if (!fs.existsSync(path.resolve(__dirname, 'mts/'))) {
      if (fs.existsSync(path.resolve(__dirname, '../../client/build/'))) {
        await fs.copy(path.resolve(__dirname, '../../client/build/'), path.resolve(__dirname, 'mts/'))
      }
      await fs.remove(path.resolve(__dirname, 'mts/report-modern.html'))
      await fs.remove(path.resolve(__dirname, 'mts/manifest.json'))
    }
  } catch (err) {
    console.error(err)
  }
}

copyFiles()

dotenv.config()

const server = express()
const router = express.Router()

server.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute(/* req, res */) {
      return false
    }, // optional: allows to skip some log messages based on request and/or response
  }),
)

server.use(cors())

router.get('/mts', (req, res) => handleRender(req, res))

server.use(router)

server.use(express.static(path.resolve(__dirname)))
server.use(express.static(path.resolve(__dirname, 'mts/static')))

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`???? MTS HTTP Server listening on port ${PORT}`)
})
