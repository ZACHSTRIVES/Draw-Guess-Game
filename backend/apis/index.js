const get_all_rooms = require('./get_all_rooms.js');


module.exports = function(app, db) {
  get_all_rooms(app,db);
  // Other route groups could go here, in the future
};