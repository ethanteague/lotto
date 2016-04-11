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
          var doubleGamesDayCheck = dayGames.find({"title": this.game}, {"nums": this.winnum.day}, {"date": this.drawdate.day}).count();
          var doubleGamesNightCheck = nightGames.find({"title": this.game}, {"nums": this.winnum.eve}, {"date": this.drawdate.eve}).count();
          if (doubleGamesDayCheck == 0) {
            Meteor.call("dayGames", value.game, datevalue.day, value.winnum.day, function (error, result) {
              if (error) {
                //console.log(error.reason);
              } else {
                //console.log('successful insert');
              }
            });
          }

          if (doubleGamesNightCheck == 0) {
            Meteor.call("nightGames", value.game, datevalue.eve, value.winnum.eve, function (error, result) {
              if (error) {
                //console.log(error.reason);
              } else {
                //console.log('successful insert');
              }
            });
          }

        } else {
          var datevalue = new Date(value.drawdate);
          var ltDataCheck = ltGames.find({"title": this["game"]}, {"num": this["winnum"]}, {"date": this["drawdate"]}).count();
          if (ltDataCheck == 0) {
            Meteor.call("ltData", value.game, datevalue, value.winnum, function (error, result) {
              if (error) {
                //console.log(error.reason);
              } else {
                //console.log('successful insert');
              }
            });
          }
        }
      });
      callLotto();
    }, 10 * 1000); // Poll every two minutes, set to 120 * 1000.

    return theGames;
  }
});
