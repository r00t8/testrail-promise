
//http://docs.gurock.com/testrail-api2/start
var rp = require('request-promise');
var Promise = require("bluebird");
var API_PATH = "/index.php?/api/v2/";

module.exports = TestRail = function(host, user, password) {
    this.host = host + API_PATH;
    this.user = user;
    this.password = password;
    this.rejectUnauthorized = true;
};

["cases","plans","projects","results","runs","tests","helpers"]
    .forEach(function(file){ require("./" + file); });

TestRail.prototype.allowUntrustedCertificate = function(){
    this.rejectUnauthorized = false;
};

TestRail.prototype.getFullApiPath = function() {
  return this.host;
};

TestRail.prototype.get = function(url) {
    var options = {
        uri:this.host + url,
        json: true,
        rejectUnauthorized: this.rejectUnauthorized,
        headers: {
            "content-type": "application/json"
        }
    };
    return rp(options).auth(this.user, this.password, true);
};

TestRail.prototype.post = function(url,obj) {
    var options = {
        uri:this.host + url,
        json: true,
        rejectUnauthorized: this.rejectUnauthorized,
        headers: {
            "content-type": "application/json"
        },
        body: obj
    };
    return rp.post(options).auth(this.user, this.password, true);
};

//TODO This goes somewhere else
TestRail.prototype.getStatuses = function() {
  return this.get("get_statuses/");
};