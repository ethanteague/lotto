Template.ltGrab.helpers({

  data: function () {
    theGames = Session.get("games");
    if (theGames === undefined || theGames === null) {
      callLotto(); // Need to initiate on page load.
    }
    Meteor.setInterval(function () {
      $.each(theGames, function (key, value) {
        if (value.game == "PLAY4" || value.game == "CASH3") {
          var datevalue = {
            "day": new Date(value.drawdate.day),
            "eve": new Date(value.drawdate.eve)
          };
          Meteor.call("twiceData", value.game, datevalue, value.winnum, function (error, result) {
            if (error) {
              //console.log(error.reason);
            } else {
              //console.log('successful insert');
            }
          });
        } else {
          console.log(value.drawdate);
          var datevalue = new Date(value.drawdate);
          console.log(datevalue);
          Meteor.call("ltData", value.game, datevalue, value.winnum, function (error, result) {
            if (error) {
              //console.log(error.reason);
            } else {
              //console.log('successful insert');
            }
          });
        }
      });
      callLotto();
    }, 10 * 1000); // Poll every two minutes, set to 120 * 1000.

    return theGames;
  }
});
