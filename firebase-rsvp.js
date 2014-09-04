var RSVP = require("rsvp");

module.exports = {
    buildURL: function (keys) {
        var path = [];

        if (this.namespace) {
            path.push(this.namespace);
        }

        if (keys instanceof Array) {
            path.push(keys);
        }

        path.push(keys || "");
        path = path.join("/");

        if (typeof path !== "string") {
            throw new Error("Error: Path is invalid: " + path);
        }

        return path;
    },

    set: function (ref, keys, value) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve(value);
                }
            }

            ref.child(this.buildURL(keys)).set(value, onComplete);
        }.bind(this));
    },

    update: function (ref, keys, value) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve(value);
                }
            }

            ref.child(this.buildURL(keys)).update(value, onComplete);
        }.bind(this));
    },

    get: function (ref, keys) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (snapshot) {
                if (snapshot.val() === null) {
                    resolve(null);
                }
                else {
                    resolve(snapshot.val());
                }
            };
            function onError (error) {
                reject("Error: Firebase synchronization failed: " + error);
            };

            ref.child(this.buildURL(keys)).once("value", onComplete, onError);
        }.bind(this));
    },

    remove: function (ref, keys) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve();
                }
            }

            ref.child(this.buildURL(keys)).remove(onComplete);
        }.bind(this));
    }
};
