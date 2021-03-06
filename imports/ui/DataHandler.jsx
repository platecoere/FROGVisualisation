import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../api/events';
import Dataset from '../data';

import config from './config';

const accelerationFactor = config.accelerationFactor

const sendData = () => {
  Dataset.forEach( data => {
    if(data.TimeStamp < config.videoLength) {
      setTimeout(
        () => Meteor.call('insert.event', data),
        1000 * data.TimeStamp / accelerationFactor
      )
    }
  })
}

const wipeData = () => {
  Meteor.call('remove.all.event')
}

const DataHandler = ({ count }) => {
  return (<div>
    <h1> Data Handler </h1>
    <p>The database contains {count} event{count > 1 ? 's' : ''}</p>
    <button onClick={sendData}>SEND DATA</button>
    <button onClick={wipeData}>WIPE DATA</button>
  </div>)
}

export default createContainer(
  props => ({ 
    count: Events.find().count() 
  }),
  DataHandler
)
