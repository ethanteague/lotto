Template.ltGrab.helpers({

  data: function () {
    theGames = Session.get("games");
    if (theGames === undefined || theGames === null) {
      callLotto(); // Need to initiate on page load.
    }
    Meteor.setInterval(function () {
      $.each(theGames, function (key, value) {

        var datevalue = new Date(value.drawdate);
        var ltDataCheck = ltGames.find({"title": this.game}, {"num": this.winnum}, {"date": this.drawdate}).count();
        var numSaveVar = value.winnum;

        if (ltDataCheck == 0) {
          Meteor.call("ltData", value.game, datevalue, numSaveVar, function (error, result) {
            if (error) {
              //console.log(error.reason);
            } else {
              //console.log('successful insert');
            }
          });
        }

      });
      callLotto();
    }, 20 * 1000); // Poll every two minutes, set to 120 * 1000.
    return theGames;
  }
});
