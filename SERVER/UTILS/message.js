<<<<<<< HEAD
var generateMessage = (from,text) =>{
 return {
  from,
=======
var generateMessage = (name,text) =>{
 return {
  name,
>>>>>>> a7171d7b211965550a96337d43ba08e1312d2c5f
  text,
  createdAt : new Date().getTime()
 }
}

module.exports = {generateMessage};