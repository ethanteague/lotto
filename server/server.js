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
      nums: numsval
    });
  },

  "dayGames": function(titleval, dateval, numsval) {
    dayGames.insert({
      title: titleval,
      date: dateval,
      nums: numsval
    });
  },

  "nightGames": function(titleval, dateval, numsval) {
    nightGames.insert({
      title: titleval,
      date: dateval,
      nums: numsval
    });
  },

});

Meteor.publish("numStore", function() {
  return numStore.find();
})

Meteor.publish("numberHits", function() {
  return numberHits.find();
})

Meteor.publish("dayGames", function() {
  return dayGames.find();
})

Meteor.publish("nightGames", function() {
  return nightGames.find();
})

Meteor.publish("ltGames", function() {
  return ltGames.find();
})
