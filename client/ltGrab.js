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
          var doubleGamesDayCheck = doubleGames.findOne({"title": this.game}, {"nums.day": this.winnum.day}, {"date.day": this.drawdate.day});
          console.log(doubleGamesDayCheck);
          var doubleGamesNightCheck = doubleGames.findOne({"title": this.game}, {"nums.eve": this.winnum.eve}, {"date.eve": this.drawdate.eve});
          console.log(doubleGamesDayCheck);
          console.log(doubleGamesNightCheck);
          if (doubleGamesDayCheck === undefined && doubleGamesNightCheck === undefined) {
            Meteor.call("doubleGames", value.game, datevalue, value.winnum, function (error, result) {
              if (error) {
                //console.log(error.reason);
              } else {
                //console.log('successful insert');
              }
            });
          }
        } else {
          var datevalue = new Date(value.drawdate);
          var ltDataCheck = ltGames.findOne({"title": this["game"]}, {"num": this["winnum"]}, {"date": this["drawdate"]});
          if (ltDataCheck === undefined) {
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
