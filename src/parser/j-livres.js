module.exports = {
  parse (ret) {
    let $ = ret.$
    let bottomNews = $('div[class="blog-post-image"]')
    let topNews = $('div[class="img-featured-posts-image"]')
    let trending = $('div[class="trending-posts-title"]')
    let featured = $('div[class="featured-posts-image"]')
    let jumpFeatured = $('div[class="jumping-posts-image"]')
    let errorCounter = 0
    let allNews = []
    let link = ''

    for (var i = 0; i < bottomNews.length; i++) {
      try {
        link = bottomNews[i].children[1]
        allNews.push({
          href: link.attribs.href,
          title: link.attribs.title,
          img: link.children[1]
            ? link.children[1].attribs['data-cfsrc']
            : undefined
        })
      } catch (error) {
        console.log('error ' + error.message)
        errorCounter++
      }
    }

    for (i = 0; i < topNews.length; i++) {
      try {
        link = topNews[i].children[0].next
        allNews.push({
          href: link.attribs.href,
          title: link.attribs.title,
          img: link.children[0] && link.children[0].next
            ? link.children[0].next.attribs['data-cfsrc']
            : undefined
        })
      } catch (error) {
        console.log('error ' + error.message)
        errorCounter++
      }
    }

    for (i = 0; i < trending.length; i++) {
      try {
        link = trending[i].children[2].next
        allNews.push({
          href: link.attribs.href,
          title: link.attribs.title
        })
      } catch (error) {
        console.log('error ' + error.message)
        errorCounter++
      }
    }

    for (i = 0; i < featured.length; i++) {
      try {
        link = featured[i].children[1]
        allNews.push({
          href: link.attribs.href,
          title: link.attribs.title,
          img: link.children[1]
            ? link.children[1].attribs['data-cfsrc']
            : undefined
        })
      } catch (error) {
        console.log('error ' + error.message)
        errorCounter++
      }
    }

    for (i = 0; i < jumpFeatured.length; i++) {
      try {
        link = jumpFeatured[i].children[1]
        allNews.push({
          href: link.attribs.href,
          title: link.attribs.title,
          img: link.children[1]
            ? link.children[1].attribs['data-cfsrc']
            : undefined
        })
      } catch (error) {
        console.log('error ' + error.message)
        errorCounter++
      }
    }

    if (errorCounter) console.log(`${errorCounter} parsing errors`)
    return allNews
  }
}
