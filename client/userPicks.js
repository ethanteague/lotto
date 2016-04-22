Template.userPicks.helpers({

  data: function () {
    userPicks = numStore.find().fetch();
    var groupedDates = _.groupBy(userPicks, 'title');
    cleanedItems = [];
    $.each(groupedDates, function () {
      // grab the most recent num pick
      cleanedItems.push(this.slice(-1).pop());
    })
    return cleanedItems;
  }
});
