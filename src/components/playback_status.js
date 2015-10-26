(function () {
  'use strict';

  Class(App.Components, 'PlaybackStatus').inherits(Serpentity.Component)({
    prototype : {
      playing: false,
      armed: false,
      locked: false,
      node: null
    }
  });
}());
