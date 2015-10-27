(function () {
  'use strict';

  /*
   * Given a set of objects with triggers and an audio bank,
   * play the sound if triggered.
   */
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
       * Plays a sample by creating the buffer source and attaching nodes.
       */
      _playSample : function _playSample(sample) {
        var source, panNode;

        source = this.context.createBufferSource();
        console.log(sample.audioBank.currentSample);
        source.buffer = sample.audioBank.buffers[sample.audioBank.currentSample];
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
