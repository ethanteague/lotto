Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://metrowebz%40gmail.com:Utket6977!@smtp.gmail.com:465/"
});

//inside a meteor method
Meteor.methods({
  "stream": function () {
    // For launch set to http://www.flalottery.com/video/en/theWinningNumber.xml.
    var Stream = HTTP.get("http://virtualputty.com/test/sample.xml");
    return Stream;
  },

  "numStore": function (user, titleval, dateval, numsval) {
    numStore.update({
      user: this.userId,
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      user: this.userId,
      title: titleval,
      date: dateval.valueOf(),
      nums: numsval
    }, {
      upsert: true,
    });
  },

  "numberHits": function (user, titleval, dateval, datepickedval, picked, actual, matches) {
    numberHits.update({
      user: this.userId,
      title: titleval,
      date: dateval.valueOf(),
      datepicked: datepickedval,
      picked: picked,
      actual: actual,
      matches: matches
    }, {
      user: this.userId,
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
    return numStore.find({user: this.userId});
})

Meteor.publish("numberHits", function () {
    return numberHits.find({user: this.userId});
})

Meteor.publish("ltGames", function () {
  return ltGames.find();
})
