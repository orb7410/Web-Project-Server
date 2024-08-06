const express = require('express')
const app = express()
const port = 2900
const cors = require('cors');

app.use(cors());

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL ERvq4uoMMR8GmYCD
const url = "mongodb://orb7410:ERvq4uoMMR8GmYCD@school-cluster.tjyzrz8.mongodb.net/?retryWrites=true&w=majority&appName=School-Cluster&directConnection=true";
const client = new MongoClient(url);

// Database Name
const dbName = 'aqyanoosDB';

const data = [
  {
      id: 1,
      imgSrc: 'https://pandorail.b-cdn.net/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/04/292633C01_1681171466104.png.webp',
      txt: "silver earrings"
  },
  {
      id: 2,
      imgSrc: 'https://pandorail.b-cdn.net/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/10/263002C01_1698134667429.png.webp',
      txt: "gold earrings"
  },
  {
      id: 3,
      imgSrc: 'https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/e/oer22102_1_jrysnutcof2uu1jd.jpg',
      txt: "rose gold earrings"
  },
  {
      id: 4,
      imgSrc: 'https://www.juniper-jewelry.com/cdn/shop/files/IMG_5637.png?v=1694583941&width=713.jpg',
      txt: "yellow gold ring with flower"
  },
  {
      id: 5,
      imgSrc: 'https://cdn.diamondf.co.il/images/Giant_9061.jpg',
      txt: "silver oval ring"
  },
  {
      id: 6,
      imgSrc: 'https://www.jb-jewelers.com/wp-content/uploads/2021/08/BR1390.1.13.01-1024x1024.png',
      txt: "silver bracelet"
  }
  ,
  {
      id: 7,
      imgSrc: 'https://media.beaverbrooks.co.uk/i/beaverbrooks/G117359_0/18ct-White-Gold-Diamond-Tennis-Bracelet-0117359?$PDP_M$',
      txt: "silver bracelet"
  }, 
  {
      id: 8,
      imgSrc: 'https://lovediamonds.com/wp-content/uploads/2021/12/F400_55.jpg',
      txt: "silver neckless"
  }
]

const dbConnect = async ()=> {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('jewlery');
  return collection;
}

app.get('/', (req, res) => {
  res.send('hey uri/!')
})

app.get('/products', async (req, res) => {
  const collection = dbConnect();
  const allJewleries = await collection.find({}).toArray()
  res.send(allJewleries);
  // res.send([{name: 'or"s earrings'}])
})

app.get('/product-details/:id',async (req, res) => {
  const params = req.params
  const collection = dbConnect();
  const allJewleries = await collection.find({id:parseInt(params.id)}).toArray()
  res.send(allJewleries);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})