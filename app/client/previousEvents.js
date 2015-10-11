Template.state_previousEvents.events({
  'click #FirstEvent': function(){
    switchAppState('FirstGeneralMeeting');  
  },
  'click #SecondEvent': function(){
    switchAppState('OfficerMeeting');  
  },
  'click #ThirdEvent': function(){
    switchAppState('SecondGeneralMeeting');  
  }

});