
Template.state_registration.events({
    'submit form': function (event) {
      event.preventDefault();
      var name = $(".name").val();
      var email = $(".email").val();
      var phone = $(".phone").val();

      Members.insert ({
          _id: Session.get('bluetooth_mac'),
          name: name,
          email: email,
          phone: phone
      });

    Session.set('message', x);
  }
});


