import config from './config';


const removeUndefSpeed = speed => !speed ? 1.0 : speed
const removeUndefState = state => !state ? 'Playing' : state

export const progress = (status, now) => {
  var mySpeed = removeUndefSpeed(status.speed)

  if (status.state == 'Pausing') {
    mySpeed = 0.0
  }

  return (now - status.timeStamp) * mySpeed * config.accelerationFactor / 1000
}
