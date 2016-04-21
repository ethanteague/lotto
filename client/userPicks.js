Template.userPicks.helpers({

  data: function () {
    userPicks = numStore.find({}).fetch();


    return userPicks;
  }
});
