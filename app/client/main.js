//set default app state
Session.setDefault('state', 'home');

//global variable for bluetooth mac address
Session.set('bluetooth_mac', '00:00:00:00:00:00');

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
