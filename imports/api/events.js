import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import config from '../ui/config.js';

export const Events = new Mongo.Collection('events');
export const Times = new Mongo.Collection('times'); // create a new collection for times
export const Speed = new Mongo.Collection('speed');
export const Status = new Mongo.Collection('status');



// -----------------------------------------------------------------
// TODO
// - When NewSpeed = 'None', use previous speed
// -----------------------------------------------------------------

const toWindow = (i, v) => Math.round(i/v) * v

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

    const mem = {}

    if (data.EventType == 'Video.Pause') { // each time we get the event 'Video.Pause', we add the time of the pause to the collection Times
		const x = toWindow(data.CurrentTime, config.windowSizePauses)
        if (x in mem) {
            ++mem[x]
        } else {
            Times.update(   
                {_id: data.VideoID}, 
                {$inc: {['data.' + x.toString() + '.' + data.StudentID ]: 1}},
                {upsert: true}
            )
            mem[x] = 1;
        }
        
        if (x == '610.0') {
            console.log("Student")
            console.log(data.StudentID)
            console.log("paused at")
            console.log(data.CurrentTime)
            console.log("----------------------")
        }
    }
  },

  'remove.all.event': () => {
    Events.remove({})
    Times.remove({})
    Status.remove({})
  }
  
})





