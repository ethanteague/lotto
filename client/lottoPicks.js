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
          //console.log(error.reason);
        } else {
          Session.set('successInsert', "yes");
          //console.log('successful insert');
        }
      });
    }

  },

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
    else if (gamePick == "PLAY4Day") {
      gameInputs.push('one', 'two', 'three', 'four');
    }
    else if (gamePick == "PLAY4Night") {
      gameInputs.push('one', 'two', 'three', 'four');
    }
    else if (gamePick == "CASH3Day") {
      gameInputs.push('one', 'two', 'three');
    }
    else if (gamePick == "CASH3Night") {
      gameInputs.push('one', 'two', 'three');
    }
    else if (gamePick == "LUCKY") {
      gameInputs.push('one', 'two', 'three', 'four', 'Special');
    }
    allStuff.push(gameInputs, gamePick);
    return allStuff;
  }
});