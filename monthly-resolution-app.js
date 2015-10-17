Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function () {
      return Resolutions.find();
    }
  });

  Template.body.events({
    'submit .new-resolution': function (event) {
      event.preventDefault();

      var title = event.target.title.value;

      Resolutions.insert({
        title: title,
        createdAt: new Date()
      });

      event.target.title.value = "";
    }
  });

  Template.resolution.events({
    'click .toggle-checked': function () {
      Resolutions.update(this._id, {$set: {checked: !this.checked}});
    },
    'click .delete': function () {
      Resolutions.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
