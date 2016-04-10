// Startup
Meteor.startup(function () {
  BlazeLayout.setRoot("body");
})


// Subscriptions
Tracker.autorun(function () {
  Meteor.subscribe("numberHits");
  Meteor.subscribe("numStore");
  Meteor.subscribe("ltGames");
  Meteor.subscribe("twiceGames");
});

// Templates
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
          var datevalue = new Date(value.drawdate);
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

Template.lottoPicks.events({
  "change select": function (e) {
    Session.set('successInsert', "");
    Session.set('gameName', e.target.value);
  },

  "click .btn-primary": function (e) {
    Session.set('successInsert', "");
    var numString = [];
    e.preventDefault();

    $(".chooseGame input").each(function () {

      if ($(this).val() === "" || parseInt($(this).val()) > parseInt($(this).attr("max"))
        || parseInt($(this).val()) < parseInt($(this).attr("min"))) {
        Session.set("error", "error");
        $(this).addClass("error");
        var name = $(this).attr("name");
        if ($(".error-span." + name).length < 1) {
          $(this).after("<span class='error-span " + name + "'>Invalid</span>");
        }
      }
      else {
        Session.set("error", "not-error");
        $(this).removeClass("error");
        $(this).next().remove(".error-span");
      }
      numString.push($(this).val());
    });

    var gameName = Session.get("gameName");
    if (Session.get("error") == "not-error" && !$(".error-span").length) {
      function lottoFormat(d, i) {
        var joinStringRaw = numString.join("-");
        var joinString = joinStringRaw.split("-", d);
        return joinString.join("-") + ' ' + i + numString[d];
      }

      var completeString = numString.join("-");
      if (gameName == "POWERBALL") {
        var completeString = lottoFormat(5, 'PB');
      }
      else if (gameName == "MEGAMILLIONS") {
        var completeString = lottoFormat(5, 'MM');
      }
      else if (gameName == "LUCKY") {
        var completeString = lottoFormat(4, 'LB');
      }

      var datevalue2 = new Date();

      Meteor.call("numStore", Session.get("gameName"), datevalue2, completeString, function (error, result) {
        if (error) {
          Session.set('successInsert', "no");
          console.log(error.reason);
        } else {
          Session.set('successInsert', "yes");
          console.log('successful insert');
        }
      });
    }
  },

})

// Templates
Template.registerHelper('_', function () {
  return _;
})

Template.lottoPicks.helpers({
  status: function () {
    if (Session.get('successInsert', "yes")) {
      return true;
    }
  },
  data: function () {
    var allStuff = [];
    var gameInputs = [];
    var gamePick = Session.get("gameName");

    if (gamePick == "POWERBALL") {
      gameInputs.push('one', 'two', 'three', 'four', 'five', 'Special');
    }
    else if (gamePick == "LOTTO") {
      gameInputs.push('one', 'two', 'three', 'four', 'five', 'six');
    }
    else if (gamePick == "MEGAMILLIONS") {
      gameInputs.push('one', 'two', 'three', 'four', 'five', 'Special');
    }
    else if (gamePick == "FAN5") {
      gameInputs.push('one', 'two', 'three', 'four', 'five');
    }
    else if (gamePick == "PLAY4") {
      gameInputs.push('one', 'two', 'three', 'four');
    }
    else if (gamePick == "CASH3") {
      gameInputs.push('one', 'two', 'three');
    }
    else if (gamePick == "LUCKY") {
      gameInputs.push('one', 'two', 'three', 'four', 'Special');
    }
    allStuff.push(gameInputs, gamePick);
    return allStuff;
  }
});