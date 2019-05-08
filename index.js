require('dotenv').config()

const PORT = process.env.PORT || 9000
const MODE = process.env.NODE_ENV || 'development'
const app = require('express')()
const urls = require('./config/urls')
const PACrawler = require('./src/crawler')
const crawler = new PACrawler()

// quick and dirty menu
let menu = '<div id="header">'
urls.forEach(link => {
  menu = menu.concat(` :: <a href="${link.path}">${link.name}</a>`)
})
menu = menu.concat(' :: </div><br>')

app.listen(PORT, () => {
  console.log('\x1b[1m\x1b[32m Service is listening (' +
		MODE + ' mode) on port ' + PORT + ' \x1b[0m')
})

// setup browser endpoints
app.get('/', (req, res) => { res.send(menu) })
urls.forEach(link => {
  app.get(link.path, async (req, res) => {
    console.log(link.path + ' request')
    let linkList = await crawler.grabLinks(link.url)
    res.send(menu + linkList)
    console.log('handled!')
  })
})

// export app for eventually do tests
module.exports = app
