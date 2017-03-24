import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');

Meteor.methods({

  'insert.event': (data) => {
    Events.insert(data)
  },

  'remove.all.event': () => {
    Events.remove({})
  }
  
})
