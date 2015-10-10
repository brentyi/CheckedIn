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

  $('body').animate({
      opacity: 0
    }, 400, function(){
      Session.set('state', new_state);
    }
  );

  setTimeout(function(){
    $('body').animate({
      opacity: 1
    }, 400, function(){
      cb || cb();
    });
  }, 500);
}
