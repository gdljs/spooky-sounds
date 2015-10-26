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
      return Math.round(App.Util.ConversionsUtil.scale(value, 2, -1));
    },

    // given a value 0-127 convert to range between 0.1 and 10 (1/10x & 10x)
    midiToPitch : function (value) {
      var scaled;

      scaled = value * Math.log((value/127) * (Math.E - 1) + 1);
      scaled = App.Util.ConversionsUtil.scale(value, 2.5, 0.5);
      return Math.round(scaled * 100) / 100;
    },

    // arbitrary scaling
    // scaleSize - Size of target scale
    // offset - offset from 0
    scale : function scale(value, scaleSize, offset) {
      var delta;

      delta = scaleSize / 127;

      return value * delta + offset;
    }
  });
}());
