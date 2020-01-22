const Event = require("../models/events");

module.exports = {
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
};
