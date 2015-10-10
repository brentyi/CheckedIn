//set default app state
Session.setDefault('state', 'home');

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

switchAppState = function(new_state, callback){
  var cb = callback;
  var ns = new_state;

  $('body').addClass('hidden');
  setTimeout(function(){
    Session.set('state', ns);
    $('body').removeClass('hidden');
    setTimeout(function(){
      cb && cb();
    }, 300);
  }, 350);
}
