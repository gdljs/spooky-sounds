(function () {
  'use strict';

  /**
   * Given an object with a file bank and a playable state, it will
   * start loop if armed and not playing. It will stop loop if armed and
   * playing.
   */
  Class(App.Systems, 'BackgroundPlayer').inherits(Serpentity.System)({
    prototype : {
      samples : null,

      added : function added(engine) {
        this.context = new AudioContext();
        this.samples = engine.getNodes(App.Nodes.ToggleableSample);
      },
      removed : function removed() {
        this.context = null;
        this.samples = null;
      },
      update : function update() {
        for (var sample of this.samples) {
          if (sample.playbackStatus.armed && !sample.playbackStatus.locked) {
            sample.playbackStatus.locked = true;

            if (sample.playbackStatus.playing) {
              sample.playbackStatus.playing = false;
              this._stopSample(sample);
              continue;
            }

            sample.playbackStatus.playing = true;
            this._playSample(sample);
            continue;
          }

          if (!sample.playbackStatus.armed) {
            sample.playbackStatus.locked = false;
          }
        }
      },

      /*
       * Plays a sample by creating the buffer, assigning
       * a pan node and sending it to the audio context destination
       */
      _playSample : function _playSample(sample) {
        var source, panNode;

        source = this.context.createBufferSource();
        source.buffer = sample.audioBank.buffers[0];
        source.playbackRate.value = sample.playbackProperties.pitch;
        source.loop = true;

        panNode = this.context.createStereoPanner();
        panNode.pan.value = sample.playbackProperties.pan;

        source.connect(panNode);
        panNode.connect(this.context.destination);

        sample.playbackStatus.node = source;

        source.start();
      },

      /*
       * Calls the stop method and removes reference
       */
      _stopSample : function _stopSample(sample) {
        if (sample.playbackStatus.node) {
          sample.playbackStatus.node.stop();
          sample.playbackStatus.node = null;
        }
      }
    }
  });
}());
