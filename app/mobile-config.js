// This section sets up some basic app metadata,
// the entire section is optional.

App.accessRule("http://*");
App.accessRule("https://*");

App.info({
  id: 'com.example.cal.hacks',
  name: 'CalHacks15',
  description: 'Lorem Ipsum',
  author: 'Brilloshqidley',
  email: 'contact@example.com',
  website: 'http://example.com'
});



/* TODO: logos + launch/splash screens
// Set up resources such as icons and launch screens.
App.icons({
});
App.launchScreens({
});
*/

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
