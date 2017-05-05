import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');
export const Times = new Mongo.Collection('times'); // create a new collection for times
export const Speed = new Mongo.Collection('speed');
export const Status = new Mongo.Collection('status');


// -----------------------------------------------------------------
// TODO
// - When NewSpeed = 'None', use previous speed
// -----------------------------------------------------------------

const p = parseFloat

const func = x => {
    if (isNaN(x)) {
        return 1.0
    } else {
        return x
    }
}

Meteor.methods({

  'insert.event': (data) => {

    Events.insert(data);

    const u = {
        //speed: func(p(data.NewSpeed)),        // currentSpeed
        currentTime: p(data.CurrentTime),
        timeStamp: Date.now()
    }

    if (data.EventType == 'Video.Play') {
        u['state'] = 'Playing'
    }

    if (data.EventType == 'Video.Pause') {
        u['state'] = 'Pausing'
    }
    
    if (data.NewSpeed != 'None') {
        u['speed'] = p(data.NewSpeed)
    }

    Status.update(
        {_id: data.StudentID},
        u,
        {upsert: true}
    )
    
    if (data.EventType == 'Video.Pause') { // each time we get the event 'Video.Pause', we add the time of the pause to the collection Times
		Times.update(
    		{_id: data.VideoID}, 
    		{$inc: {['data.' + (5 * Math.round(data.CurrentTime / 5)).toString()]: 1}},
    		{upsert: true}
    	)
    }
  },

  'remove.all.event': () => {
    Events.remove({})
    Times.remove({})
    Status.remove({})
  }
  
})
