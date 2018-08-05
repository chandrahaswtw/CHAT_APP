var moment = require('moment');
var date = moment();

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
createdAt : date.format('DD MMM, YYYY LTS')
}
}

module.exports = {generateMessage,generateLocationMessage};