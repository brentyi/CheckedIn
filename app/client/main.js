//set default app state
Session.set('state', '');

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

Tracker.autorun(function(){
  if(!Session.get('loaded') && Members.findOne()){
    if(Members.findOne(Session.get('bluetooth_mac'))){
      switchAppState('home');
    }else{
      switchAppState('registration');
    }
  }
});

Template.body.helpers({
  addr: function(){
    return Session.get('bluetooth_mac');
  },
  state: function(){
    return Members.findOne(Session.get('bluetooth_mac'))._id + "|" + Session.get('state') + " | " + Meteor.status().status;
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
  var old = Session.get('old_state');
  old && Session.set('old_state', Session.get('state'));
  old && switchAppState(old);
});

switchAppState = function(new_state, callback){
  var cb = callback;
  var ns = new_state;

  $('body').addClass('hidden');
  setTimeout(function(){
    Session.set('old_state', Session.get('state'));
    Session.set('state', ns);
    $('body').removeClass('hidden');
    setTimeout(function(){
      cb && cb();
    }, 300);
  }, 350);
}
