module.exports = {
  parse (ret) {
    let $ = ret.$
    let urls = $('a')

    // remove duplicates && map img and link to same title
    let uniqueList = {}
    for (var i = 0; i < urls.length; i++) {
      if (urls[i].attribs.href && urls[i].attribs.title && !urls[i].attribs.class) {
        uniqueList[urls[i].attribs.title] = uniqueList[urls[i].attribs.title] || {}
        let imgs = urls[i].children.find(ch => ch.name === 'img')
        if (imgs) {
          uniqueList[imgs.attribs.title].img = imgs.attribs.src
        } else {
          uniqueList[urls[i].attribs.title].href = urls[i].attribs.href
        }
      }
    }

    // compose response
    let arr = []
    Object.keys(uniqueList).forEach((key, index) => {
      arr.push(`<a href=${uniqueList[key].href}>link</a> <a href=${uniqueList[key].img}>img</a> ${key}`)
    })
    return arr
  }
}
