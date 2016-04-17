Template.matchesActivity.helpers({

  data: function () {
    matches = _.uniq(numberHits.find({}, {
      sort: {title: -1}, fields: {title: true, date: true, picked: true, actual: true}
    }).fetch().map(function (x) {
      return x.title + " Date: " + x.date + " Picked: " + x.picked + " Actual: " + x.actual;
    }), true);

    return matches;
  }
});
