 Template.body.events({
    "submit .createNewEvent": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get event information from the form
      var eventName = $(".textName").val();
      var eventOrganization = $(".textOrganization").val();
      var details = $(".textDetails").val();
      // Make new event with information in form
      Events.insert({
        name: eventName,
        organization: eventOrganization,
        details: details,
        createdAt: new Date() // current time
      });
 
    }
  });
