Template.allHits.helpers({

  data: function () {
    hits = numberHits.find().fetch();
    return hits;
  }
});
