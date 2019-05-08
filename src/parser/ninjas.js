module.exports = {
  parse(ret) {
    let $ = ret.$
    let urls = $('a')
    // TODO: grab and map imgs
    let arr = []
    for (var i = 0; i < urls.length; i++) {
      if (urls[i].attribs.href &&
        urls[i].children[0].data.length > 15) { // pretty ugly workaround
        console.log(urls[i])
        arr.push(`<a href=${urls[i].attribs.href}>link</a> ${urls[i].children[0].data}`)
      }
    }
    return arr
  }
}
