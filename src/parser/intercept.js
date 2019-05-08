const URL = 'https://theintercept.com'

module.exports = {
  parse (ret) {
    let $ = ret.$
    let titles = $('span[class="Promo-title-wrap"]')
    let urls = $('a[class="Promo-link"]')
    let imgs = $('img[class="ResponsiveImage-image"]')

    let arr = []
    for (var i = 0; i < urls.length; i++) {
      let news = {
        href: URL + urls[i].attribs.href,
        title: titles[i].children[0].data,
        img: imgs[i].attribs.src
      }
      arr.push(`<a href=${news.href}>link</a> <a href=${news.img}>img</a> ${news.title}`)
    }
    return arr
  }
}
