(function () {
  'use strict';

  Class(App.Components, 'AudioBank').inherits(Serpentity.Component)({
    prototype : {
      buffers: null,
      currentSample: 0
    }
  });
}());
