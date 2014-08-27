var Firebase = require("firebase"),
    RSVP = require("rsvp");

var FirebaseRSVP = function(databaseURL) {
    this.set = function (key, value) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve(value);
                }
            }

            _firebaseRef.child(key).set(value, onComplete);
        });
    };

    this.update = function (key, value) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve(value);
                }
            }

            _firebaseRef.child(key).update(value, onComplete);
        });
    };

    this.get = function (key) {
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

            _firebaseRef.child(key).once("value", onComplete, onError);
        });
    };

    this.remove = function (key) {
        return new RSVP.Promise(function (resolve, reject) {
            function onComplete (error) {
                if (error) {
                    reject("Error: Firebase synchronization failed: " + error);
                }
                else {
                    resolve();
                }
            }

            _firebaseRef.child(key).remove(onComplete);
        });
    };

    if (typeof databaseURL !== "string") {
        throw new Error("Error: Firebase URL invalid.");
    }

    var _firebaseRef = new Firebase(databaseURL);
};

module.exports = FirebaseRSVP;
