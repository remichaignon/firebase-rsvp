# FirebaseRSVP

Firebase wrapper with RSVP's promises

*Mostly abstracted out from [geofire-js](https://github.com/firebase/geofire-js)*

## Usage examples

##### Create a FirebaseRSVP instance

```
var FirebaseRSVP = require("firebase-rsvp");

var ref = new FirebaseRSVP("https://MY_FIREBASE_APP.firebaseio.com/");
```

##### Set

```
ref.set("a", { b: "c" })
    .then(function (value) {
        // value is { b: "c" }
    })
    .catch(function (error) {
        // error that occured while trying to set "a"
    });
```

##### Get

```
ref.get("a")
    .then(function (value) {
        // value is { b: "c" }
    })
    .catch(function (error) {
        // error that occured while trying to get "a"
    });
```

##### Update

```
ref.update("a", { d: "e" })
    .then(function (value) {
        // value is { d: "e" } - only the updated part of "a"
        //  if you want the full value of "a", use get
        return ref.get("a");
    })
    .then(function (value) {
        // value is { b: "c", d: "e" }
    })
    .catch(function (error) {
        // error that occured while trying to update or get "a"
    });
```

##### Remove

```
ref.remove("a")
    .then(function () {
        // nothing is returned
    })
    .catch(function (error) {
        // error that occured while trying to remove "a"
    });
```
