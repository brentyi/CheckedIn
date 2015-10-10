//define collections

Events = new Meteor.Collection("Events"); //list of ongoing events
Members = new Meteor.Collection("Members"); //collection of user info, associated with a (salted&hashed?) mac address
