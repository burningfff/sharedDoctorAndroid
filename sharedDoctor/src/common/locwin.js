(function(global, undefined) {
  if (global.LOCWIN) {
    return;
  }

  var LOCWIN = global.LOCWIN = {
    version: '1.0.0',
  };

  LOCWIN.userInfo = {
    get: function() {
      return LOCWIN.Cache.get('userInfo');
    },
    set: function(userInfo) {
      return LOCWIN.Cache.set('userInfo', userInfo);
    },
    remove: function() {
      LOCWIN.Cache.remove('userInfo');
    }
  }

  LOCWIN.Cache = {
    get: function(key) {
      if (typeof key != 'string') return;

      var value = null;
      var str = global.sessionStorage.getItem(key);
      try {
        value = JSON.parse(str);
      } catch (e) {
        value = str;
      }

      return value;
    },
    set: function(key, value) {
      if (typeof key != 'string') return;
      if (typeof value == 'object') {
        value = JSON.stringify(value);
      }
      try {
        global.sessionStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    },
    remove: function(key) {
      if (typeof key != 'string') return;
      global.sessionStorage.removeItem(key);
    },
    clear: function() {
      global.sessionStorage.clear();
    }
  };
  LOCWIN.loading = function(title, msg) {}

  LOCWIN.loaded = function() {}

  // LOCWIN.eventuality = function(self) {
  //   var registry = {};
  //   self.fire = function(event, args) {
  //     var array,
  //       func,
  //       handler,
  //       i,
  //       type = typeof event === 'string' ? event : event.type;
  //
  //     if (registry.hasOwnProperty(type)) {
  //       array = registry[type];
  //       for (var i = 0; i < array.length; i++) {
  //         handler = array[i];
  //         func = handler.method;
  //         if (typeof func === 'string') {
  //           func = this[func];
  //         }
  //
  //         func.apply(this, args ? [self, args] : [self, {}]);
  //       }
  //     }
  //
  //     return this;
  //   };
  //
  //   self.on = function(type, method) {
  //     var handler = {
  //       method: method
  //     };
  //
  //     if (registry.hasOwnProperty(type)) {
  //       registry[type].push(handler);
  //     } else {
  //       registry[type] = [handler];
  //     }
  //     return this;
  //   };
  //
  //   self.un = function(type, method) {
  //     var array,
  //       handler,
  //       func,
  //       index = -1;
  //     if (registry.hasOwnProperty(type)) {
  //       array = registry[type];
  //       for (var i = 0; i < array.length; i++) {
  //         var handler = array[i];
  //         func = handler.method;
  //         if (typeof func === 'string') {
  //           func = this[func];
  //         }
  //
  //         if (func === method) {
  //           index = i;
  //           break;
  //         }
  //       }
  //
  //       if (index >= 0) {
  //         array.splice(index, 1);
  //       }
  //     };
  //   }
  //
  //   self.dispose = function() {
  //     registry = null;
  //     delete self.on;
  //     delete self.un;
  //     delete self.fire;
  //   }
  //
  //   return self;
  // }
})(window);
