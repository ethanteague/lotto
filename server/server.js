//inside a meteor method
Meteor.methods({
  "stream": function() {
    // For launch set to http://www.flalottery.com/video/en/theWinningNumber.xml.
    var Stream = HTTP.get("http://virtualputty.com/test/sample.xml");
    return Stream;
  },

  "numStore": function(titleval, dateval, numsval) {
    numStore.insert({
      title: titleval,
      date: dateval,
      nums: numsval
    });
  },

  "numberHits": function(titleval, dateval, picked, actual, matches) {
    numberHits.insert({
      title: titleval,
      date: dateval,
      picked: picked,
      actual: actual,
      matches: matches
    });
  },

  "ltData": function(titleval, dateval, numsval) {
    ltGames.insert({
      title: titleval,
      date: dateval,
      _id: numsval
    });
  },

  "twiceData": function(titleval, dateval, numsval) {
    if (numsval.eve) {
      twiceGames.insert({
        title: titleval,
        nightDate: dateval.eve,
        dayDate: dateval.day,
        _id: numsval.eve,
        dayNums: numsval.day
      });
    }
    if (numsval.day) {
      twiceGames.insert({
        title: titleval,
        nightDate: dateval.eve,
        dayDate: dateval.day,
        nightNums: numsval.eve,
        _id: numsval.day
      });
    }
  }

});

Meteor.publish("numStore", function() {
  return numStore.find();
})

Meteor.publish("numberHits", function() {
  return numberHits.find();
})

Meteor.publish("twiceGames", function() {
  return twiceGames.find();
})

Meteor.publish("ltGames", function() {
  return ltGames.find();
})
