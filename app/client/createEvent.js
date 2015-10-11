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
              alert("oh hello:" + device.id);
              /*var x = device.id;
              var eid = Session.get('event_id');
              user = Members.findOne(x);
              user && alert(user.name);
              user && Events.update(
                eid,
                {
                  attendees: Events.findOne(eid).attendees.concat([user])
                }
              );*/
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
