'use strict';
var Closeio = require('../lib/close.io.js'),
  config = require('../config.json'),
  assert = require('assert');

function randomString() {
  return Math.floor(Math.random() * 10000).toString();
}

describe('Close.io API', function () {
  this.timeout(5000);

  var closeio
  beforeEach(() => {
    closeio = new Closeio(config.apiKey);
  })

  it('should create, read, updated, delete and search for leads.', function () {
    return closeio.lead.create({
      name: 'John Wehr'
    }).then(function (data) {
      return closeio.lead.read(data.id);
    }).then(function (data) {
      return closeio.lead.update(data.id, {
        name: 'John Wehr 2'
      });
    }).then(function (data) {
      assert(data.name === 'John Wehr 2');
      return closeio.lead.delete(data.id);
    }).then(function () {
      return closeio.lead.search({
        name: 'Wayne'
      });
    });
  });

  it('should throw an error if attempting to create a lead without email', function (done) {
    closeio.lead.create({
      contacts: [{
        emails: [{
          email: ''
        }]
      }]
    }).then(function () {
      done(new Error('This should have failed'))
    }, function (err) {
      done();
    });
  });

  it('should create, read, update, delete lead statuses', function () {
    var randomVal = randomString(); // for confirming update

    return closeio.status.lead.create({
      label: randomString()
    }).then(function (data) {
      return closeio.status.lead.read(data.id);
    }).then(function (data) {
      return closeio.status.lead.update(data.id, {
        label: randomVal
      });
    }).then(function (data) {
      assert(data.label === randomVal);
      return closeio.status.lead.delete(data.id);
    });
  });

  it('should create, read, update, delete opportunity statuses', function () {
    var randomVal = randomString(); // for confirming update

    return closeio.status.opportunity.create({
      label: randomString()
    }).then(function (data) {
      return closeio.status.opportunity.read(data.id);
    }).then(function (data) {
      return closeio.status.opportunity.update(data.id, {
        label: randomVal
      });
    }).then(function (data) {
      assert(data.label === randomVal);
      return closeio.status.opportunity.delete(data.id);
    });
  });

  it('should get the user list', () => {
    return closeio.user.read().then((users) => {
      assert(Array.isArray(users.data));

      // It might be at least one user and looks like a user obj
      const firstUser = users.data[0];
    });
  });

  describe('search', function () {

    var lead_id;

    before(function () {
      return closeio.lead.create({
        name: 'John Wehr',
        custom: {
          foo: 'bar',
          'Lead initials': 'JW'
        }
      }).then(function (data) {
        assert(data.id);
        lead_id = data.id;
      })
    })

    it('should return all leads if no option is passed', function () {
      var lead_id;
      return closeio.lead.search({})
        .then(function (data) {
          // console.log(data)
          assert(data.data.length > 0);
        });
    });

    it('should search a lead by name', function () {
      var lead_id;
      return closeio.lead.search({ name: 'John Wehr'})
        .then(function (data) {
          // console.log(data)
          assert(data.data.length > 0);
        });
    });

    it('should search for leads with custom field containing spaces.', function () {
      return closeio.lead.search({ 'custom.Lead initials': 'JW' })
        .then(function (data) {
          // console.log(data)
          assert(data.data.length > 0);
        });
    });


    after(function () {
      return closeio.lead.delete(lead_id)
    })

  });

});
