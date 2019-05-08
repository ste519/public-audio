const Crawler = require('promise-crawler')

var PACrawler = function() {
  this.crawler = new Crawler({
    maxConnections: 10,
    // callback called for each crawled page
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
        throw error
      } else {
        done()
      }
    }
  })
}

PACrawler.prototype.grabLinks = async function(url) {
  // setup and request
  await this.crawler.setup()
  let ret = await this.crawler.request({ url: url })

  // server side response parsing using cheerio
  let $ = ret.$
  let urls = $('a')

  let arr = []
  for (var i = 0; i < urls.length; i++) {
    if (urls[i].attribs.href && urls[i].attribs.title && !urls[i].attribs.class) {
      arr.push(urls[i].attribs)
    }
  }

  if (ret.statusCode === 403) {
    return '403 forbidden :('
  } else {
    return JSON.stringify(arr, null, '<br>')
  }

  // destroy the instance
  process.nextTick(() => this.crawler.destroy())
}

module.exports = PACrawler
