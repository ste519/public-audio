module.exports = {
  parse(ret) {
    let $ = ret.$
    let urls = $('a')
    // TODO: grab and map imgs
    // TODO: remove duplicates
    let arr = []
    for (var i = 0; i < urls.length; i++) {
      if (urls[i].attribs.href && urls[i].attribs.title && !urls[i].attribs.class) {
        arr.push(`<a href=${urls[i].attribs.href}>link</a> ${urls[i].attribs.title}`)
      }
    }
    return arr
  }
}
