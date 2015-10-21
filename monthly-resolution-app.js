Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function () {
      if (Session.get('hideFinished')) {
        return Resolutions.find({checked: {$ne: true}});
      }
      return Resolutions.find();
    },
    hideFinished: function () {
      return Session.get('hideFinished');
    }
  });

  Template.body.events({
    'submit .new-resolution': function (event) {
      event.preventDefault();

      var title = event.target.title.value;

      Meteor.call('addResolution', title);

      event.target.title.value = "";
    },
    'change .hide-finished': function (event) {
      Session.set('hideFinished', event.target.checked);
    }
  });

  Template.resolution.events({
    'click .toggle-checked': function () {
      Meteor.call('updateResolution', this._id, !this.checked);
    },
    'click .delete': function () {
      Meteor.call('removeResolution', this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  'addResolution': function (title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });
  },
  'removeResolution': function (id) {
    Resolutions.remove(id);
  },
  'updateResolution': function (id, checked) {
    Resolutions.update(id, {$set: {checked: checked}});
  }
});
