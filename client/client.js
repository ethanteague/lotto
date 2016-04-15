// Startup
Meteor.startup(function () {
  BlazeLayout.setRoot("body");
})

// Templates
Template.registerHelper('_', function () {
  return _;
})

// Subscriptions
Tracker.autorun(function () {
  Meteor.subscribe("numberHits");
  Meteor.subscribe("numStore");
  Meteor.subscribe("ltGames");
});
