Template.state_home.events({
  'click #checkin_button': function(){
    //make bluetooth visible
    ble.enable(
        function() {
            console.log("Bluetooth is enabled");
        },
        function() {
            console.log("The user did *not* enable Bluetooth");
        }
    );

    ble.startScan([],
        function(device) {
            alert(JSON.stringify(device));
        },
        function() {
            alert("It failed!!");
        }
    );
  },
  'click #host_button': function(){
    switchAppState('createEvent');
  },
  'click #profile_button': function(){
    switchAppState('registration');
  }
});


