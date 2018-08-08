const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


//allow app use cross-origin requests
app.use(cors());

mongoose.connect("mongodb://mido:test123@ds211592.mlab.com:11592/graphql-bookstore");
mongoose.connection.once('open', ()=> {
  console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({

  schema,
  graphiql: true
  
}))

app.listen(4000, () => {
  console.log('now listening on port 4000')
})