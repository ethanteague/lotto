Template.matchesActivity.helpers({

  data: function () {
    matches = _.uniq(numberHits.find({}, {
      sort: {title: -1}, fields: {title: true, date: true, picked: true, actual: true}
    }).fetch().map(function (x) {
      cleanTime = new Date(x.date).toISOString().slice(0, 10);

      a = x.actual.split(/-| /);
      p = x.picked.split(/-| /);
      var matchClean = '';
      for (i = 0; i < p.length; i++) {
        if (p[i] == a[i]) {
          matchClean += '<span class="badge match-highlight">' + p[i] + '</span>';
        }
        else {
          matchClean += '<span class="badge">' + p[i] + '</span>';
        }
      }

      return {game: x.title, time: cleanTime, actual: x.actual, picked: matchClean};
    }), true);
    return matches.slice(0, 5);
  }
});
