//inside a meteor method
Meteor.methods({
  "stream": function () {
    // For launch set to http://www.flalottery.com/video/en/theWinningNumber.xml.
    var Stream = HTTP.get("http://virtualputty.com/test/sample.xml");
    return Stream;
  },

  "numStore": function (titleval, dateval, numsval) {
    numStore.update({
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      upsert: true,
    });
  },

  "numberHits": function (titleval, dateval, datepickedval, picked, actual, matches) {
    numberHits.update({
      title: titleval,
      date: dateval.valueOf(),
      datepicked: datepickedval,
      picked: picked,
      actual: actual,
      matches: matches
    }, {
      title: titleval,
      date: dateval.valueOf(),
      datepicked: datepickedval,
      picked: picked,
      actual: actual,
      matches: matches
    }, {
      upsert: true,
    });
  },

  "ltData": function (titleval, dateval, numsval) {
    ltGames.update({
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      upsert: true,
    });
  },

});

Meteor.publish("numStore", function () {
  return numStore.find();
})

Meteor.publish("numberHits", function () {
  return numberHits.find();
})

Meteor.publish("ltGames", function () {
  return ltGames.find();
})
