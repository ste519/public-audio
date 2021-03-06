require('dotenv').config()

const PORT = process.env.PORT || 9000
const MODE = process.env.NODE_ENV || 'development'
const app = require('express')()
const urls = require('./config/urls')
const PACrawler = require('./src/crawler')
const crawler = new PACrawler()

//Setup db
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ste519:123@cluster0-9uig7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


// quick and dirty menu
let menu = '<div id="header">'
urls.forEach(link => {
  menu = menu.concat(` :: <a href="${link.path}">${link.name}</a>`)
})
menu = menu.concat(' :: </div><br>')

app.listen(PORT, () => {
  console.log('\x1b[1m\x1b[32m Service is listening (' +
		MODE + ' mode) on port ' + PORT + ' \x1b[0m')
})

// setup browser endpoints
app.get('/', (req, res) => { res.send(menu) })
urls.forEach(link => {
  app.get(link.path, async (req, res) => {
    console.log(link.path + ' request')
    let linkList = await crawler.grabLinks(link)
    let humanReadable = []
    linkList.forEach(link => {
      let img = link.img ? `<a href=${link.img}>[img]</a> ` : ''
      humanReadable.push(`${img}<a href=${link.href}>${link.title}</a>`)
    })
    res.send(menu + JSON.stringify(humanReadable, null, '<br>'))
    console.log('handled!')
  })
})

app.get('/list', async (req, res) => {
  let map = urls.map(listAll)
  let data = await Promise.all(map)
  //console.log(data[0]);

  client.connect(err => {
    const collection = client.db("test").collection("rss");
    for (list of data) {
      for (doc of list ) {
      doc["_id"] = doc["href"];
      delete doc["href"];
      try {
        collection.insertOne(doc, order=false, (err, res) => {
        });
      }
      catch {
        console.log("Error.")
      }
    }}

    client.close();
  });

  const spawn = require("child_process").spawn;
  const process = spawn('python',["./src/ins_scrapper.py"]);

  process.stdout.on('data', data => {
      console.log(data.toString());
  })

  res.send(JSON.stringify(data, 3, 3))
});

async function listAll (link) {
  return new Promise(async (resolve, reject) => {
    try {
      let linkNews = await crawler.grabLinks(link)
      resolve(linkNews)
    } catch (error) {
      reject(error)
    }
  })
}

// export app for eventually do tests
module.exports = app
