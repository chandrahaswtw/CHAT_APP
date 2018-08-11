var moment = require('moment');

var generateMessage = (from,text) =>{
  return {
  from,
  text,
  createdAt : moment().format('LT')
 }

}

var generateLocationMessage = (from,lat,lon) => {
return {
from,
url: `https://www.google.com/maps?q=${lat},${lon}`,
createdAt : moment().format('LT')
}
}

module.exports = {generateMessage,generateLocationMessage};