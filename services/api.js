const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://benja:123@bananashop.tzmfwsy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/products', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('nombreDeTuBaseDeDatos');
    const products = database.collection('productos');
    const productsList = await products.find().toArray();
    res.json(productsList);
  } catch (error) {
    res.status(500).send('error en la api');
  } finally {
    await client.close();
  }
});

app.listen(5000, '0.0.0.0', () => console.log('Server started on 0.0.0.0:5000'));