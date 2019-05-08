const URL = 'https://theintercept.com'

module.exports = {
  parse(ret) {
    let $ = ret.$
    let titles = $('span[class=\"Promo-title-wrap\"]')
    let urls = $('a[class=\"Promo-link\"]')

    // TODO: map imgs
    let arr = []
    for (var i = 0; i < urls.length; i++) {
      arr.push(`<a href=${URL + urls[i].attribs.href}>link</a> ${titles[i].children[0].data}`)
    }
    return arr
  }
}
