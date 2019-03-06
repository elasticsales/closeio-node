'use strict';
var deferred = require('node-promise').defer;
var request = require('request');
var qs = require('querystring');

var Closeio = function(apiKey) {
  var closeio = this;
  this.apiKey = apiKey;
  this.lead = {
    search: function(options) {
      var parameters = {};
      if('limit' in options) {
        parameters._limit = options.limit;
        delete options.limit;
      }
      if('skip' in options) {
        parameters._skip = options.skip;
        delete options.skip;
      }
      if('fields' in options) {
        parameters._fields = options.fields;
        delete options.fields;
      }

      var option_keys = Object.keys(options);
      if (option_keys.length > 0) {
        parameters.query = '';
        option_keys.forEach(function(option) {
          var option_wrapper = (!/^".*"$/.test(option) && / +/.test(option)) ? '"' : '';
          parameters.query += option_wrapper + option + option_wrapper + ':' + options[option] + ' ';
        });
      }

      return closeio._get('/lead/', parameters);
    },
    create: function(options) {
      return closeio._post('/lead/', options);
    },
    merge: function(options){
      return closeio._post("/lead/merge/", options);
    },
    read: function(id) {
      return closeio._get('/lead/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/lead/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/lead/' + id + '/');
    }
  };
  this.contact = {
    search: function() {
      return closeio._get('/contact/');
    },
    create: function(options) {
      return closeio._post('/contact/', options);
    },
    read: function(id) {
      return closeio._get('/contact/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/contact/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/contact/' + id + '/');
    }
  };
  this.activity = {
    search: function(options) {
      return closeio._get('/activity/', options);
    },
    note: {
      search: function(options) {
        return closeio._get('/activity/note/', options);
      },
      create: function(options) {
        return closeio._post('/activity/note/', options);
      },
      update: function(id, options) {
        return closeio._put('/activity/note/' + id + '/', options);
      },
      delete: function(id) {
        return closeio._delete('/activity/note/' + id + '/');
      }
    },
    email: {
      search: function(options) {
        return closeio._get('/activity/email/', options);
      },
      create: function(options) {
        return closeio._post('/activity/email/', options);
      },
      update: function(id, options) {
        return closeio._put('/activity/email/' + id + '/', options);
      },
      delete: function(id) {
        return closeio._delete('/activity/email/' + id + '/');
      }
    },
    call: {
      search: function(options) {
        return closeio._get('/activity/call/', options);
      },
      delete: function(id) {
        return closeio._delete('/activity/call/' + id + '/');
      }
    }
  };
  this.opportunity = {
    search: function(options) {
      return closeio._get('/opportunity/', options);
    },
    create: function(options) {
      return closeio._post('/opportunity/', options);
    },
    read: function(id) {
      return closeio._get('/opportunity/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/opportunity/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/opportunity/' + id + '/');
    }
  };
  this.task = {
    search: function(options) {
      return closeio._get('/task/', options);
    },
    create: function(options) {
      return closeio._post('/task/', options);
    },
    read: function(id) {
      return closeio._get('/task/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/task/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/task/' + id + '/');
    }
  };
  this.user = {
    me: function() {
      return closeio._get('/me/');
    },
    read: function(id) {
      return closeio._get('/user/' + id + '/');
    }
  };
  this.organization = {
    read: function(id) {
      return closeio._get('/organization/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/organization/' + id + '/', options);
    }
  };
  this.report = {
    read: function(id, options) {
      return closeio._get('/report/' + id + '/', options);
    }
  };
  this.email_template = {
    search: function() {
      return closeio._get('/email_template/');
    },
    create: function(options) {
      return closeio._post('/email_template/', options);
    },
    read: function(id) {
      return closeio._get('/email_template/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/email_template/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/email_template/' + id + '/');
    }
  };
  this.saved_search = {
    search: function() {
      return closeio._get('/saved_search/');
    },
    create: function(options) {
      return closeio._post('/saved_search/', options);
    },
    read: function(id) {
      return closeio._get('/saved_search/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/saved_search/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/saved_search/' + id + '/');
    }
  };
  this.sequence = {
    search: function() {
      return closeio._get('/sequence/');
    },
    create: function(options) {
      return closeio._post('/sequence/', options);
    },
    read: function(id) {
      return closeio._get('/sequence/' + id + '/');
    },
    update: function(id, options) {
      return closeio._put('/sequence/' + id + '/', options);
    },
    delete: function(id) {
      return closeio._delete('/sequence/' + id + '/');
    }
  };
  this.sequence_subscription = {
    create: function(options) {
      return closeio._post('/sequence_subscription/', options);
    },
    update: function(id, options) {
      return closeio._put('/sequence_subscription/' + id + '/', options);
    }
  };
  this.status = {
    lead: {
      list: function() {
        return closeio._get('/status/lead/');
      },
      create: function(options) {
        return closeio._post('/status/lead/', options);
      },
      read: function(id) {
        return closeio._get('/status/lead/' + id + '/');
      },
      update: function(id, options) {
        return closeio._put('/status/lead/' + id + '/', options);
      },
      delete: function(id) {
        return closeio._delete('/status/lead/' + id + '/');
      }
    },
    opportunity: {
      list: function() {
        return closeio._get('/status/opportunity/');
      },
      create: function(options) {
        return closeio._post('/status/opportunity/', options);
      },
      read: function(id) {
        return closeio._get('/status/opportunity/' + id + '/');
      },
      update: function(id, options) {
        return closeio._put('/status/opportunity/' + id + '/', options);
      },
      delete: function(id) {
        return closeio._delete('/status/opportunity/' + id + '/');
      }
    }
  };
  this.event = {
    search: function(options) {
      return closeio._get('/event/', options);
    },
    read: function(id) {
      return closeio._get('/event/' + id + '/');
    },
  };
};

Closeio.prototype._request = function(options) {
  options.auth = {
    user: this.apiKey,
    pass: ''
  };
  options.jar = false;
  var d = deferred();
  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      d.resolve(JSON.parse(body));
      return;
    }
    if (error) {
      d.reject(error);
      return;
    }
    var rejection;
    try {
      rejection = JSON.parse(body);
    }catch(e){
      rejection = response.statusCode == 200 ? body : response.statusCode;
    }
    d.reject(rejection);
  });
  return d.promise;
};

Closeio.prototype._post = function(path, options) {
  options = {
    uri: 'https://api.close.com/api/v1' + path,
    body: JSON.stringify(options),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  };
  return this._request(options);
};

Closeio.prototype._get = function(path, parameters) {
  var options = {
    uri: 'https://api.close.com/api/v1' + path,
    method: 'GET',
    qs: parameters
  };
  return this._request(options);
};

Closeio.prototype._put = function(path, options) {
  options = {
    uri: 'https://api.close.com/api/v1' + path,
    body: JSON.stringify(options),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'PUT'
  };
  return this._request(options);
};

Closeio.prototype._delete = function(path) {
  var options = {
    uri: 'https://api.close.com/api/v1' + path,
    method: 'DELETE'
  };
  return this._request(options);
};

module.exports = exports = Closeio;
