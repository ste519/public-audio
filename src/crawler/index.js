const Crawler = require('promise-crawler')

var PACrawler = function() {
  this.crawler = new Crawler({
    maxConnections: 10,
    retries: 3
  })
}

PACrawler.prototype.grabLinks = async function(link) {
  try {
    // setup and request
    await this.crawler.setup()
    let ret = await this.crawler.request({ url: link.url })

    if (ret.statusCode === 403) {
      return '403 forbidden :('
    } else {
      let parser = require(`../parser/${link.path}`)
      let arr = parser.parse(ret)
      return JSON.stringify(arr, null, '<br>')
    }

    // destroy the instance
    process.nextTick(() => this.crawler.destroy())
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = PACrawler
