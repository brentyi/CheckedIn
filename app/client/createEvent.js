Template.state_createEvent.events({
  "submit .createNewEvent": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get event information from the form
    var eventName = $("#textName").val();
    var eventOrganization = $("#textOrganization").val();
    var details = $("#textDetails").val();
    // Make new event with information in form
    var id = Events.insert({
      name: eventName,
      organization: eventOrganization,
      details: details,
      attendees: []
    });

    Session.set('event_id', id);

    switchAppState('hostingEvent');
  }
});

Template.state_hostingEvent.helpers({
  eventname: function(){
    return Events.findOne(Session.get('event_id')).name; 
  },
  attendees: function(){
    return Events.findOne(Session.get('event_id')).attendees; 
  }
});

Template.state_hostingEvent.events({
  'click #host_button': function(){
    if($('#host_button').html() == 'Scan'){
    bluetoothSerial.enable(
      function() {
        console.log("Bluetooth is enabled");
      },
      function() {
        console.log("The user did *not* enable Bluetooth");
      }
    );
// meteor add cordova:cordova-plugin-bluetooth-serial@0.4.4
    bluetoothSerial.discoverUnpaired([],
        function(device) {
            var x = device.id;
            alert(x);
        },
        function() {
            alert("It failed!!");
        }
    );
     bluetoothSerial.setDeviceDiscoveredListener (function(device){
        var x = device.id;
        Session.set('message','found '+x);
        var eid = Session.get('event_id');
        var user = Members.findOne(x);
        var attendees = Events.findOne(eid).attendees;
        if(!user)
          return;
        for(var i =0; i < attendees.length; i++){
        if(attendees[i]._id == x)
                return;
}
        Events.update(
          eid,
          {
            attendees: attendees.concat([user])
          }
        );
        },
        function() {
          alert("Bluetooth scan failed!!");
        }
      );
      
$('#host_text').text('Scanning... ');
//      $('#host_button').html('Finish');
    }else{
      switchAppState('home');
    }
  }
});
