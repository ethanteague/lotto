// Grab our results.

callLotto = function () {
  var title = [];
  Meteor.call("stream", function (err, res) {
    xml = $.parseXML(res.content),
      xml = $(xml);
    xml.find("item").each(function (i, j) {

      var game = $(j).attr("game").toUpperCase();
      var descrip = $("description", this).text();
      if ($(j).attr("game") != "play4" && $(j).attr("game") != "cash3") {
        var winnum = $(j).attr("winnum");
        var drawdate = $(j).attr("windd");

      } else {
        var winnum = {
          "day": $(j).attr("winnumm"),
          "eve": $(j).attr("winnume")
        };
        var drawdate = {
          "day": $(j).attr("midd"),
          "eve": $(j).attr("eved")
        };
      }
      if (game !== "MEGA" && game !== "MMC") {
        title.push({
          "game": game,
          "winnum": winnum,
          "drawdate": drawdate,
          "description": descrip
        });
      }
    });

    //console.log(regGames);
    $.each(title, function () {

      NumA = this["winnum"];
      if (NumA.length) {
        splitNumA = NumA.split(/ X/);
        splitNumAMakeArray = splitNumA[0] ? splitNumA[0].split(/-| /) : splitNumA.split(/-| /);

        NumBpick = numStore.findOne({"title": this["game"]}, {sort: {"date": -1, limit: 1}});

        if (this["game"] !== "PLAY4" && this["game"] !== "CASH3") {
          if (NumBpick !== undefined) {
            splitNumB = NumBpick["_id"].split(/ X/);
            splitNumBMakeArray = splitNumB[0] ? splitNumB[0].split(/-| /) : splitNumB.split(/-| /);
            var sortedA = splitNumAMakeArray.sort(function (a, b) {
              return a - b;
            });
            var sortedB = splitNumBMakeArray.sort(function (a, b) {
              return a - b;
            });
            var matchesActual = getMatch(sortedA, sortedB);
            if (matchesActual.length) {
              Meteor.call("numberHits", this["game"], this["drawdate"], this["_id"], this["winnum"], matchesActual, function (error, result) {
                if (error) {
                  console.log(error.reason);
                } else {
                  console.log('successful insert');
                }
              });
            }
          }
        }
      }
    })
    Session.set("games", title);
  });
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
