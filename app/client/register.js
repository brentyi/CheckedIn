
Template.state_registration.events({
    'submit form': function (event) {
      var name = $(".fullName").val();
      var email = $(".emailAddress").val();
      var phone = $(".phoneNumber").val();

    Members.insert ({
        name: name,
        email: email,
        phone: phone
        
    });

  }
});


