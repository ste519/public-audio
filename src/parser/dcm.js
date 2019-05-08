module.exports = {
  parse(ret) {
    let $ = ret.$
    let urls = $('a')
    // TODO: map img and link to the same title
    let arr = []
    for (var i = 0; i < urls.length; i++) {
      if (urls[i].attribs.href && urls[i].attribs.title && !urls[i].attribs.class) {
        let imgs = urls[i].children.find(ch => ch.name === 'img')
        if (imgs) {
          arr.push(`<a href=${imgs.attribs.src}>img</a> ${imgs.attribs.title}`)
        } else {
          arr.push(`<a href=${urls[i].attribs.href}>link</a> ${urls[i].attribs.title}`)
        }
      }
    }
    return arr
  }
}
