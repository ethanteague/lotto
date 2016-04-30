Template.userPicks.helpers({

  data: function () {
    userPicks = numStore.find().fetch();
    var groupedDates = _.groupBy(userPicks, 'title');
    cleanedItems = [];
    $.each(groupedDates, function () {
      item = this.slice(-1).pop();
      split = item.nums.split("-");
      console.log(split);
      var clean = '';
      for (i = 0; i < split.length; i++) {
        clean += '<span class="badge">' + split[i] + '</span>';
      }
      item.nums = clean;
      cleanedItems.push(item);
    })
    return cleanedItems;
  }
});
