module.exports = {
  parse(ret) {
    let $ = ret.$
    let urls = $('a')
    let bottomNews = $('div[class="blog-post-image"]')
    let topNews = $('div[class="img-featured-posts-image"]')
    let trending = $('div[class="trending-posts-title"]')
    let featured = $('div[class="featured-posts-image"]')
    let jumpFeatured = $('div[class="jumping-posts-image"]')
    let allNews = []

    for (var i = 0; i < bottomNews.length; i++) {
      allNews.push({
        href: bottomNews[i].children[1].attribs.href,
        title: bottomNews[i].children[1].attribs.title,
        img: bottomNews[i].children[1].children[1].attribs['data-cfsrc']
      })
    }

    for (var i = 0; i < topNews.length; i++) {
      allNews.push({
        href: topNews[i].children[0].next.attribs.href,
        title: topNews[i].children[0].next.attribs.title,
        img: topNews[i].children[0].next.children[0].next.attribs['data-cfsrc']
      })
    }

    for (var i = 0; i < trending.length; i++) {
      allNews.push({
        href: trending[i].children[2].next.attribs.href,
        title: trending[i].children[2].next.attribs.title
      })
    }

    for (var i = 0; i < featured.length; i++) {
      allNews.push({
        href: featured[i].children[1].attribs.href,
        title: featured[i].children[1].attribs.title,
        img: featured[i].children[1].children[1].attribs['data-cfsrc']
      })
    }

    for (var i = 0; i < jumpFeatured.length; i++) {
      allNews.push({
        href: jumpFeatured[i].children[1].attribs.href,
        title: jumpFeatured[i].children[1].attribs.title,
        img: jumpFeatured[i].children[1].children[1].attribs['data-cfsrc']
      })
    }

    let arr = []
    allNews.forEach(news => {
      news.img
        ? arr.push(`<a href=${news.href}>link</a> <a href=${news.img}>img</a> ${news.title}`)
        : arr.push(`<a href=${news.href}>link</a> ${news.title}`)
    })
    
    return arr
  }
}
