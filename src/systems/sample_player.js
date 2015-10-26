(function () {
  'use strict';

  Class(App.Systems, 'SamplePlayer').inherits(Serpentity.System)({
    prototype : {
      samples : null,

      added : function added(engine) {
        this.context = new AudioContext();
        this.samples = engine.getNodes(App.Nodes.TriggerableSample);
      },
      removed : function removed() {
        this.context = null;
        this.samples = null;
      },
      update : function update() {
        for (var sample of this.samples) {
          if (sample.trigger.armed && !sample.trigger.locked) {
            this._playSample(sample);
            sample.trigger.locked = true;
            continue;
          }

          if (!sample.trigger.armed) {
            sample.trigger.locked = false;
          }
        }
      },

      /*
       * Plays a sample.
       */
      _playSample : function _playSample(sample) {
        var source, panNode;

        source = this.context.createBufferSource();
        source.buffer = sample.audioBank.buffers[0];
        source.playbackRate.value = sample.playbackProperties.pitch;

        panNode = this.context.createStereoPanner();
        panNode.pan.value = sample.playbackProperties.pan;

        source.connect(panNode);
        panNode.connect(this.context.destination);
        source.start();
      }
    }
  });
}());
