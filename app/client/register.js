
Template.state_registration.events({
    'submit form': function (event) {
      event.preventDefault();
      var name = $(".fullName").val();
      var email = $(".emailAddress").val();
      var phone = $(".phoneNumber").val();

      Members.upsert ({
          _id: Session.get('bluetooth_mac'),
          name: name,
          email: email,
          phone: phone
      });

    Session.set('message', x);
  }
});


