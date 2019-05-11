# ☭ public-audio

The [Node.js](https://nodejs.org) based red brazilian crawler idealized by [MatGuzzo](http://lattes.cnpq.br/6679644870926297).
Built basicaly with node, express, promise-crawler and cheerio.
---
# ☭ Project File Structure
    .
    ├── config/urls    # newspaper websites to be crawled
    ├── src/crawler    # built with [promise-crawler](https://www.npmjs.com/package/promise-crawler)
    └── parser         # individual parsing strategies built with [cheerio](https://www.npmjs.com/package/cheerio)

# ☭ Demonstration

Check [here](https://pa.txto.com.br) for human readable version, and [here](https://pa.txto.com.br) for
the API.

# ☭ To-Do

* ☭ ~~crawl everything with a single request~~
* ☭ setup pre-commit linting
* ☭ create unitary tests
* ☭ improve error handling
* ☭ add new websites
