(function (){
  'use strict';

  /*
   * Module with a bunch of util functions to map midi values to more
   * useful scales.
   */
  Module(App.Util, 'ConversionsUtil')({

    // given a value 0-127, returns true or false (RECOMMENDED FOR BUTTONS)
    midiToBoolean : function (value) {
      return !!(value);
    },

    // given a value 0-127 convert to range between -1 to 1
    midiToPan : function (value) {
      return Math.round(App.Util.ConversionsUtil.scale(2, -1, value));
    },

    // given a value 0-127 convert to range between 0.1 and 10 (1/10x & 10x)
    midiToPitch : function (value) {
      var scaled;

      scaled = value * Math.log((value/127) * (Math.E - 1) + 1);
      scaled = App.Util.ConversionsUtil.scale(2.5, 0.5, value);
      return Math.round(scaled * 100) / 100;
    },

    midiToPosition : function (axis, value) {
      var result;

      if (axis === 'x') {
        result = App.Util.ConversionsUtil.scale(window.innerWidth, 0, value);
      }

      if (axis === 'y') {
        result = App.Util.ConversionsUtil.scale(window.innerHeight, 0, value);
      }

      return Math.round(result);
    },

    // given a value 0-127 convert to range between -n to n (int)
    midiToIntScale : function (n, value) {
      return Math.round(App.Util.ConversionsUtil.scale(n, 0, value));
    },

    // arbitrary scaling
    // scaleSize - Size of target scale
    // offset - offset from 0
    scale : function scale(scaleSize, offset, value) {
      var delta;

      delta = scaleSize / 127;

      return value * delta + offset;
    }
  });
}());
