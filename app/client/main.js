// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    ble.startScan([], function(device) {
		alert(JSON.stringify(device));
	},
	function() {
		alert("It failed!!");
	});
  }
});

bluetoothSerial.enable(
	function() {
		alert("it worked!!!");
	},
	function() {
		alert("It failed!!");
	});
/*bluetoothSerial.discoverUnpaired(function(devices) {
    devices.forEach(function(device) {
        alert((device.id) + " has been found!");
    })
}, function(){

	alert("No devices found");
});*/
