import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');
export const Times = new Mongo.Collection('times');
export const SlowSpeed = new Mongo.Collection('slow');
export const NormalSpeed = new Mongo.Collection('normal');
export const FastSpeed = new Mongo.Collection('fast');

Meteor.methods({

  'insert.event': (data) => {

    Events.insert(data)
    
    if (data.EventType == 'Video.Pause') {
		Times.update(
    		{_id: data.VideoID}, 
    		{$inc: {['data.' + (5 *Math.round(data.CurrentTime / 5)).toString()]: 1}},
    		{upsert: true}
    	)
    }

    // USED IN AREA CHART

    if (data.EventType == 'Video.NewSpeed') {
		SlowSpeed.update(
    		{_id: data.VideoID}, 
    		{$inc: {['data.' + (5 *Math.round(data.CurrentTime / 5)).toString()]: 1}},
    		{upsert: true}
    	)
    }

    if (data.EventType == 'Video.NewSpeed') {
		NormalSpeed.update(
    		{_id: data.VideoID}, 
    		{$inc: {['data.' + (5 *Math.round(data.CurrentTime / 5)).toString()]: 1}},
    		{upsert: true}
    	)
    }

    if (data.EventType == 'Video.NewSpeed') {
		FastSpeed.update(
    		{_id: data.VideoID}, 
    		{$inc: {['data.' + (5 *Math.round(data.CurrentTime / 5)).toString()]: 1}},
    		{upsert: true}
    	)
    }

    /*if (data.NewSpeed == '1.0') {

    } else if (data.NewSpeed == '1.0')
    else if ()*/

  },

  'remove.all.event': () => {
    Events.remove({})
    Times.remove({})
  }
  
})
