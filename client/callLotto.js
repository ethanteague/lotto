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
          "day": [$(j).attr("winnumm"), $(j).attr("midd"), "Day"],
          "eve": [$(j).attr("winnume"), $(j).attr("eved"), "Night"]
        };
        $.each(winnum, function (key, value) {
          title.push({
            "game": game + value[2],
            "winnum": value[0],
            "drawdate": value[1],
            "description": descrip
          });
        })
      }
      if (game !== "MEGA" && game !== "MMC" && game !== "PLAY4" && game !== "CASH3") {
        title.push({
          "game": game,
          "winnum": winnum,
          "drawdate": drawdate,
          "description": descrip
        });
      }
    });

    Session.set("games", title);
  });
}

