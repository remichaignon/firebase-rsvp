var RSVP = require("rsvp");

module.exports = {
    this.buildURL = function (keys) {
        keys = keys || "";

        if (keys instanceof Array) {
            keys = keys.join("/");
        }

        if (typeof keys !== "string") {
            throw new Error("Error: Key is invalid: " + keys);
        }

        return keys;
    },

    this.set = function (ref, keys, value) {
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
        });
    },

    this.update = function (ref, keys, value) {
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
        });
    },

    this.get = function (ref, keys) {
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
        });
    },

    this.remove = function (ref, keys) {
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
        });
    }
};
