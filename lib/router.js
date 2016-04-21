FlowRouter.notFound = {
  // Subscriptions registered here don't have Fast Render support.
  subscriptions: function() {
  },
  action: function() {

  }
};

FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'lottoPicks',
      lowerContent: 'userPicks',
      bottom: 'ltGrab',
    });
  }
});

FlowRouter.route('/activity', {
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'insertEventForm'
    });
  }
});
