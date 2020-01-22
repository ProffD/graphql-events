const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.use(
  "/api",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);
console.log("Starting Server and connecting to the database...");
mongoose
  .connect(
    "mongodb+srv://proffd:vx1800@first-cluster-vq17o.mongodb.net/events-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(results => {
    app.listen(3001, () => {
      console.log("Server is listening on port 3001");
    });
  })
  .catch(err => console.log(err));
