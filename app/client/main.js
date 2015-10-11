//set default app state
Session.set('state', 'registration');
var old_states = [];

//this is a hack
Session.set('loaded', false);

Session.set('bluetooth_mac', '');
Meteor.startup(function(){
  MacAddress.getMacAddress(
    function(macAddress) {
      //global variable for bluetooth mac address
      Session.set('bluetooth_mac', macAddress);
    },
    function(fail) {
      alert(fail);
    }
  );
}); 

Tracker.autorun(function(comp){
  console.log(Members.find().count());
  console.log(Session.get('bluetooth_mac'));
  if(Members.findOne(Session.get('bluetooth_mac'))){
    switchAppState('home', true);
    comp.stop();
  }
});

Tracker.autorun(function(comp){
  Events.find().forEach(function(obj){
    for(var i = 0; i < obj.attendees.length; i++){
      if(obj.attendees[i]._id == Session.get('bluetooth_mac' && !Session.get('checkedinto_' + obj.name))){
        alert('Checked into ' + obj.name);
        Session.set('checkedinto_' + obj.name);
      }
    }
  });
});

Template.body.helpers({
  addr: function(){
    return Session.get('bluetooth_mac');
  },
  state: function(){
    return Session.get('state') + " | " + Meteor.status().status;
  },
  msg: function(){
    return Session.get('message');
  }
});

Template.main_app.helpers({
  current_template: function(){
    return 'state_' + Session.get('state');
  }
});

Template.main_app.events({ //temp
  'click #save_test': function(){
    switchAppState($('#test').val());
  }
});

document.addEventListener("backbutton", function(){
  if(old_states.length == 0)
    return;

  var old = old_states.pop();
  old && switchAppState(old, true);
});

switchAppState = function(new_state, record_history, callback){
  var cb = callback;
  var ns = new_state;

  $('body').addClass('hidden');
  setTimeout(function(){
    if(!record_history){
      old_states.push(Session.get('state'));
    }
    Session.set('state', ns);
    $('body').removeClass('hidden');
    setTimeout(function(){
      cb && cb();
    }, 300);
  }, 350);
}
