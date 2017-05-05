import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');
export const Times = new Mongo.Collection('times'); // create a new collection for times
export const Speed = new Mongo.Collection('speed');
export const Status = new Mongo.Collection('status');
// export const SlowSpeed = new Mongo.Collection('slow');
// export const NormalSpeed = new Mongo.Collection('normal');
// export const FastSpeed = new Mongo.Collection('fast');

Meteor.methods({

  'insert.event': (data) => {


    Events.insert(data);


    const u = {
        speed: parseFloat(data.NewSpeed),        // currentSpeed
        currentTime: parseFloat(data.CurrentTime),
        timeStamp: Date.now()
    }

    if (data.EventType == 'Video.Play') {
        u['state'] = 'Playing'
    }
    if (data.EventType == 'Video.Pause') {
        u['state'] = 'Pausing'
    }

    /*if (data.NewSpeed < 1.0) {
        u['tag'] = 1
    }
    if (data.NewSpeed == 1.0) {
        u['tag'] = 2
    }
    if (data.NewSpeed > 1.0) {
        u['tag'] = 3
    }*/


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

    // USED IN AREA CHART

    // a better idea would be to create only one collection : the collection Speed

    // if (data.EventType == 'Video.NewSpeed') {
    //     Speed.update(
    //         {_id: data.VideoID + data.StudentID }, 
    //         { data.NewSpeed]}},
    //         {upsert: true}
    //     )
    // }

    // ---------------------------------------------------------------------------------------------------

    /*if (data.EventType == 'Video.NewSpeed') {
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
    }*/

    /*if (data.NewSpeed == '1.0') {

    } else if (data.NewSpeed == '1.0')
    else if ()*/

  },

  'remove.all.event': () => {
    Events.remove({})
    Times.remove({})
    Status.remove({})
  }
  
})
