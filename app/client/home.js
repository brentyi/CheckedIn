Template.state_home.events({
  'click #checkin_button': function(){
    //make bluetooth visible
  },
  'click #host_button': function(){
    switchAppState('createEvent');
  },
  'click #profile_button': function(){
    switchAppState('registration');
  }
});
