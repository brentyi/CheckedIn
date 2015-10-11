Template.state_home.events({
  'click #checkin_button': function(){

    //make bluetooth visible
    bluetoothSerial.enable(
      function() {
        console.log("Bluetooth is enabled");
      },
      function() {
        console.log("The user did *not* enable Bluetooth");
      }
    );
 bluetoothSerial.showBluetoothSettings(
      function() {
        console.log("Bluetooth is enabled");
      },
      function() {
        console.log("The user did *not* enable Bluetooth");
      }
    );

// meteor add cordova:cordova-plugin-// meteor add cordova:cordova-plugin-bluetooth-serial@0.4.4
  },
  'click #host_button': function(){
    switchAppState('createEvent');
  },
  'click #profile_button': function(){
    switchAppState('registration');
  },
  'click #previous_button': function(){
    switchAppState('previousEvents');
  }

});


