(function () {
    
    var MemoryLeakChecker = function () {
        this.originalWindowObject = window;
        // need .bind(this) to be able to call this.alertUser in scan()
        this.keepScanning = setInterval(this.scan.bind(this), 1000);
    };

    MemoryLeakChecker.prototype = {

        scan: function () {
            console.log('scanning...', this.originalWindowObject, window);
            if (!this.isEquivalent(this.originalWindowObject, window)) {
                this.alertUser();
            }
        },

        isEquivalent: function (a, b) {
            for (var property in a) {
                if (a.hasOwnProperty(property)) {
                    if (!b.hasOwnProperty(property) || a[property] !== b[property]) {
                        return false;
                    }
                }
            }
        },

        differentProperty: function (a, b) {
            for (var property in a) {
                if (a.hasOwnProperty(property) && property !== undefined) {
                    if (!b.hasOwnProperty(property) || a[property] !== b[property]) {
                        console.log(a, b);
                        return property;
                    }
                }
            }
        },

        alertUser: function () {
            clearInterval(this.keepScanning);
            console.warn("Memory leak!", this.differentProperty(this.originalWindowObject, window));
        }

    };

    new MemoryLeakChecker();

}());