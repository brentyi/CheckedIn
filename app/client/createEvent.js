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
      var discint = setInterval(function(){
      if(Session.get('state') != hostingEvent){
        clearInterval(discint);
      }
      bluetoothSerial.discoverUnpaired(
        function() {
        },

        function() {
          console.log("discoverUnpaired failure");
        }
      );}, 1000);

      bluetoothSerial.setDeviceDiscoveredListener(function(device) {
        var x = device.id;
        var eid = Session.get('event_id');
        var user = Members.findOne(x);
        var attendees = Events.findOne(eid).attendees;
        if(!user || attendees.indexOf(user) != -1)
          return;
        
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
      $('#host_button').html('Finish');
    }else{
      switchAppState('home');
    }
  }
});
