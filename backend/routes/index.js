const rooms = require('./rooms.js');
const create_room = require("./create_room.js")

module.exports = function(app, db) {
  // rooms(app, db);
  create_room(app,db);
  // Other route groups could go here, in the future
};