'use strict';
var Closeio = require('../lib/close.io.js'),
  config = require('../config.json'),
  assert = require('assert');

function randomString() {
  return Math.floor(Math.random() * 10000).toString();
}

describe('Close.io API', function () {
  this.timeout(0);

  it('should create, read, updated, delete and search for leads.',
    function (done) {
    var closeio = new Closeio(config.apiKey);
    closeio.lead.create({
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
    }).then(function () {
      done();
    }, function (err) {
      throw new Error(err.error);
    });
  });

  it('should throw a verbose error', function (done) {
    var closeio = new Closeio(config.apiKey);
    closeio.lead.create({
      contacts: [{
        emails: [{
          email: 'test@example.com'
        }]
      }]
    }).then(function () {}, function () {
      done();
    });
  });

  it('should create, read, update, delete lead statuses', function (done) {
    var closeio = new Closeio(config.apiKey),
      randomVal = randomString(); // for confirming update

    closeio.status.lead.create({
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
    }).then(function () {
      return done();
    }, function (err) {
      throw new Error(err.error);
    });
  });

  it('should create, read, update, delete opportunity statuses',
    function (done) {
      var closeio = new Closeio(config.apiKey),
        randomVal = randomString(); // for confirming update

      closeio.status.opportunity.create({
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
      }).then(function () {
        return done();
      }, function (err) {
        throw new Error(err.error);
      });
    });

  it('should create and search for leads with custom field containing spaces.',
    function (done) {
      var closeio = new Closeio(config.apiKey);
      var lead_id;
      closeio.lead.create({
        name: 'John Wehr',
        custom: {
          'Lead initials': 'JW'
        }
      }).then(function (data) {
        lead_id = data.id;
        return closeio.lead.search({
          'custom.Lead initials': 'JW'
        });
      }).then(function (data) {
        assert(data.data.length > 0);
        return closeio.lead.delete(lead_id);
      }).then(function () {
        return done();
      }, function (err) {
        return closeio.lead.delete(lead_id).then(function() {
          throw new Error(err.error);
        });
      });
    });

  it('should create and search for all leads if no option is passed',
    function (done) {
      var closeio = new Closeio(config.apiKey);
      var lead_id;
      closeio.lead.create({
        name: 'John Wehr'
      }).then(function (data) {
        lead_id = data.id;
        return closeio.lead.search({});
      }).then(function (data) {
        assert(data.data.length > 0);
        return closeio.lead.delete(lead_id);
      }).then(function () {
        return done();
      }, function (err) {
        return closeio.lead.delete(lead_id).then(function() {
          throw new Error(err.error);
        });
      });
    });
});