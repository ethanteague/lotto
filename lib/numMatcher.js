numMatcher = function () {
  var allGames = Session.get("games");
  var gameName = Session.get("gameName");
  if (gameName !== undefined) {
    var tempTitle = [];
    $.each(allGames, function (key, value) {
      if (value.game == gameName) {
        tempTitle.push({
          "game": gameName,
          "winnum": value.winnum,
          "drawdate": value.drawdate,
          "description": value.description
        });
      }
    })
    NumA = tempTitle[0].winnum;
    if (NumA.length) {
      splitNumA = NumA.split(/ X/);
      splitNumAMakeArray = splitNumA[0] ? splitNumA[0].split(/-| /) : splitNumA.split(/-| /);

      NumBpick = numStore.find({"title": tempTitle[0].game}, {sort: {"date": -1}, limit: 1}).fetch();

      if (NumBpick[0].title) {

        splitNumB = NumBpick[0].nums.split(/ X/);
        splitNumBMakeArray = splitNumB[0] ? splitNumB[0].split(/-| /) : splitNumB.split(/-| /);
        var sortedA = splitNumAMakeArray.sort(function (a, b) {
          return a - b;
        });
        var sortedB = splitNumBMakeArray.sort(function (a, b) {
          return a - b;
        });
        var matchesActual = getMatch(sortedA, sortedB);

        if (tempTitle[0].game == "PLAY4Day" || tempTitle[0].game == "PLAY4Night" || tempTitle[0].game == "CASH3Day" || tempTitle[0].game == "CASH3Night") {
          var matchesActual = getMatch(splitNumAMakeArray, splitNumBMakeArray);
        }

        if (matchesActual.length) {

          var numberHitsCheck = numberHits.find({user: this.userId, title: tempTitle[0].game, date: tempTitle[0].drawdate,
            datepicked: NumBpick[0].date, picked: NumBpick[0].nums, actual: tempTitle[0].winnum,
            matches: matchesActual}).fetch();

          if (numberHitsCheck < 1) {
            Meteor.call("numberHits", this.userId, tempTitle[0].game, tempTitle[0].drawdate, NumBpick[0].date, NumBpick[0].nums, tempTitle[0].winnum, matchesActual, function (error, result) {
              if (error) {
               // console.log(error.reason);
              } else {
               // console.log('successful insert');
              }
            });
          }
        }
      }
    }
  }
}

// Compare current drawing with picks
function getMatch(a, b) {
  var matches = [];
  for (var i = 0; i < a.length; i++) {
    for (var e = 0; e < b.length; e++) {
      if (a[i] === b[e]) matches.push(a[i]);
    }
  }
  return matches;
}