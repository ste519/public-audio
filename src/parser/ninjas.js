module.exports = {
  parse (ret) {
    let $ = ret.$
    let urls = $('div[class="et_pb_image_container"]')
    let arr = []

    for (var i = 0; i < urls.length; i++) {
      let news = {
        href: urls[i].children[0].next.attribs.href,
        title: urls[i].children[1].children[1].attribs.alt,
        img: urls[i].children[1].children[1].attribs.src
      }

      arr.push(news)
    }

    return arr
  }
}
