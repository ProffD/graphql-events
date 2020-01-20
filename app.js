const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/events");

const app = express();
app.use(bodyParser.json());

var schema = buildSchema(`
   type Event {
       _id: ID!
       title: String!
       description: String!
       price: Float!
       date: String!
   }
   input EventInput {
     title: String!
       description: String!
       price: Float!
       date: String!
   }
   type RootQuery {
            events: [Event!]!
        }        
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema  {
             query: RootQuery
             mutation: RootMutation
    }
`);

app.use(
  "/api",
  graphqlHttp({
    schema: schema,
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event._doc._id.toString() };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: args.eventInput.date
        });

        return event
          .save()
          .then(results => {
            console.log("Event created succefully!");
            return { ...results._doc };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);
console.log("Starting Server and connecting to the database");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(results => {
    app.listen(3001, () => {
      console.log("Server is listening on port 3001");
    });
  })
  .catch(err => console.log(err));
