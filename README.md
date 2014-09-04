# FirebaseRSVP

Firebase wrapper with RSVP's promises

*Mostly abstracted out from [geofire-js](https://github.com/firebase/geofire-js)*

## Usage examples

##### Set

```
this.set(firebaseRef, "a", { b: "c" })
    .then(function (value) {
        // value is { b: "c" }
    })
    .catch(function (error) {
        // error that occured while trying to set "a"
    });
```

##### Get

```
this.get(firebaseRef, "a")
    .then(function (value) {
        // value is { b: "c" }
    })
    .catch(function (error) {
        // error that occured while trying to get "a"
    });
```

##### Update

```
this.update(firebaseRef, "a", { d: "e" })
    .then(function (value) {
        // value is { d: "e" } - only the updated part of "a"
        //  if you want the full value of "a", use get
        return firebaseRef.get("a");
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
this.remove("a")
    .then(function () {
        // nothing is returned
    })
    .catch(function (error) {
        // error that occured while trying to remove "a"
    });
```
