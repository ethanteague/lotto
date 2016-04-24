Template.matchesActivity.helpers({

  data: function () {
    matches = _.uniq(numberHits.find({}, {
      sort: {title: -1}, fields: {title: true, date: true, picked: true, actual: true}
    }).fetch().map(function (x) {
      cleanTime = new Date(x.date).toISOString().slice(0, 10);
      return {game: x.title, time: cleanTime, actual: x.actual, picked: x.picked};
    }), true);
    return matches.slice(0, 5);
  }
});
