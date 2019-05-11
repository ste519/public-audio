module.exports = {
  parse (ret) {
    let $ = ret.$
    let high = $('h1[class="titulo"]')
    let urls = $('h2')
    high = high[0].children[0]

    let arr = []
    arr.push({
      href: high.attribs.href,
      title: high.children[0].data
    })

    for (var i = 0; i < urls.length; i++) {
      if (urls[i]) {
        var link = urls[i].children[0]
        arr.push({
          href: link.attribs.href,
          title: link.children[0].data
        })
      }
    }
    return arr
  }
}
